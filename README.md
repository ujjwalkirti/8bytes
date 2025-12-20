# Portfolio Market Feeder

A real-time portfolio tracking application that fetches live stock data and displays market metrics with a modern, responsive UI.

## Project Overview

This project consists of a **Next.js frontend** and a **Node.js/Express backend** that work together to provide real-time stock market data:

- **Frontend**: Interactive dashboard displaying portfolio holdings with live price updates
- **Backend**: Market data aggregator using web scraping and real-time WebSocket updates
- **Real-time Updates**: Socket.io enabled for live price, P/E ratio, and earnings data

## Tech Stack

### Frontend
- **Next.js** 15+ - React framework for production
- **TypeScript** - Type-safe development
- **Socket.io Client** - Real-time WebSocket communication
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built React components

### Backend
- **Node.js & Express** - Server runtime and web framework
- **TypeScript** - Type-safe server code
- **Socket.io** - Real-time bidirectional communication
- **Puppeteer** - Browser automation for web scraping
- **Yahoo Finance API** - Historical and real-time price data
- **Google Finance Scraper** - P/E ratio and earnings data

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── app.ts                    # Express app setup
│   │   ├── server.ts                 # Server entry point
│   │   ├── controllers/              # Request handlers
│   │   ├── routes/                   # API routes
│   │   ├── services/                 # Business logic
│   │   │   ├── googleFinance.service.ts
│   │   │   ├── yahooFinance.service.ts
│   │   │   └── marketFeeder.ts      # Real-time data stream
│   │   ├── data/                     # Mock data
│   │   └── types/                    # TypeScript interfaces
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    │   ├── layout.tsx                # Root layout
    │   ├── page.tsx                  # Home page
    │   ├── globals.css               # Global styles
    │   └── _components/              # Reusable components
    │       ├── portfolio-summary/
    │       ├── portfolio-table/
    │       ├── sector-analysis/
    │       └── ...
    ├── components/                   # UI library components
    ├── lib/                          # Utility functions
    ├── package.json
    ├── tsconfig.json
    └── next.config.ts
```

## Setup Instructions

### Prerequisites

- **Node.js** 18+ and **npm** or **yarn**
- **Docker** (optional, for running backend in container)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the TypeScript**
   ```bash
   npm run build
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8000`

5. **(Optional) Run with Docker**
   ```bash
   docker build -t portfolio-feeder .
   docker run -p 8000:8000 portfolio-feeder
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Key Features

- **Real-time Price Updates**: Live stock prices via Yahoo Finance
- **Financial Metrics**: P/E ratios and earnings data via Google Finance scraping
- **Portfolio Dashboard**: View all holdings with key metrics
- **WebSocket Updates**: Efficient real-time data streaming using Socket.io
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Error Handling**: Graceful fallbacks when data sources are unavailable

## Data Flow

1. **Backend Market Feeder** runs continuous loops for each stock in the portfolio
2. When clients connect to a stock room (`stock:TICKER`), the feeder starts fetching data
3. **Yahoo Finance Service** provides current price data
4. **Google Finance Service** scrapes P/E ratio and earnings data (with Puppeteer)
5. Data is aggregated and emitted via **Socket.io** to all connected clients
6. **Frontend** receives real-time updates and re-renders the dashboard

## Environment Variables

Create a `.env.local` file in the backend directory if needed for configuration.

## Troubleshooting

- **Browser Connection Issues**: Ensure Puppeteer has access to a Chromium instance
- **Socket.io Connection Failed**: Verify backend is running and accessible from frontend
- **Zero Data Returned**: Google Finance scraper updates are skipped if both PE and EPS are 0

## Development

Both frontend and backend support hot-reload during development:
- Backend: Uses TypeScript compiler in watch mode
- Frontend: Next.js built-in hot module replacement


