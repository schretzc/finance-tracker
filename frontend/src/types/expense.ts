import type { Category } from "../constants/categories";

export type Expense = {
	id: number;
	name: string;
	amount: number;
	category: Category;
	date: string;
};
