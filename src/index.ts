import express from "express";
import cors from "cors";

import { expenses } from "./data/expenses";

//express app instnace
const app = express();

// Use environment PORT for deployment (Railway injects this)
// fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// middleware

//cross origin resourse sharing
app.use(cors());
//parse income json requests(req.body)
app.use(express.json());

// basic test route to confirm server is running
app.get("/", (req, res) => {
	res.send("Finance Tracker API is running");
});

// get all expenses
// url /expenses : sends data back to client in json format
app.get("/expenses", (req, res) => {
	res.json(expenses);
});

// CREATE new expense (POST /expenses)
// takes data from client (req.body)
// adds id, stores in memory, and returns it
app.post("/expenses", (req, res) => {
	const newExpense = {
		id: Date.now(), // unique id for epense
		...req.body, // spread all incoming fields (name, amount, etc)
	};
	//store new expense in memory array
	expenses.push(newExpense);
	//send back created object
	res.json(newExpense);
});

// DELETE single expense by id
app.delete("/expenses/:id", (req, res) => {
	//get id from url params as string
	const id = Number(req.params.id);
	//filter out expense that matches id
	// finds item index
	const index = expenses.findIndex((exp) => exp.id === id);
	// remove if found
	if (index !== -1) {
		expenses.splice(index, 1);
	}
	//confirmation response
	res.json({ message: "Deleted successfully" });
});

//error handler
// catch-all error handler - add this before app.listen
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		console.error(err.stack);
		res.status(500).json({ error: err.message });
	},
);

//start server and listen on specified port
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
