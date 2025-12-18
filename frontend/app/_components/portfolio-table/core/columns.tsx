"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PortfolioItem } from "../types";
import { StatusBadge } from "../elements/StatusBadge";
import { CurrencyCell } from "../elements/CurrencyCell";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatPercent = (value: number) => {
	return `${value.toFixed(2)}%`;
};

export const columns: ColumnDef<PortfolioItem>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="pl-0 hover:bg-transparent">
					Particulars
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-semibold text-gray-900">{row.original.name}</span>
				<span className="text-xs text-muted-foreground uppercase">
					{row.original.ticker} • {row.original.exchange}
				</span>
			</div>
		),
	},
	{
		accessorKey: "sector",
		header: "Sector",
		cell: ({ row }) => (
			<span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
				{row.getValue("sector")}
			</span>
		),
	},
	{
		accessorKey: "buyPrice",
		header: () => <div className="text-right">Purchase Price</div>,
		cell: ({ row }) => <CurrencyCell amount={row.getValue("buyPrice")} className="text-gray-700" />,
	},
	{
		accessorKey: "quantity",
		header: () => <div className="text-right">Quantity</div>,
		cell: ({ row }) => <div className="text-right text-muted-foreground">{row.getValue("quantity")}</div>,
	},
	{
		accessorKey: "investment",
		header: () => <div className="text-right">Investment</div>,
		cell: ({ row }) => <CurrencyCell amount={row.getValue("investment")} className="text-gray-700" />,
	},
	{
		accessorKey: "portfolioPercentage",
		header: () => <div className="text-right">Portfolio %</div>,
		cell: ({ row }) => <div className="text-right text-muted-foreground">{formatPercent(row.getValue("portfolioPercentage"))}</div>,
	},
	{
		accessorKey: "cmp",
		header: () => <div className="text-right">CMP</div>,
		cell: ({ row }) => <CurrencyCell amount={row.getValue("cmp")} />,
	},
	{
		accessorKey: "presentValue",
		header: () => <div className="text-right">Present Value</div>,
		cell: ({ row }) => <CurrencyCell amount={row.getValue("presentValue")} isBold={true} />,
	},
	{
		accessorKey: "gainLoss",
		header: "Gain/Loss",
		cell: ({ row }) => {
			const gainLoss = row.original.gainLoss;
			const percent = row.original.gainLossPercent;

			return (
				<div className="flex flex-col items-start gap-1">
					<StatusBadge value={gainLoss} isCurrency={true} />

					<span className={`text-xs ${percent >= 0 ? "text-green-600" : "text-red-600"}`}>
						{percent >= 0 ? "+" : ""}
						{percent.toFixed(2)}%
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "peRatio",
		header: () => <div className="text-right">P/E</div>,
		cell: ({ row }) => {
			const pe = row.getValue("peRatio") as number;
			return <div className="text-right">{pe ? pe.toFixed(2) : "-"}</div>;
		},
	},
	{
		accessorKey: "earnings",
		header: () => <div className="text-right">Earnings</div>,
		cell: ({ row }) => {
			const earnings = row.getValue("earnings") as number;
			return <div className="text-right">{earnings ? earnings.toFixed(2) : "-"}</div>;
		},
	},
];
