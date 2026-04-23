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

function App() {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");

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

	if (loading) return <p>Loading...</p>;

	return (
		<div style={{ padding: "20px" }}>
			<h1>Finance Tracker</h1>

			<ExpenseForm
				name={name}
				setName={setName}
				amount={amount}
				setAmount={setAmount}
				category={category}
				setCategory={setCategory}
				addExpense={addExpense}
			/>

			<ExpenseList
				expenses={expenses}
				onDelete={deleteExpense}
				onUpdate={updateExpense}
			/>
		</div>
	);
}

export default App;
