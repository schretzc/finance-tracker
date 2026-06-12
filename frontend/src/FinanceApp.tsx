import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { type Category } from "./constants/categories";
import { useExpenses } from "./hooks/useExpenses";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import CategoryChart from "./components/CategoryChart";
import MonthlySpendingChart from "./components/MonthlySpendingChart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [date, setDate] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState<Category | "">("");
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	const { expenses, loading, addExpense, deleteExpense, updateExpense } =
		useExpenses();

	const filteredExpenses = expenses.filter((exp) => {
		const matchesSearch = exp.name.toLowerCase().includes(search.toLowerCase());

		const matchesCategory = !filterCategory || exp.category === filterCategory;

		const matchesStartDate = !startDate || exp.date >= startDate;

		const matchesEndDate = !endDate || exp.date <= endDate;

		return (
			matchesSearch && matchesCategory && matchesStartDate && matchesEndDate
		);
	});

	if (loading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<p>Loading expenses...</p>
			</div>
		);
	}

	const clearFilters = () => {
		setSearch("");
		setStartDate("");
		setEndDate("");
		setFilterCategory("");
	};

	const categoryData = filteredExpenses.reduce(
		(acc, exp) => {
			const category = exp.category;
			const amount = Number(exp.amount);

			acc[category] = (acc[category] || 0) + amount;

			return acc;
		},
		{} as Record<string, number>,
	);

	const chartData = Object.entries(categoryData).map(([category, total]) => ({
		category,
		total,
	}));

	const monthlyDataMap = filteredExpenses.reduce(
		(acc, exp) => {
			const date = new Date(exp.date);

			const key = `${date.getFullYear()}-${date.getMonth()}`;
			// e.g. "2026-0", "2026-1"

			acc[key] = (acc[key] || 0) + Number(exp.amount);

			return acc;
		},
		{} as Record<string, number>,
	);

	const monthlyChartData = Object.entries(monthlyDataMap)
		.sort(([a], [b]) => {
			const [yearA, monthA] = a.split("-").map(Number);
			const [yearB, monthB] = b.split("-").map(Number);

			return yearA === yearB ? monthA - monthB : yearA - yearB;
		})
		.map(([key, total]) => {
			const [year, month] = key.split("-").map(Number);
			const date = new Date(year, month);

			return {
				month: date.toLocaleString("default", {
					month: "short",
					year: "numeric",
				}),
				total,
			};
		});

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
				clearFilters={clearFilters}
			/>

			<div style={{ marginBottom: "20px" }}>
				<h3>Spending by Category</h3>

				{Object.keys(categoryData).length === 0 ? (
					<p style={{ color: "#777" }}>No data</p>
				) : (
					Object.entries(categoryData).map(([category, total]) => (
						<div
							key={category}
							style={{
								display: "flex",
								justifyContent: "space-between",
								padding: "4px 0",
							}}
						>
							<span>{category}</span>
							<strong>${total.toFixed(2)}</strong>
						</div>
					))
				)}
			</div>
			<CategoryChart data={chartData} />

			<MonthlySpendingChart data={monthlyChartData} />

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
			<ToastContainer position="bottom-right" autoClose={2000} />
		</div>
	);
}

export default App;
