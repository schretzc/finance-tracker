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

import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// GET by category (protected)
router.get("/summary/category", authenticateToken, getExpensesByCategory);

// GET filtered expenses (protected)
router.get("/", authenticateToken, getFilteredExpenses);

// GET by id (protected)
router.get("/:id", authenticateToken, getExpense);

// CREATE (protected)
router.post("/", authenticateToken, postExpense);

// DELETE (protected)
router.delete("/:id", authenticateToken, deleteExpense);

// UPDATE (protected)
router.patch("/:id", authenticateToken, updateExpense);

export default router;
