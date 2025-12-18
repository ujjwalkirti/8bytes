import { SectorCard } from "../elements/SectorCard";

interface SectorData {
	totalInvestment: number;
	totalPresentValue: number;
	totalGainLoss: number;
}

interface SectorListProps {
	sectors?: Record<string, SectorData>;
	isLoading: boolean;
}

export const SectorList = ({ sectors, isLoading }: SectorListProps) => {
	if (isLoading || !sectors) return null;

	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold tracking-tight">Sector Performance</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Object.entries(sectors).map(([sectorName, data]) => (
					<SectorCard key={sectorName} name={sectorName} investment={data.totalInvestment} currentValue={data.totalPresentValue} gainLoss={data.totalGainLoss} />
				))}
			</div>
		</div>
	);
};
