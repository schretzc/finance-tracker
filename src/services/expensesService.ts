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
