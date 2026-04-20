import { useEffect, useState } from "react";

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
			<div>
				<h2>Add Expense</h2>

				<div>
					<label>Name</label>
					<input value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div>
					<label>Amount</label>
					<input value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
				<div>
					<label>Category</label>
					<input
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
				</div>

				<button onClick={addExpense}>Add</button>
			</div>
			{editingId !== null && <div>Editing: {editingId}</div>}

			{expenses.map((exp) => (
				<div key={exp.id} style={{ marginBottom: "10px" }}>
					<div>ID: {exp.id}</div>

					{editingId === exp.id ? (
						<div>
							<input
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
							/>

							<input
								value={editAmount}
								onChange={(e) => setEditAmount(e.target.value)}
							/>

							<input
								value={editCategory}
								onChange={(e) => setEditCategory(e.target.value)}
							/>
							<button onClick={() => updateExpense(exp.id)}>Save</button>
						</div>
					) : (
						<div>
							<strong>{exp.name}</strong> - ${exp.amount} ({exp.category})
						</div>
					)}

					<div>Date: {new Date(exp.date).toLocaleString()}</div>
					<button onClick={() => deleteExpense(exp.id)}>Delete</button>
					<button
						onClick={() => {
							setEditingId(exp.id);
							setEditName(exp.name);
							setEditAmount(String(exp.amount));
							setEditCategory(exp.category);
						}}
					>
						Edit
					</button>
				</div>
			))}
		</div>
	);
}

export default App;
