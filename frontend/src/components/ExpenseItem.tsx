import { useState } from "react";
import type { Expense } from "../types/expense";
import { categories, type Category } from "../constants/categories";

type Props = {
	expense: Expense;
	onDelete: (id: number) => void;
	onUpdate: (
		id: number,
		data: {
			name: string;
			amount: number;
			category: Category;
		},
	) => void;
};

export default function ExpenseItem({ expense, onDelete, onUpdate }: Props) {
	const [isEditing, setIsEditing] = useState(false);

	const [editName, setEditName] = useState(expense.name);
	const [editAmount, setEditAmount] = useState(String(expense.amount));
	const [editCategory, setEditCategory] = useState(expense.category);

	const handleSave = () => {
		onUpdate(expense.id, {
			name: editName,
			amount: Number(editAmount),
			category: editCategory,
		});

		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditName(expense.name);
		setEditAmount(String(expense.amount));
		setEditCategory(expense.category); // FIXED
		setIsEditing(false);
	};

	return (
		<div style={{ marginBottom: "10px" }}>
			{isEditing ? (
				<div>
					<input
						value={editName}
						onChange={(e) => setEditName(e.target.value)}
					/>

					<input
						value={editAmount}
						onChange={(e) => setEditAmount(e.target.value)}
					/>

					<select
						value={editCategory}
						onChange={(e) => setEditCategory(e.target.value as Category)}
					>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<button onClick={handleSave}>Save</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
			) : (
				<div>
					<strong>{expense.name}</strong> - ${expense.amount} (
					{expense.category})
				</div>
			)}

			<div>{new Date(expense.date).toLocaleString()}</div>

			{!isEditing && (
				<>
					<button onClick={() => onDelete(expense.id)}>Delete</button>
					<button onClick={() => setIsEditing(true)}>Edit</button>
				</>
			)}
		</div>
	);
}
