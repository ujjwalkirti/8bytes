import { MetricCard } from "../elements/MetricCard";
import { Wallet, TrendingUp, PiggyBank } from "lucide-react";

interface SummaryData {
	totalInvestment: number;
	totalPortfolioValue: number;
	totalGainLoss: number;
}

interface SummaryGridProps {
	data?: SummaryData;
	isLoading: boolean;
}

export const SummaryGrid = ({ data, isLoading }: SummaryGridProps) => {
	if (isLoading || !data) {
		return <div className="grid gap-4 md:grid-cols-3">Loading summary...</div>;
	}

	const { totalInvestment, totalPortfolioValue, totalGainLoss } = data;
	const gainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;
	const isProfit = totalGainLoss >= 0;

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<MetricCard title="Total Investment" value={totalInvestment} icon={<Wallet className="h-4 w-4 text-gray-500" />} />

			<MetricCard title="Current Value" value={totalPortfolioValue} icon={<PiggyBank className="h-4 w-4 text-blue-500" />} />

			<MetricCard title="Total Profit/Loss" value={Math.abs(totalGainLoss)} trend={isProfit ? "up" : "down"} trendValue={totalGainLoss} trendPercent={gainLossPercent} icon={<TrendingUp className={isProfit ? "text-green-500" : "text-red-500"} />} />
		</div>
	);
};
