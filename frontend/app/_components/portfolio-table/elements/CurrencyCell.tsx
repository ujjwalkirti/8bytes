import { cn } from "@/lib/utils";

interface CurrencyCellProps {
	amount: number;
	className?: string;
	isBold?: boolean;
}

export const CurrencyCell = ({ amount, className, isBold = false }: CurrencyCellProps) => {
	const formatted = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 2,
	}).format(amount);

	return (
		<div
			className={cn(
				"text-right font-mono tracking-tight",
				isBold && "font-bold text-gray-900",
				className
			)}
		>
			{formatted}
		</div>
	);
};
