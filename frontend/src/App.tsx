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

			{expenses.length === 0 ? (
				<p>No expenses yet</p>
			) : (
				expenses.map((exp) => (
					<div key={exp.id} style={{ marginBottom: "10px" }}>
						<strong>{exp.name}</strong> — ${exp.amount} ({exp.category})
					</div>
				))
			)}
		</div>
	);
}

export default App;
