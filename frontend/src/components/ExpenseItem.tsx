import { useState } from "react";
import type { Expense } from "../types/expense";
import { categories, type Category } from "../constants/categories";
import {
	secondaryButtonStyle,
	dangerButtonStyle,
	primaryButtonStyle,
	inputStyle,
} from "../constants/styles";
import { toast } from "react-toastify";

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

		toast.success("Expense updated");
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
						style={inputStyle}
					/>

					<input
						type="number"
						value={editAmount}
						onChange={(e) => setEditAmount(e.target.value)}
						style={inputStyle}
					/>

					<select
						value={editCategory}
						onChange={(e) => setEditCategory(e.target.value as Category)}
						style={inputStyle}
					>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<div style={{ display: "flex", gap: "8px" }}>
						<button onClick={handleSave} style={primaryButtonStyle}>
							Save
						</button>
						<button onClick={handleCancel} style={secondaryButtonStyle}>
							Cancel
						</button>
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
						<span style={{ fontWeight: "bold" }}>
							${expense.amount.toFixed(2)}
						</span>
					</div>

					{/* SECOND ROW */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							fontSize: "0.85rem",
							color: "#777",
							marginBottom: "8px",
						}}
					>
						<span
							style={{
								background: "#f3f4f6",
								padding: "2px 8px",
								borderRadius: "999px",
								fontSize: "0.8rem",
							}}
						>
							{expense.category}
						</span>
						<span>{new Date(expense.date).toLocaleDateString()}</span>
					</div>

					{/* Actions */}
					<div style={{ display: "flex", gap: "8px" }}>
						<button
							onClick={() => {
								if (confirm("Delete this expense?")) {
									onDelete(expense.id);
									toast.success("Expense deleted");
								}
							}}
							style={dangerButtonStyle}
						>
							Delete
						</button>
						<button
							onClick={() => setIsEditing(true)}
							style={secondaryButtonStyle}
						>
							Edit
						</button>
					</div>
				</>
			)}
		</div>
	);
}
