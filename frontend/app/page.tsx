"use client";

import { PortfolioTable } from "@/app/_components/portfolio-table";
import { PortfolioSummary } from "@/app/_components/portfolio-summary";
import { SectorAnalysis } from "@/app/_components/sector-analysis";
import useStockData from "@/app/_hooks/use-stock-data";

export default function Home() {
	const { data, isLoading, error, refresh } = useStockData();

	return (
		<div className="min-h-screen bg-gray-50/50 p-8 font-sans">
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">Portfolio Dashboard</h1>
						<p className="text-muted-foreground">Real-time tracking of your investments across NSE & BSE.</p>
					</div>
				</div>
				<PortfolioSummary isLoading={isLoading} data={data?.summary} />
				<SectorAnalysis isLoading={isLoading} sectors={data?.sectorSummary} />
				<section>
					<PortfolioTable data={data?.portfolio || []} isLoading={isLoading} />
				</section>
			</div>
		</div>
	);
}
