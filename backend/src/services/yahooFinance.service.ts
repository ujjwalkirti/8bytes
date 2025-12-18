import YahooFinance from 'yahoo-finance2';

export const getYahooData = async (ticker: string, exchange: string) => {
    try {
        const suffix = exchange === 'NSE' ? '.NS' : '.BO';
        const symbol = `${ticker}${suffix}`;
        const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
        const quote = await yf.quote(symbol);
        return {
            price: quote.regularMarketPrice,
            symbol: symbol
        };
    } catch (error) {
        console.error(`Yahoo API Error for ${ticker}:`, error);
        return { price: 0, symbol: ticker };
    }
};
