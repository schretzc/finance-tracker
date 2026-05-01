const BASE_URL = "http://localhost:3000/expenses";

//get all expenses
export const getExpenses = async (startDate?: string, endDate?: string) => {
	const params = new URLSearchParams();

	if (startDate) params.append("startDate", startDate);
	if (endDate) params.append("endDate", endDate);

	const url = `${BASE_URL}?${params.toString()}`;

	const res = await fetch(url);
	return res.json();
};

//create new expense
export const createExpense = async (data: {
	name: string;
	amount: number;
	category: string;
	date?: string;
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

export const getCategorySummary = async (
	startDate?: string,
	endDate?: string,
) => {
	const params = new URLSearchParams();

	if (startDate) params.append("startDate", startDate);
	if (endDate) params.append("endDate", endDate);

	const res = await fetch(
		`http://localhost:3000/expenses/summary/category?${params.toString()}`,
	);
	return res.json();
};
