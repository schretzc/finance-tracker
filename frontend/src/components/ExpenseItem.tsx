type Expense = {
	id: number;
	name: string;
	amount: number;
	category: string;
	date: string;
};

type Props = {
	expense: Expense;
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

export default function ExpenseItem({
	expense,
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
		<div style={{ marginBottom: "10px" }}>
			{editingId === expense.id ? (
				<div>
					<input
						value={editName}
						onChange={(e) => setEditName(e.target.value)}
					/>
					<input
						value={editAmount}
						onChange={(e) => setEditAmount(e.target.value)}
					/>
					<input
						value={editCategory}
						onChange={(e) => setEditCategory(e.target.value)}
					/>
					<button onClick={() => onSave(expense.id)}>Save</button>
					<button onClick={onCancel}>Cancel</button>
				</div>
			) : (
				<div>
					<strong>{expense.name}</strong> - ${expense.amount} (
					{expense.category})
				</div>
			)}
			<div>{new Date(expense.date).toLocaleString()}</div>
			{editingId !== expense.id && (
				<>
					<button onClick={() => onDelete(expense.id)}>Delete</button>
					<button onClick={() => onEdit(expense)}>Edit</button>
				</>
			)}
		</div>
	);
}
