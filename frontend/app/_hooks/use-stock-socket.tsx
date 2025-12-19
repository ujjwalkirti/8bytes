import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { PortfolioItem, StockUpdatePayload } from "@/app/_components/portfolio-table/types";

export const useStockSocket = (initialHoldings: PortfolioItem[], onUpdate: (data: StockUpdatePayload) => void) => {
	const socketRef = useRef<Socket | null>(null);
	const tickersRef = useRef<string[]>([]);

	useEffect(() => {
		if (!socketRef.current) {
			socketRef.current = io(process.env.NEXT_PUBLIC_SOCKETIO_URL || "http://localhost:5000", {
				reconnection: true,
				reconnectionDelay: 1000,
				reconnectionDelayMax: 5000,
				reconnectionAttempts: Infinity,
				transports: ["websocket"],
			});

			socketRef.current.on("connect", () => {
				console.log("Connected to Market Data Feed");
				if (tickersRef.current.length > 0) {
					socketRef.current?.emit("subscribe_stocks", tickersRef.current);
				}
			});

			socketRef.current.on("price_update", (updatePayload: StockUpdatePayload) => {
				onUpdate(updatePayload);
			});

			socketRef.current.on("disconnect", (reason) => {
				console.log("Disconnected:", reason);
			});
		}

		const newTickers = initialHoldings.map((h) => h.ticker);

		if (JSON.stringify(newTickers) !== JSON.stringify(tickersRef.current)) {
			tickersRef.current = newTickers;
			if (socketRef.current?.connected) {
				socketRef.current.emit("subscribe_stocks", newTickers);
			}
		}

		return () => {

		};
	}, [initialHoldings, onUpdate]);

	useEffect(() => {
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);
};
