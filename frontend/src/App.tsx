import { useEffect, useState, useCallback } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {
	getExpenses,
	createExpense,
	deleteExpense as deleteExpenseService,
	updateExpense as updateExpenseService,
	getCategorySummary,
} from "./services/expenseService";
import type { Expense } from "./types/expense";
import { categories, type Category } from "./constants/categories";

function App() {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [date, setDate] = useState("");
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState<Category | "">("");
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [categorySummary, setCategorySummary] = useState<
		{ category: string; total: number }[]
	>([]);

	//refreshData
	const refreshData = useCallback(async () => {
		setLoading(true);

		const [expenseData, summaryData] = await Promise.all([
			getExpenses(startDate, endDate),
			getCategorySummary(startDate, endDate),
		]);

		setExpenses(expenseData);
		setCategorySummary(summaryData);
		setLoading(false);
	}, [startDate, endDate]); // <-- refreshData only changes when dates change

	// CREATE
	const addExpense = async () => {
		await createExpense({ name, amount: Number(amount), category, date });
		await refreshData();
		setName("");
		setAmount("");
		setCategory("");
		setDate("");
	};

	const deleteExpense = async (id: number) => {
		await deleteExpenseService(id);
		await refreshData();
	};

	const updateExpense = async (
		id: number,
		data: { name: string; amount: number; category: string },
	) => {
		await updateExpenseService(id, data);
		await refreshData();
	};

	const filteredExpenses = expenses.filter((exp) => {
		const matchesSearch = exp.name.toLowerCase().includes(search.toLowerCase());

		const matchesCategory = !filterCategory || exp.category === filterCategory;

		return matchesSearch && matchesCategory;
	});

	// READ
	useEffect(() => {
		refreshData().catch(console.error);
	}, [refreshData]);

	if (loading) return <p>Loading...</p>;

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<h1>Finance Tracker</h1>

			<div style={{ marginBottom: "20px" }}>
				<h3>Spending by Category</h3>
				{categorySummary.map((item) => (
					<div key={item.category}>
						<strong>{item.category}:</strong> ${item.total.toFixed(2)}
					</div>
				))}
			</div>

			{/* FILTER SECTION */}
			<input
				type="date"
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
				style={{ marginBottom: "10px", width: "100%" }}
			/>

			<input
				type="date"
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
				style={{ marginBottom: "10px", width: "100%" }}
			/>
			<div style={{ marginBottom: "20px" }}>
				<input
					placeholder="Search expenses..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					style={{
						width: "100%",
						padding: "8px",
						marginBottom: "10px",
						borderRadius: "6px",
						border: "1px solid #ccc",
					}}
				/>
				<select
					value={filterCategory}
					onChange={(e) => setFilterCategory(e.target.value)}
					style={{
						width: "100%",
						padding: "8px",
						borderRadius: "6px",
						border: "1px solid #ccc",
					}}
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
			<div style={{ marginBottom: "25px" }}>
				<ExpenseForm
					name={name}
					setName={setName}
					amount={amount}
					setAmount={setAmount}
					category={category}
					setCategory={setCategory}
					date={date}
					setDate={setDate}
					addExpense={addExpense}
				/>
			</div>

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
