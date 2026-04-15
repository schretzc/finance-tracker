import { prisma } from "../prisma";
import { Expense } from "../types/expense";

//post expense
export const createExpenseService = async (
	data: Omit<Expense, "id" | "date">,
) => {
	return await prisma.expense.create({ data });
};

//get all expenses from memory
export const getAllExpensesService = async () => {
	return await prisma.expense.findMany();
};

//get by id
export const getExpenseService = async (id: number) => {
	return await prisma.expense.findUnique({
		where: {
			id,
		},
	});
};

// DELETE
export const deleteExpenseService = async (id: number) => {
	await prisma.expense.delete({
		where: { id },
	});

	return true;
};

// UPDATE
export const updateExpenseService = async (
	id: number,
	data: Partial<Expense>,
) => {
	return await prisma.expense.update({
		where: { id },
		data,
	});
};
