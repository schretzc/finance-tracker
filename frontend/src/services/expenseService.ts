import { getToken } from "./authService";
const BASE_URL = `${import.meta.env.VITE_API_URL}/expenses`;

const authFetch = async (url: string, options?: RequestInit) => {
	const token = getToken();

	const res = await fetch(url, {
		...options,
		headers: {
			...options?.headers,
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		if (res.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
			throw new Error("Unauthorized");
		}

		throw new Error(`HTTP error ${res.status}`);
	}

	return res.json();
};

//get all expenses
export const getExpenses = (startDate?: string, endDate?: string) => {
	const params = new URLSearchParams();

	if (startDate) params.append("startDate", startDate);
	if (endDate) params.append("endDate", endDate);

	return authFetch(`${BASE_URL}?${params.toString()}`);
};

//create new expense
export const createExpense = (data: {
	name: string;
	amount: number;
	category: string;
	date?: string;
}) => {
	return authFetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

//delete expense
export const deleteExpense = (id: number) => {
	return authFetch(`${BASE_URL}/${id}`, {
		method: "DELETE",
	});
};

//update expense
export const updateExpense = (
	id: number,
	data: { name: string; amount: number; category: string },
) => {
	return authFetch(`${BASE_URL}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const getCategorySummary = (startDate?: string, endDate?: string) => {
	const params = new URLSearchParams();

	if (startDate) params.append("startDate", startDate);
	if (endDate) params.append("endDate", endDate);

	return authFetch(`${BASE_URL}/summary/category?${params.toString()}`);
};
