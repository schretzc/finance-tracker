import { categories, type Category } from "../constants/categories";

type Props = {
	name: string;
	setName: (v: string) => void;
	amount: string;
	setAmount: (v: string) => void;
	category: Category | "";
	setCategory: (v: Category | "") => void;
	addExpense: () => void;
};

export default function ExpenseForm({
	name,
	setName,
	amount,
	setAmount,
	category,
	setCategory,
	addExpense,
}: Props) {
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addExpense();
				}}
			>
				<h2>Add Expense</h2>

				<div>
					<label>Name</label>
					<input value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div>
					<label>Amount</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>

				<div>
					<label>Category</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value as Category | "")}
					>
						<option value="">Select category</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>

				<button type="submit" disabled={!name || !amount || !category}>
					Add
				</button>
			</form>
		</div>
	);
}
