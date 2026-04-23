const BASE_URL = "http://localhost:3000/expenses";

//get all expenses
export const getExpenses = async () => {
	const res = await fetch(BASE_URL);
	return res.json();
};

//create new expense
export const createExpense = async (data: {
	name: string;
	amount: number;
	category: string;
}) => {
	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return res.json();
};

//delete expense
export const deleteExpense = async (id: number) => {
	await fetch(`${BASE_URL}/${id}`, {
		method: "DELETE",
	});
};

//update expense
export const updateExpense = async (
	id: number,
	data: {
		name: string;
		amount: number;
		category: string;
	},
) => {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return res.json();
};
