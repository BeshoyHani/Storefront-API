import { NextFunction, Request, Response } from "express";

export default function validateUser(_req: Request, res: Response, next: NextFunction): void {
    try {
        const id = String(_req.params.id);
        const user_id = String(_req.userId);
        console.log(typeof id, typeof user_id)
        if (id !== user_id)
            throw Error('Unauthorized Access');
        next();
    } catch (error) {
        res.status(400).json('Unauthorized Access, User ID doesn\'t Match with the Provided one');
    }
}