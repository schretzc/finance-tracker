import { useState, useEffect } from "react";
import {
	getExpenses,
	createExpense,
	deleteExpense as deleteExpenseService,
	updateExpense as updateExpenseService,
	getCategorySummary,
} from "../services/expenseService";
import type { Expense } from "../types/expense";

export function useExpenses(startDate?: string, endDate?: string) {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [categorySummary, setCategorySummary] = useState<
		{ category: string; total: number }[]
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);

			try {
				const [expenseData, summaryData] = await Promise.all([
					getExpenses(startDate, endDate),
					getCategorySummary(startDate, endDate),
				]);

				setExpenses(Array.isArray(expenseData) ? expenseData : []);
				setCategorySummary(Array.isArray(summaryData) ? summaryData : []);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, [startDate, endDate]);

	const addExpense = async (data: {
		name: string;
		amount: number;
		category: string;
		date: string;
	}) => {
		await createExpense(data);
	};

	const deleteExpense = async (id: number) => {
		await deleteExpenseService(id);
	};

	const updateExpense = async (
		id: number,
		data: { name: string; amount: number; category: string },
	) => {
		await updateExpenseService(id, data);
	};

	return {
		expenses,
		categorySummary,
		loading,
		addExpense,
		deleteExpense,
		updateExpense,
	};
}
