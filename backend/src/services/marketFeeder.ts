import { Server } from 'socket.io';
import { PORTFOLIO_HOLDINGS } from '../data/mockHoldings';
import { getYahooData } from './yahooFinance.service';
import { getGoogleFinanceData } from './googleFinance.service';
import { Holding } from '../types/holding';
import puppeteer, { Browser } from 'puppeteer';


export let browserInstance: Browser | null = null;

const getBrowser = async (): Promise<void> => {
    if (browserInstance && browserInstance.isConnected()) {
        return;
    }

    browserInstance = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
        ],
    });

    browserInstance.on('disconnected', () => {
        console.log('Browser disconnected, will reconnect on next request');
        browserInstance = null;
    });
};

export const startMarketFeeder = (io: Server) => {
    console.log("Starting Market Feeder Worker...");
    getBrowser()

    PORTFOLIO_HOLDINGS.forEach(stock => {
        startStockLoop(stock, io).catch(err =>
            console.error(`Fatal error in loop for ${stock.ticker}`, err)
        );;
    });

};

const startStockLoop = async (stock: Holding, io: Server) => {
    while (true) {
        try {
            const roomName = `stock:${stock.ticker}`;
            const roomSize = io.sockets.adapter.rooms.get(roomName)?.size || 0;

            if (roomSize > 0) {
                const [yahoo, google] = await Promise.all([
                    getYahooData(stock.ticker, stock.exchange),
                    getGoogleFinanceData(stock.ticker, stock.exchange)
                ]);

                // if both yahoo and google returned zero data, skip emitting
                if (google.pe === 0 && google.eps === 0) {
                    console.warn(`Skipping update for ${stock.ticker} due to zero data from both sources.`);
                    continue;
                }

                const updatePayload = {
                    ticker: stock.ticker,
                    cmp: yahoo.price,
                    peRatio: google.pe,
                    earnings: google.eps,
                    lastUpdated: Date.now()
                };

                io.to(roomName).emit('price_update', updatePayload);
            }

            const delay = 10000 + Math.random() * 10000;
            await new Promise(r => setTimeout(r, delay));

        } catch (err) {
            console.error(`Feeder error for ${stock.ticker}:`, err);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
};
