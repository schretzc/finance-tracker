import { Request, Response } from "express";
import { expenses } from "../data/expenses";

// Get all expenses
// // url /expenses : sends data back to client in json format
export const getAllExpenses = (req: Request, res: Response) => {
	res.json([]);
};

export const getExpense = (req: Request, res: Response) => {
	//id from url
	const id = Number(req.params.id);

	// find expense in array
	const expense = expenses.find((exp) => exp.id === id);

	// if not found return error
	if (!expense) {
		return res.status(404).json({ message: "Not found" });
	}

	// return expense
	res.json(expense);
};
