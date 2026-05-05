import { Request, Response } from "express";
import {
	getAllExpensesService,
	getExpenseService,
	deleteExpenseService,
	createExpenseService,
	updateExpenseService,
	getExpensesByCategoryService,
	getFilteredExpensesService,
} from "../services/expensesService";

import {
	expenseSchema,
	updateExpenseSchema,
} from "../validation/expenseSchema";

interface AuthRequest extends Request {
	user?: { userId: number };
}

// CREATE new expense (POST /expenses)
// takes data from client (req.body)
// adds id, stores in memory, and returns it
export const postExpense = async (req: AuthRequest, res: Response) => {
	const result = expenseSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({
			message: "invalid expense data",
			errors: result.error.issues,
		});
	}

	const { name, amount, category, date } = result.data;
	const userId = req.user!.userId;
	const newExpense = await createExpenseService({
		name,
		amount,
		category,
		date,
		userId,
	});

	return res.status(201).json(newExpense);
};

// Get all expenses
export const getAllExpenses = async (req: AuthRequest, res: Response) => {
	const userId = req.user!.userId;
	const allExpenses = await getAllExpensesService(userId);
	return res.json(allExpenses);
};

//get expense from id
export const getExpense = async (req: AuthRequest, res: Response) => {
	const id = Number(req.params.id);
	const userId = req.user!.userId;

	const expense = await getExpenseService(id, userId);

	if (!expense) {
		return res.status(404).json({ message: "Not found" });
	}

	return res.json(expense);
};

//delete single expense
export const deleteExpense = async (req: AuthRequest, res: Response) => {
	const id = Number(req.params.id);
	const userId = req.user!.userId;
	try {
		await deleteExpenseService(id, userId);
		return res.status(200).json({ message: "Deleted successfully" });
	} catch (err) {
		console.error(err);
		return res.status(404).json({ message: "Expense not found" });
	}
};

//UPDATE epxnse
export const updateExpense = async (req: AuthRequest, res: Response) => {
	const id = Number(req.params.id);
	const userId = req.user!.userId;

	const result = updateExpenseSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({
			message: "invalid update data",
			errors: result.error.issues,
		});
	}

	try {
		const updatedExpense = await updateExpenseService(id, userId, result.data);
		return res.json(updatedExpense);
	} catch {
		return res.status(404).json({ message: "Not found" });
	}
};

//get expenses by category
export const getExpensesByCategory = async (
	req: AuthRequest,
	res: Response,
) => {
	try {
		const userId = req.user!.userId;
		const summary = await getExpensesByCategoryService(userId);
		return res.json(summary);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Failed to fetch summary" });
	}
};

//get filtered expenses
export const getFilteredExpenses = async (req: AuthRequest, res: Response) => {
	const { startDate, endDate } = req.query;

	try {
		const userId = req.user!.userId;
		const expenses = await getFilteredExpensesService(
			userId,
			startDate as string | undefined,
			endDate as string | undefined,
		);

		return res.json(expenses);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Failed to fetch expenses" });
	}
};
