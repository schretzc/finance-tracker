import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
	throw new Error("Missing JWT_SECRET");
}
const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request {
	user?: { userId: number };
}

export const authenticateToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as {
			userId: number;
		};

		req.user = { userId: decoded.userId };

		next();
	} catch (err) {
		return res.status(403).json({ error: "Invalid token" });
	}
};
