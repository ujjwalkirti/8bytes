import { Request, Response } from 'express';
import { PORTFOLIO_HOLDINGS } from '../data/mockHoldings';
import { getYahooData } from '../services/yahooFinance.service';

// only send data as it is
export const getPortfolioHoldings = async (req: Request, res: Response) => {
    try {
        const rawStockData = await Promise.all(PORTFOLIO_HOLDINGS.map(async (stock) => {
            const [yahooData] = await Promise.all([
                getYahooData(stock.ticker, stock.exchange),
            ]);

            const cmp = yahooData.price || 0;
            const investment = stock.buyPrice * stock.quantity;
            const presentValue = cmp * stock.quantity;
            const gainLoss = presentValue - investment;

            return {
                ...stock,
                cmp,
                investment,
                presentValue,
                gainLoss,
            };
        }));

        const totalPortfolioValue = rawStockData.reduce((sum, stock) => sum + stock.presentValue, 0);

        const portfolio = rawStockData.map(stock => ({
            ...stock,
            portfolioPercentage: totalPortfolioValue > 0
                ? parseFloat(((stock.presentValue / totalPortfolioValue) * 100).toFixed(2))
                : 0,
            gainLossPercent: stock.investment > 0
                ? parseFloat(((stock.gainLoss / stock.investment) * 100).toFixed(2))
                : 0
        }));

        const sectorSummary: Record<string, any> = {};

        portfolio.forEach(stock => {
            if (!sectorSummary[stock.sector]) {
                sectorSummary[stock.sector] = {
                    totalInvestment: 0,
                    totalPresentValue: 0,
                    totalGainLoss: 0
                };
            }
            sectorSummary[stock.sector].totalInvestment += stock.investment;
            sectorSummary[stock.sector].totalPresentValue += stock.presentValue;
            sectorSummary[stock.sector].totalGainLoss += stock.gainLoss;
        });

        res.json({
            summary: {
                totalPortfolioValue,
                totalInvestment: rawStockData.reduce((sum, s) => sum + s.investment, 0),
                totalGainLoss: rawStockData.reduce((sum, s) => sum + s.gainLoss, 0),
            },
            portfolio,
            sectorSummary
        });

    } catch (error) {
        console.error('Portfolio Error:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }
};



