import express from "express";
import cors from "cors";

const app = express();
// Use environment PORT for deployment (Railway injects this)
// fallback to 3000 locally
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Finance Tracker API is running");
});

// Catch-all error handler - add this before app.listen
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

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
