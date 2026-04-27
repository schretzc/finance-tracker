export const categories = [
	"Eating Out",
	"Groceries",
	"Expenses",
	"Other",
] as const;

export type Category = (typeof categories)[number];
