import { expenses } from "../data/expenses";

//get all expenses from memory
export const getAllExpensesService = () => {
	return expenses;
};

//get by id
export const getExpenseService = (id: number) => {
	return expenses.find((exp) => exp.id === id);
};
