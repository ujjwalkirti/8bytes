import { Holding } from "../types/holding";

export const PORTFOLIO_HOLDINGS: Holding[] = [
    // --- Financial Sector ---
    { id: '1', name: 'HDFC Bank', ticker: 'HDFCBANK', exchange: 'NSE', sector: 'Financials', buyPrice: 1490, quantity: 50 },
    { id: '2', name: 'Bajaj Finance', ticker: 'BAJFINANCE', exchange: 'NSE', sector: 'Financials', buyPrice: 6466, quantity: 15 },
    { id: '3', name: 'ICICI Bank', ticker: 'ICICIBANK', exchange: 'NSE', sector: 'Financials', buyPrice: 780, quantity: 84 },
    { id: '4', name: 'Bajaj Housing', ticker: 'BAJAJHFL', exchange: 'NSE', sector: 'Financials', buyPrice: 130, quantity: 504 },
    { id: '5', name: 'Savani Financials', ticker: '511577', exchange: 'BSE', sector: 'Financials', buyPrice: 24, quantity: 1080 }, // Savani is BSE only

    // --- Tech Sector ---
    { id: '6', name: 'Affle India', ticker: 'AFFLE', exchange: 'NSE', sector: 'Technology', buyPrice: 1151, quantity: 50 },
    { id: '7', name: 'LTI Mindtree', ticker: 'LTIM', exchange: 'NSE', sector: 'Technology', buyPrice: 4775, quantity: 16 },
    { id: '8', name: 'KPIT Tech', ticker: 'KPITTECH', exchange: 'NSE', sector: 'Technology', buyPrice: 1500, quantity: 20 }, // Placeholder Price
    { id: '9', name: 'Tata Tech', ticker: 'TATATECH', exchange: 'NSE', sector: 'Technology', buyPrice: 1200, quantity: 25 },
    { id: '10', name: 'BLS E-Services', ticker: 'BLSE', exchange: 'NSE', sector: 'Technology', buyPrice: 350, quantity: 100 },
    { id: '11', name: 'Tanla Platforms', ticker: 'TANLA', exchange: 'NSE', sector: 'Technology', buyPrice: 950, quantity: 40 },

    // --- Consumer Sector ---
    { id: '12', name: 'DMart (Avenue Supermarts)', ticker: 'DMART', exchange: 'NSE', sector: 'Consumer', buyPrice: 3800, quantity: 10 },
    { id: '13', name: 'Tata Consumer', ticker: 'TATACONSUM', exchange: 'NSE', sector: 'Consumer', buyPrice: 1100, quantity: 30 },
    { id: '14', name: 'Pidilite Industries', ticker: 'PIDILITIND', exchange: 'NSE', sector: 'Consumer', buyPrice: 2700, quantity: 15 },

    // --- Power Sector ---
    { id: '15', name: 'Tata Power', ticker: 'TATAPOWER', exchange: 'NSE', sector: 'Power', buyPrice: 350, quantity: 200 },
    { id: '16', name: 'KPI Green Energy', ticker: 'KPIGREEN', exchange: 'NSE', sector: 'Power', buyPrice: 1400, quantity: 25 },
    { id: '17', name: 'Suzlon Energy', ticker: 'SUZLON', exchange: 'NSE', sector: 'Power', buyPrice: 45, quantity: 1000 },
    { id: '18', name: 'Gensol Engineering', ticker: 'GENSOL', exchange: 'NSE', sector: 'Power', buyPrice: 850, quantity: 40 },

    // --- Pipe Sector ---
    { id: '19', name: 'Hariom Pipe Industries', ticker: 'HARIOMPIPE', exchange: 'NSE', sector: 'Pipes', buyPrice: 600, quantity: 50 },
    { id: '20', name: 'Astral Ltd', ticker: 'ASTRAL', exchange: 'NSE', sector: 'Pipes', buyPrice: 2000, quantity: 20 },
    { id: '21', name: 'Polycab India', ticker: 'POLYCAB', exchange: 'NSE', sector: 'Pipes', buyPrice: 5500, quantity: 10 },

    // --- Others ---
    { id: '22', name: 'Clean Science', ticker: 'CLEAN', exchange: 'NSE', sector: 'Chemicals', buyPrice: 1400, quantity: 30 },
    { id: '23', name: 'Deepak Nitrite', ticker: 'DEEPAKNTR', exchange: 'NSE', sector: 'Chemicals', buyPrice: 2400, quantity: 25 },
    { id: '24', name: 'Fine Organic', ticker: 'FINEORG', exchange: 'NSE', sector: 'Chemicals', buyPrice: 4800, quantity: 10 },
    { id: '25', name: 'Gravita India', ticker: 'GRAVITA', exchange: 'NSE', sector: 'Others', buyPrice: 1200, quantity: 40 },
    { id: '26', name: 'SBI Life Insurance', ticker: 'SBILIFE', exchange: 'NSE', sector: 'Financials', buyPrice: 1600, quantity: 25 },
];
