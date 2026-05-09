import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { type Category } from "./constants/categories";
import { useExpenses } from "./hooks/useExpenses";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";

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

	if (loading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<p>Loading expenses...</p>
			</div>
		);
	}

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<Navbar />
			{/* FILTER SECTION */}
			<FilterBar
				search={search}
				setSearch={setSearch}
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
				filterCategory={filterCategory}
				setFilterCategory={setFilterCategory}
			/>

			<div style={{ marginBottom: "20px" }}>
				<h3>Spending by Category</h3>
				{categorySummary.map((item) => (
					<div key={item.category}>
						<strong>{item.category}:</strong> ${item.total.toFixed(2)}
					</div>
				))}
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
			{/* LIST SECTION */}
			{filteredExpenses.length === 0 ? (
				<p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
					No expenses found
				</p>
			) : (
				<ExpenseList
					expenses={filteredExpenses}
					onDelete={deleteExpense}
					onUpdate={updateExpense}
				/>
			)}
		</div>
	);
}

export default App;
