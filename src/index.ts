import express from "express";
import cors from "cors";

import expensesRoutes from "./routes/expensesRoutes";

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

app.use("/expenses", expensesRoutes);

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
