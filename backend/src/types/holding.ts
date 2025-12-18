export interface Holding {
    id: string;
    name: string;
    ticker: string;
    exchange: 'NSE' | 'BSE';
    sector: string;
    buyPrice: number;
    quantity: number;
}
