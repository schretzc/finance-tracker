import { Request, Response } from "express";
import {
	getAllExpensesService,
	getExpenseService,
	deleteExpenseService,
	createExpenseService,
} from "../services/expensesService";

// Get all expenses
export const getAllExpenses = (req: Request, res: Response) => {
	const allExpenses = getAllExpensesService(); // call service to get data
	res.json(allExpenses); // send RESponse to client
};

//get expense from id
export const getExpense = (req: Request, res: Response) => {
	//id from url
	const id = Number(req.params.id);

	const expense = getExpenseService(id);

	// if not found return error
	if (!expense) {
		return res.status(404).json({ message: "Not found" });
	}

	// return expense
	res.json(expense);
};

//delete single expense
export const deleteExpense = (req: Request, res: Response) => {
	//get id from url params as string
	const id = Number(req.params.id);
	//filter out expense that matches id
	// finds item index
	const wasDeleted = deleteExpenseService(id);

	if (!wasDeleted) {
		return res.status(404).json({ message: "Not found" });
	}

	//confirmation response
	res.json({ message: "Deleted successfully" });
};

// CREATE new expense (POST /expenses)
// takes data from client (req.body)
// adds id, stores in memory, and returns it
export const postExpense = (req: Request, res: Response) => {
	const newExpense = createExpenseService(req.body);
	//send back created object
	res.status(201).json(newExpense);
};
