import useSWR from "swr";
import { useCallback } from "react";
import { useStockSocket } from "./use-stock-socket";
import { PortfolioResponse, StockUpdatePayload } from "@/app/_components/portfolio-table/types";


const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function useStockData() {
    const { data, error, isLoading, mutate } = useSWR<PortfolioResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`,
        fetcher,
        { refreshInterval: 0 }
    );

    const handleUpdate = useCallback(
        (newData: StockUpdatePayload) => {
            mutate((prev: PortfolioResponse | undefined) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    portfolio: prev.portfolio.map((item) => {
                        if (item.ticker === newData.ticker) {
                            const newPresentValue = newData.cmp * item.quantity;
                            const newGainLoss = newPresentValue - item.buyPrice * item.quantity;

                            return {
                                ...item,
                                cmp: newData.cmp,
                                peRatio: newData.peRatio,
                                earnings: newData.earnings,
                                presentValue: newPresentValue,
                                gainLoss: newGainLoss,

                            };
                        }
                        return item;
                    }),
                };
            }, false);
        },
        [mutate]
    );

    useStockSocket(data?.portfolio || [], handleUpdate);

    return {
        data,
        error,
        isLoading,
        refresh: mutate,
    };
}
