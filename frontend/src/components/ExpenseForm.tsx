import { categories, type Category } from "../constants/categories";
import { inputStyle, primaryButtonStyle } from "../constants/styles";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
	name: string;
	setName: (v: string) => void;
	amount: string;
	setAmount: (v: string) => void;
	category: Category | "";
	setCategory: (v: Category | "") => void;
	date: string;
	setDate: (v: string) => void;
	addExpense: (data: {
		name: string;
		amount: number;
		category: string;
		date: string;
	}) => Promise<void>;
};

export default function ExpenseForm({
	name,
	setName,
	amount,
	setAmount,
	category,
	setCategory,
	date,
	setDate,
	addExpense,
}: Props) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<div style={{ marginBottom: "12px" }}>
				<button onClick={() => setOpen(!open)} style={primaryButtonStyle}>
					Add Expense {open ? "▲" : "▼"}
				</button>
			</div>
			{open && (
				<form
					onSubmit={async (e) => {
						e.preventDefault();

						try {
							await addExpense({
								name,
								amount: Number(amount),
								category,
								date,
							});

							toast.success("Expense added");

							setName("");
							setAmount("");
							setCategory("");
							setDate("");
							setOpen(false);
						} catch (err) {
							console.error(err);
						}
					}}
				>
					<h2>Add Expense</h2>

					<div>
						<label>Name</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							style={inputStyle}
						/>
					</div>

					<div>
						<label>Amount</label>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							style={inputStyle}
						/>
					</div>
					<div>
						<label>Date</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							style={inputStyle}
						/>
					</div>
					<div>
						<label>Category</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value as Category | "")}
							style={inputStyle}
						>
							<option value="">Select category</option>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					<button
						type="submit"
						disabled={!name || !amount || !category}
						style={primaryButtonStyle}
					>
						Add
					</button>
				</form>
			)}
		</div>
	);
}
