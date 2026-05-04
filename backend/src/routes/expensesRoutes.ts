import express from "express";

import {
	getAllExpenses,
	getExpense,
	postExpense,
	deleteExpense,
	updateExpense,
	getExpensesByCategory,
	getFilteredExpenses,
} from "../controllers/expensesController";

//create router instance
const router = express.Router();

//define routes

//getByCategory
router.get("/summary/category", getExpensesByCategory);

//GETfilteredexpenses
router.get("/", getFilteredExpenses);

//GET by id
router.get("/:id", getExpense);

//CREATE
router.post("/", postExpense);

//DELETE
router.delete("/:id", deleteExpense);

//UPDATE
router.patch("/:id", updateExpense);

//export router so index.ts can use it
export default router;
