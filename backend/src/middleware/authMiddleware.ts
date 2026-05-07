import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, JwtPayload } from "../types/auth";

if (!process.env.JWT_SECRET) {
	throw new Error("Missing JWT_SECRET");
}

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

		req.user = decoded;

		next();
	} catch {
		return res.status(403).json({ error: "Invalid token" });
	}
};
