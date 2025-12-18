export interface PortfolioItem {
    id: string;
    name: string;
    ticker: string;
    exchange: string;
    sector: string;
    buyPrice: number;
    quantity: number;
    investment: number;
    portfolioPercentage: number;
    cmp: number;
    presentValue: number;
    gainLoss: number;
    gainLossPercent: number;
    peRatio: number;
    earnings: number;
}

export interface SectorData {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
}

export interface PortfolioResponse {
    summary: {
        totalPortfolioValue: number;
        totalInvestment: number;
        totalGainLoss: number;
    };
    portfolio: PortfolioItem[];
    sectorSummary: Record<string, SectorData>;
}


export interface StockUpdatePayload {
    ticker: string;
    cmp: number;
    peRatio: number;
    earnings: number;
    lastUpdated: number;
}
