import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/app/_components/portfolio-table/elements/StatusBadge";

interface SectorCardProps {
	name: string;
	investment: number;
	currentValue: number;
	gainLoss: number;
}

export const SectorCard = ({ name, investment, currentValue, gainLoss }: SectorCardProps) => {
	const percentChange = investment > 0 ? ((currentValue - investment) / investment) * 100 : 0;

	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/50 py-3">
				<div className="flex items-center justify-between">
					<CardTitle className="text-sm font-semibold">{name}</CardTitle>
					<StatusBadge value={percentChange} suffix="%" className="text-[10px]" />
				</div>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4 p-4 text-sm">
				<div>
					<p className="text-muted-foreground text-xs">Invested</p>
					<p className="font-semibold">₹{investment.toLocaleString()}</p>
				</div>
				<div>
					<p className="text-muted-foreground text-xs">Current</p>
					<p className="font-semibold">₹{currentValue.toLocaleString()}</p>
				</div>
				<div className="col-span-2 border-t pt-2 mt-1">
					<div className="flex justify-between items-center">
						<span className="text-xs text-muted-foreground">Net P&L</span>
						<span className={`font-bold ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
							{gainLoss >= 0 ? "+" : ""}₹{gainLoss.toLocaleString()}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
