import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const normalizedEmail = email.toLowerCase();

		const existingUser = await prisma.user.findUnique({
			where: { email: normalizedEmail },
		});

		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email: normalizedEmail,
				password: hashedPassword,
			},
		});

		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_SECRET!,
			{
				expiresIn: "1h",
			},
		);

		res.json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Something went wrong" });
	}
});

// login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const normalizedEmail = email.toLowerCase();

		const user = await prisma.user.findUnique({
			where: { email: normalizedEmail },
		});

		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_SECRET!,
			{
				expiresIn: "1h",
			},
		);

		res.json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Something went wrong" });
	}
});

export default router;
