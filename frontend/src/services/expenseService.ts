import { getToken } from "./authService";
const BASE_URL = "http://localhost:3000/expenses";

//get all expenses
export const getExpenses = async (startDate?: string, endDate?: string) => {
	const params = new URLSearchParams();

	if (startDate) params.append("startDate", startDate);
	if (endDate) params.append("endDate", endDate);

	const url = `${BASE_URL}?${params.toString()}`;

	const token = getToken();

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
};

//create new expense
export const createExpense = async (data: {
	name: string;
	amount: number;
	category: string;
	date?: string;
}) => {
	const token = getToken();

	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});

	return res.json();
};

//delete expense
export const deleteExpense = async (id: number) => {
	const token = getToken();

	await fetch(`${BASE_URL}/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
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
	const token = getToken();

	const res = await fetch(`${BASE_URL}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
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

	const token = getToken();

	const res = await fetch(
		`http://localhost:3000/expenses/summary/category?${params.toString()}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return res.json();
};
