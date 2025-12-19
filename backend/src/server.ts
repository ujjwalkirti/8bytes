import app from './app';
import dotenv from 'dotenv';
import http from 'http'
import { Server } from 'socket.io';
import { startMarketFeeder } from './services/marketFeeder';

dotenv.config();

const PORT = process.env.PORT || 3000;
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('subscribe_stocks', (tickers: string[]) => {
        tickers.forEach(ticker => {
            const roomName = `stock:${ticker}`;
            socket.join(roomName);
            console.log(`Socket ${socket.id} joined ${roomName}`);
        });
    });

    socket.on('unsubscribe_stocks', (tickers: string[]) => {
        tickers.forEach(ticker => {
            socket.leave(`stock:${ticker}`);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

startMarketFeeder(io);

app.listen(PORT, () => {
    console.log(`[api]: API is running at http://localhost:${PORT}`);
});

server.listen(SERVER_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${SERVER_PORT}`);
});
