import { verify, sign, JwtPayload } from "jsonwebtoken";
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
        const data = verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
        const user = data.user;
        _req.username = user.username;
        _req.userId = user.id;
        _req.user_fname = user.first_name;
        _req.user_lname = user.last_name;
        next();
    } catch (error) {
        res.status(401).end('Unauthorized Access');
    }
}