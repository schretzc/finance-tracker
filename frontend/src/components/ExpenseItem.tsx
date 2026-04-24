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
		<div
			style={{
				border: "1px solid #ddd",
				borderRadius: "8px",
				padding: "12px",
				marginBottom: "12px",
				backgroundColor: "#fff",
				boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
			}}
		>
			{isEditing ? (
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
					<input
						value={editName}
						onChange={(e) => setEditName(e.target.value)}
						style={{ padding: "6px" }}
					/>

					<input
						type="number"
						value={editAmount}
						onChange={(e) => setEditAmount(e.target.value)}
						style={{ padding: "6px" }}
					/>

					<select
						value={editCategory}
						onChange={(e) => setEditCategory(e.target.value as Category)}
						style={{ padding: "6px" }}
					>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<div style={{ display: "flex", gap: "8px" }}>
						<button onClick={handleSave}>Save</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				</div>
			) : (
				<>
					{/* TOP ROW */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "6px",
						}}
					>
						<strong>{expense.name}</strong>
						<span>${expense.amount}</span>
					</div>

					{/* SECOND ROW */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							fontSize: "0.9rem",
							color: "#666",
							marginBottom: "8px",
						}}
					>
						<span>{expense.category}</span>
						<span>{new Date(expense.date).toLocaleDateString()}</span>
					</div>

					{/* ACTIONS */}
					<div style={{ display: "flex", gap: "8px" }}>
						<button onClick={() => onDelete(expense.id)}>Delete</button>
						<button onClick={() => setIsEditing(true)}>Edit</button>
					</div>
				</>
			)}
		</div>
	);
}
