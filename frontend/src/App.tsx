import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

type Expense = {
	id: number;
	name: string;
	amount: number;
	category: string;
	date: string;
};

function App() {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [editName, setEditName] = useState("");
	const [editAmount, setEditAmount] = useState("");
	const [editCategory, setEditCategory] = useState("");
	const [editingId, setEditingId] = useState<number | null>(null);
	const addExpense = async () => {
		try {
			const res = await fetch("http://localhost:3000/expenses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					amount: Number(amount),
					category,
				}),
			});

			const newExpense = await res.json();
			setExpenses((prev) => [...prev, newExpense]);
			setName("");
			setAmount("");
			setCategory("");
		} catch (err) {
			console.error(err);
		}
	};

	const deleteExpense = async (id: number) => {
		try {
			await fetch(`http://localhost:3000/expenses/${id}`, {
				method: "DELETE",
			});

			setExpenses((prev) => prev.filter((exp) => exp.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	const updateExpense = async (id: number) => {
		try {
			const res = await fetch(`http://localhost:3000/expenses/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: editName,
					amount: Number(editAmount),
					category: editCategory,
				}),
			});
			const updated = await res.json();

			setExpenses((prev) => prev.map((exp) => (exp.id === id ? updated : exp)));

			setEditingId(null);

			setEditName("");
			setEditAmount("");
			setEditCategory("");
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetch("http://localhost:3000/expenses")
			.then((res) => res.json())
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
			{editingId !== null && <div>Editing: {editingId}</div>}

			<ExpenseList
				expenses={expenses}
				editingId={editingId}
				editName={editName}
				editAmount={editAmount}
				editCategory={editCategory}
				setEditName={setEditName}
				setEditAmount={setEditAmount}
				setEditCategory={setEditCategory}
				onDelete={deleteExpense}
				onEdit={(exp) => {
					setEditingId(exp.id);
					setEditName(exp.name);
					setEditAmount(String(exp.amount));
					setEditCategory(exp.category);
				}}
				onSave={updateExpense}
				onCancel={() => {
					setEditingId(null);
					setEditName("");
					setEditAmount("");
					setEditCategory("");
				}}
			/>
		</div>
	);
}

export default App;
