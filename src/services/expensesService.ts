import { prisma } from "../prisma";

type CreateExpenseInput = {
	name: string;
	amount: number;
	category: string;
	date?: string | undefined;
};

type UpdateExpenseInput = {
	name?: string;
	amount?: number;
	category?: string;
	date?: string | Date;
};

//post expense
export const createExpenseService = async (data: CreateExpenseInput) => {
	return await prisma.expense.create({
		data: {
			name: data.name,
			amount: data.amount,
			category: data.category,
			date: data.date ? new Date(data.date) : new Date(),
		},
	});
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
	data: UpdateExpenseInput,
) => {
	return await prisma.expense.update({
		where: { id },
		data: {
			...data,
			...(data.date ? { date: new Date(data.date) } : {}),
		},
	});
};
