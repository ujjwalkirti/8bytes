import puppeteer, { Browser, Page } from 'puppeteer';
import NodeCache from 'node-cache';
import { browserInstance } from './marketFeeder';

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const CACHE_DURATION = 60;
const pageCache = new Map<string, Page>();

const getOrCreatePage = async (ticker: string, exchange: string): Promise<Page> => {
    const url = `https://www.google.com/finance/quote/${ticker}:${exchange}`;
    const cacheKey = `${ticker}:${exchange}`;

    if (pageCache.has(cacheKey)) {
        const existingPage = pageCache.get(cacheKey)!;
        if (!existingPage.isClosed() && existingPage.url() === url) {
            return existingPage;
        }
        pageCache.delete(cacheKey);
        try {
            if (!existingPage.isClosed()) {
                await existingPage.close();
            }
        } catch (e) {
            console.error(`Failed to close stale cached page for ${ticker}:`, e);
        }
    }

    if (!browserInstance) {
        throw new Error('Browser instance not available');
    }

    const page = await browserInstance.newPage();
    page.setDefaultNavigationTimeout(30000);
    page.setDefaultTimeout(30000);

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        pageCache.set(cacheKey, page);
        return page;
    } catch (error) {
        await page.close();
        throw error;
    }
};

const scrapeStock = async (ticker: string, exchange: string): Promise<{ pe: number; eps: number }> => {
    if (!browserInstance) return { pe: 0, eps: 0 };

    let page;
    try {
        page = await getOrCreatePage(ticker, exchange);

        const data: { pe: number; eps: number } = await page.evaluate(`
            (function() {
                var pe = 0;
                var eps = 0;

                var labelDivs = document.querySelectorAll('div.mfs7Fc');
                for (var i = 0; i < labelDivs.length; i++) {
                    var labelDiv = labelDivs[i];
                    var text = labelDiv.textContent ? labelDiv.textContent.trim() : '';

                    if (text === 'P/E ratio') {
                        var container = labelDiv.closest('.gyFHrc');
                        if (container) {
                            var valueDiv = container.querySelector('.P6K39c');
                            if (valueDiv) {
                                var value = valueDiv.textContent ? valueDiv.textContent.trim() : '';
                                pe = parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
                            }
                        }
                    }
                }

                var epsLabelDivs = document.querySelectorAll('div.rsPbEe');
                for (var j = 0; j < epsLabelDivs.length; j++) {
                    var epsLabelDiv = epsLabelDivs[j];
                    var epsText = epsLabelDiv.textContent ? epsLabelDiv.textContent.trim() : '';

                    if (epsText === 'Earnings per share') {
                        var row = epsLabelDiv.closest('tr');
                        if (row) {
                            var valueCell = row.querySelector('td.QXDnM');
                            if (valueCell) {
                                var epsValue = valueCell.textContent ? valueCell.textContent.trim() : '';
                                eps = parseFloat(epsValue.replace(/[^0-9.-]/g, '')) || 0;
                            }
                        }
                    }
                }

                return { pe: pe, eps: eps };
            })()
        `) as { pe: number; eps: number };

        console.log(`Scraped ${ticker}: PE=${data.pe}, EPS=${data.eps}`);
        return data;
    } catch (error) {
        const cacheKey = `${ticker}:${exchange}`;
        if (pageCache.has(cacheKey)) {
            try {
                const cachedPage = pageCache.get(cacheKey)!;
                if (!cachedPage.isClosed()) {
                    await cachedPage.close();
                }
            } catch (e) {
                console.error(`Failed to close cached page for ${ticker}:`, e);
            }
            pageCache.delete(cacheKey);
        }

        console.error(`Google Scraper Error for ${ticker}`);
        return { pe: 0, eps: 0 };
    }
};

export const getGoogleFinanceData = async (ticker: string, exchange: string) => {
    const googleSymbol = `${ticker}:${exchange}`;

    const cached = cache.get<{ pe: number; eps: number }>(googleSymbol);
    if (cached) {
        return cached;
    }

    const data = await scrapeStock(ticker, exchange);

    //  if the pe and eps are zero, do not update the cache
    if (data.pe === 0 && data.eps === 0) {
        return data;
    }

    cache.set(googleSymbol, data, CACHE_DURATION);
    return data;
};

export const cleanupPages = async () => {
    for (const [key, page] of pageCache.entries()) {
        try {
            if (!page.isClosed()) {
                await page.close();
            }
        } catch (e) {
            console.error(`Failed to close page ${key}:`, e);
        }
    }
    pageCache.clear();
};
