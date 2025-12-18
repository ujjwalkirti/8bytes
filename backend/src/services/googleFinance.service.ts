import puppeteer, { Browser, Page } from 'puppeteer';
import { browserInstance } from './marketFeeder';

const cache = new Map<string, { pe: number; eps: number; timestamp: number }>();
const CACHE_DURATION = 60 * 1000;
const pageCache = new Map<string, Page>();

const getOrCreatePage = async (ticker: string, exchange: string): Promise<Page> => {
    const url = `https://www.google.com/finance/quote/${ticker}:${exchange}`;
    const cacheKey = `${ticker}:${exchange}`;

    if (pageCache.has(cacheKey)) {
        const existingPage = pageCache.get(cacheKey)!;
        if (!existingPage.isClosed()) {
            return existingPage;
        }
        pageCache.delete(cacheKey);
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

const scrapeStock = async (ticker: string, exchange: string, retries = 3): Promise<{ pe: number; eps: number }> => {
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

        if (retries > 0) {
            console.log(`Retry ${4 - retries}/3 for ${ticker} after error`);
            const delay = Math.pow(2, 3 - retries) * 1000;
            await new Promise(r => setTimeout(r, delay));
            return scrapeStock(ticker, exchange, retries - 1);
        }

        console.error(`Google Scraper Error for ${ticker}:`, error);
        return { pe: 0, eps: 0 };
    }
};

export const getGoogleFinanceData = async (ticker: string, exchange: string) => {
    const googleSymbol = `${ticker}:${exchange}`;

    const cached = cache.get(googleSymbol);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return { pe: cached.pe, eps: cached.eps };
    }

    const data = await scrapeStock(ticker, exchange);
    cache.set(googleSymbol, { ...data, timestamp: Date.now() });
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
