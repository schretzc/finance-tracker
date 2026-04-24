import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {
	getExpenses,
	createExpense,
	deleteExpense as deleteExpenseService,
	updateExpense as updateExpenseService,
} from "./services/expenseService";
import type { Expense } from "./types/expense";
import { categories, type Category } from "./constants/categories";

function App() {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState<Category | "">("");
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	// CREATE
	const addExpense = async () => {
		const newExpense = await createExpense({
			name,
			amount: Number(amount),
			category,
		});

		setExpenses((prev) => [...prev, newExpense]);

		setName("");
		setAmount("");
		setCategory("");
	};

	// DELETE
	const deleteExpense = async (id: number) => {
		await deleteExpenseService(id);
		setExpenses((prev) => prev.filter((exp) => exp.id !== id));
	};

	// UPDATE (used by ExpenseItem)
	const updateExpense = async (
		id: number,
		data: {
			name: string;
			amount: number;
			category: string;
		},
	) => {
		const updated = await updateExpenseService(id, data);

		setExpenses((prev) => prev.map((exp) => (exp.id === id ? updated : exp)));
	};

	// READ
	useEffect(() => {
		getExpenses()
			.then((data) => {
				setExpenses(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	const filteredExpenses = expenses.filter((exp) => {
		const matchesSearch = exp.name.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = !filterCategory || exp.category === filterCategory;
		return matchesSearch && matchesCategory;
	});

	if (loading) return <p>Loading...</p>;

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<h1>Finance Tracker</h1>

			{/* FILTER SECTION */}
			<div style={{ marginBottom: "15px" }}>
				<input
					placeholder="Search expenses..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<select
					value={filterCategory}
					onChange={(e) => setFilterCategory(e.target.value)}
				>
					<option value="">All Categories</option>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>

			{/* FORM SECTION */}
			<ExpenseForm
				name={name}
				setName={setName}
				amount={amount}
				setAmount={setAmount}
				category={category}
				setCategory={setCategory}
				addExpense={addExpense}
			/>

			{/* LIST SECTION */}
			<ExpenseList
				expenses={filteredExpenses}
				onDelete={deleteExpense}
				onUpdate={updateExpense}
			/>
		</div>
	);
}

export default App;
