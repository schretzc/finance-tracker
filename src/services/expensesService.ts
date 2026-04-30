import { prisma } from "../prisma";
import { z } from "zod";
import {
	expenseSchema,
	updateExpenseSchema,
} from "../validation/expenseSchema";

// Types derived from Zod schemas - single source of truth
type CreateExpenseInput = z.infer<typeof expenseSchema>;
type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

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
	// Remove undefined fields so Prisma doesn't get confused by exactOptionalPropertyTypes
	const cleanData = Object.fromEntries(
		Object.entries(data).filter(
			([key, v]) => v !== undefined && key !== "date",
		),
	);

	return await prisma.expense.update({
		where: { id },
		data: {
			...cleanData,
			...(data.date ? { date: new Date(data.date) } : {}),
		},
	});
};

//Get Expense by Category
export const getExpensesByCategoryService = async () => {
	const result = await prisma.expense.groupBy({
		by: ["category"],
		_sum: {
			amount: true,
		},
	});
	return result.map((item) => ({
		category: item.category,
		total: item._sum.amount ?? 0,
	}));
};

//get expense with filter
export const getFilteredExpensesService = async (
	startDate?: string,
	endDate?: string,
) => {
	return await prisma.expense.findMany({
		where: {
			...(startDate || endDate
				? {
						date: {
							...(startDate ? { gte: new Date(startDate) } : {}),
							...(endDate ? { lte: new Date(endDate) } : {}),
						},
					}
				: {}),
		},
	});
};
