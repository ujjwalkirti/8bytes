import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

interface MetricCardProps {
	title: string;
	value: number;
	isCurrency?: boolean;
	trend?: "up" | "down" | "neutral";
	trendValue?: number;
	trendPercent?: number;
	icon?: React.ReactNode;
}

export const MetricCard = ({ title, value, isCurrency = true, trend, trendValue, trendPercent, icon }: MetricCardProps) => {
	const formattedValue = isCurrency ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value) : value.toLocaleString();

	const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600";
	const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null;

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
				{icon || <DollarSign className="h-4 w-4 text-muted-foreground" />}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{formattedValue}</div>
				{trend && trendValue !== undefined && (
					<div className={cn("flex items-center text-xs font-medium mt-1", trendColor)}>
						{TrendIcon && <TrendIcon className="mr-1 h-4 w-4" />}
						{isCurrency ? "₹" : ""}
						{Math.abs(trendValue).toLocaleString()}
						{trendPercent !== undefined && ` (${Math.abs(trendPercent).toFixed(2)}%)`}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
