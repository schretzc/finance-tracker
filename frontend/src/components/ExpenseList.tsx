import ExpenseItem from "./ExpenseItem";
import type { Expense } from "../types/expense";

type Props = {
	expenses: Expense[];
	editingId: number | null;
	editName: string;
	editAmount: string;
	editCategory: string;
	setEditName: (v: string) => void;
	setEditAmount: (v: string) => void;
	setEditCategory: (v: string) => void;
	onDelete: (id: number) => void;
	onEdit: (expense: Expense) => void;
	onSave: (id: number) => void;
	onCancel: () => void;
};

export default function ExpenseList({
	expenses,
	editingId,
	editName,
	editAmount,
	editCategory,
	setEditName,
	setEditAmount,
	setEditCategory,
	onDelete,
	onEdit,
	onSave,
	onCancel,
}: Props) {
	return (
		<div>
			{expenses.map((exp) => (
				<ExpenseItem
					key={exp.id}
					expense={exp}
					editingId={editingId}
					editName={editName}
					editAmount={editAmount}
					editCategory={editCategory}
					setEditName={setEditName}
					setEditAmount={setEditAmount}
					setEditCategory={setEditCategory}
					onDelete={onDelete}
					onEdit={onEdit}
					onSave={onSave}
					onCancel={onCancel}
				/>
			))}
		</div>
	);
}
