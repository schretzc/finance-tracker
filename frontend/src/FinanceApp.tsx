import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { categories, type Category } from "./constants/categories";
import { useExpenses } from "./hooks/useExpenses";
import LogoutButton from "./components/LogoutButton";

function App() {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [date, setDate] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState<Category | "">("");
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	const {
		expenses,
		categorySummary,
		loading,
		addExpense,
		deleteExpense,
		updateExpense,
	} = useExpenses(startDate, endDate);

	const filteredExpenses = expenses.filter((exp) => {
		const matchesSearch = exp.name.toLowerCase().includes(search.toLowerCase());

		const matchesCategory = !filterCategory || exp.category === filterCategory;

		return matchesSearch && matchesCategory;
	});

	if (loading) return <p>Loading...</p>;

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<LogoutButton />
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
