type Props = {
	name: string;
	setName: (v: string) => void;
	amount: string;
	setAmount: (v: string) => void;
	category: string;
	setCategory: (v: string) => void;
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
					<input
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
				</div>

				<button type="submit" disabled={!name || !amount || !category}>
					Add
				</button>
			</form>
		</div>
	);
}
