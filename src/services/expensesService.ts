import { expenses } from "../data/expenses";

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
export const createExpenseService = (data: any) => {
	const newExpense = {
		id: Date.now(),
		...data,
	};

	//store expense in new memory array
	expenses.push(newExpense);
	// send back created object
	return newExpense;
};

// update expense
export const updateExpenseSerivce = (id: number, data: any) => {
	const expense = expenses.find((exp) => exp.id === id);

	if (!expense) {
		return null;
	}

	// update fields
	Object.assign(expense, data);

	return expense;
};
