import { Request } from "express";

export type JwtPayload = {
	userId: number;
	email: string;
};

export interface AuthRequest extends Request {
	user?: JwtPayload;
}
