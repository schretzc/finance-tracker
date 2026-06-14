import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import expensesRoutes from "./routes/expensesRoutes";
import authRoutes from "./routes/auth";

// CREATE APP
const app = express();

const PORT = Number(process.env.PORT) || 3000;
// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.send("Finance Tracker API is running");
});

//
app.use("/auth", authRoutes);
app.use("/expenses", expensesRoutes);

// error handler
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

// start server
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on port ${PORT}`);
});
