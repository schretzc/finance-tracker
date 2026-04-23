import ExpenseItem from "./ExpenseItem";
import type { Expense } from "../types/expense";

type Props = {
	expenses: Expense[];
	onDelete: (id: number) => void;
	onUpdate: (
		id: number,
		data: {
			name: string;
			amount: number;
			category: string;
		},
	) => void;
};

export default function ExpenseList({ expenses, onDelete, onUpdate }: Props) {
	return (
		<div>
			{expenses.map((exp) => (
				<ExpenseItem
					key={exp.id}
					expense={exp}
					onDelete={onDelete}
					onUpdate={onUpdate}
				/>
			))}
		</div>
	);
}
