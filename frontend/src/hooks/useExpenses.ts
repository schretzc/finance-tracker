import { useState, useEffect, useCallback } from "react";
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
	const [refreshing, setRefreshing] = useState(false);

	const refreshData = useCallback(
		async (isInitial = false) => {
			if (isInitial) setLoading(true);
			else setRefreshing(true); // silent background refresh
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
				if (isInitial) setLoading(false);
				else setRefreshing(false);
			}
		},
		[startDate, endDate],
	);

	useEffect(() => {
		const load = async () => {
			await refreshData(true);
		};
		load();
	}, [refreshData]);

	const addExpense = async (data: {
		name: string;
		amount: number;
		category: string;
		date: string;
	}) => {
		await createExpense(data);
		await refreshData();
	};

	const deleteExpense = async (id: number) => {
		await deleteExpenseService(id);
		await refreshData();
	};

	const updateExpense = async (
		id: number,
		data: { name: string; amount: number; category: string },
	) => {
		await updateExpenseService(id, data);
		await refreshData();
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
