import express from "express";

import {
	getAllExpenses,
	getExpense,
	postExpense,
	deleteExpense,
	updateExpense,
} from "../controllers/expensesController";

//create router instance
const router = express.Router();

//define routes
//GET all
router.get("/", getAllExpenses);

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
