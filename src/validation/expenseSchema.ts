import { z } from "zod";
import { categories } from "../../shared/categories";

export const expenseSchema = z.object({
	name: z.string().min(1, "Name is required"),

	amount: z.coerce.number().positive("Amount must be positive"),

	category: z.enum(categories),

	date: z.string().optional(),
});
