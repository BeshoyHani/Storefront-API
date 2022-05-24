import { verify, sign } from "jsonwebtoken";
import { json, NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user";
import dotenv from 'dotenv/config';

dotenv;


export function signUser(user: IUser): string {
    const token = sign({ user: user }, process.env.TOKEN_SECRET as string);
    return token;
}

export function verifyAuth(_req: Request, res: Response, next: NextFunction): void {
    try {
        const authorization = _req.headers.authorization;
        const token = (authorization as string).split(' ')[1];
        const user = verify(token, process.env.TOKEN_SECRET as string);
        _req.user = user as string;
        next();
    } catch (error) {
        res.status(401).end('Unauthorized Access');
    }
}