import { expenses } from "../data/expenses";
import { Expense } from "../types/expense";

//get all expenses from memory
export const getAllExpensesService = () => {
	return expenses;
};

//get by id
export const getExpenseService = (id: number) => {
	return expenses.find((exp) => exp.id === id);
};

//delete expense
export const deleteExpenseService = (id: number) => {
	const index = expenses.findIndex((exp) => exp.id === id);

	if (index === -1) {
		return false;
	}

	expenses.splice(index, 1);
	return true;
};

//post expense
export const createExpenseService = (
	data: Omit<Expense, "id" | "date">,
): Expense => {
	const newExpense: Expense = {
		id: Date.now(),
		date: new Date().toISOString(),
		...data,
	};

	//store expense in new memory array
	expenses.push(newExpense);
	// send back created object
	return newExpense;
};

// update expense in memory
export const updateExpenseSerivce = (id: number, data: Partial<Expense>) => {
	const expense = expenses.find((exp) => exp.id === id); //find in array that matches id

	// if no expense found => return null
	if (!expense) {
		return null;
	}

	// update only fields sent in request
	Object.assign(expense, data);

	return expense;
};
