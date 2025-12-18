import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
	value: number;
	suffix?: string;
	isCurrency?: boolean;
	className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value, suffix = "", isCurrency = false, className }) => {
	const isPositive = value >= 0;

	const formattedValue = isCurrency
		? new Intl.NumberFormat("en-IN", {
				style: "currency",
				currency: "INR",
				maximumFractionDigits: 2,
		  }).format(value)
		: `${Math.abs(value).toFixed(2)}${suffix}`;

	return (
		<span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", isPositive ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/10", className)}>

			{isPositive ? "+" : ""}
			{formattedValue}
		</span>
	);
};
