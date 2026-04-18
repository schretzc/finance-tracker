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

			{expenses.map((exp) => (
				<div key={exp.id} style={{ marginBottom: "10px" }}>
					<div>ID: {exp.id}</div>

					<div>
						<strong>{exp.name}</strong> — ${exp.amount} ({exp.category})
					</div>

					<div>Date: {new Date(exp.date).toLocaleString()}</div>
					<button onClick={() => deleteExpense(exp.id)}>Delete</button>
				</div>
			))}
		</div>
	);
}

export default App;
