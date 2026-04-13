import { z } from "zod";

export const expenseSchema = z.object({
	name: z.string().min(1, "Name is required"),
	amount: z.number().positive("Amount must be positive"),
	category: z.string().min(1, "Category is required"),
});
