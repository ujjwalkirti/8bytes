import YahooFinance from 'yahoo-finance2';
import NodeCache from 'node-cache';

const CACHE_DURATION = 60 * 1000; // 1 min

const cache = new NodeCache({ stdTTL: CACHE_DURATION / 1000 });

export const getYahooData = async (ticker: string, exchange: string) => {
    try {
        const suffix = exchange === 'NSE' ? '.NS' : '.BO';
        const symbol = `${ticker}${suffix}`;
        const record = cache.get<{ price: number; symbol: string }>(symbol);
        if (!record) {
            const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
            const quote = await yf.quote(symbol);

            cache.set(symbol, {
                price: quote.regularMarketPrice,
                symbol: symbol
            });

            return {
                price: quote.regularMarketPrice,
                symbol: symbol
            };
        }

        return record;

    } catch (error) {
        console.error(`Yahoo API Error for ${ticker}`);
        return { price: 0, symbol: ticker };
    }
};
