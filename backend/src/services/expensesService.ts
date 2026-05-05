import { prisma } from "../prisma";
import { z } from "zod";
import {
	expenseSchema,
	updateExpenseSchema,
} from "../validation/expenseSchema";

// Types derived from Zod schemas - single source of truth
type CreateExpenseInput = z.infer<typeof expenseSchema> & { userId: number };
type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

//post expense
export const createExpenseService = async (data: CreateExpenseInput) => {
	return await prisma.expense.create({
		data: {
			name: data.name,
			amount: data.amount,
			category: data.category,
			date: data.date ? new Date(data.date) : new Date(),
			userId: data.userId,
		},
	});
};

//get all expenses from memory
export const getAllExpensesService = async (userId: number) => {
	return await prisma.expense.findMany({ where: { userId } });
};

//get by id
export const getExpenseService = async (id: number, userId: number) => {
	return await prisma.expense.findFirst({
		where: {
			userId,
			id,
		},
	});
};

// DELETE
export const deleteExpenseService = async (id: number, userId: number) => {
	const result = await prisma.expense.deleteMany({
		where: { id, userId },
	});

	return result.count;
};

// UPDATE
export const updateExpenseService = async (
	id: number,
	userId: number,
	data: UpdateExpenseInput,
) => {
	// Remove undefined fields so Prisma doesn't get confused by exactOptionalPropertyTypes
	const cleanData = Object.fromEntries(
		Object.entries(data).filter(
			([key, v]) => v !== undefined && key !== "date",
		),
	);

	const result = await prisma.expense.updateMany({
		where: { id, userId },
		data: {
			...cleanData,
			...(data.date ? { date: new Date(data.date) } : {}),
		},
	});

	return result.count;
};

//Get Expense by Category
export const getExpensesByCategoryService = async (userId: number) => {
	const result = await prisma.expense.groupBy({
		by: ["category"],
		where: { userId },
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
	userId: number,
	startDate?: string,
	endDate?: string,
) => {
	return await prisma.expense.findMany({
		where: {
			userId,
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
