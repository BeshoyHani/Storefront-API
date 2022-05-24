import express, { Request, Response, Router } from 'express';
import IUser from '../interfaces/user';
import { verifyAuth } from '../middlewares/authentication';
import { User } from '../models/user';

const userStore = new User();

const index = async (_req: Request, res: Response) => {
    try {
        const users = userStore.index();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const id = (_req.query.id as unknown) as number;
        const user = userStore.show(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

const create = async (_req: Request, res: Response) => {
    let user: IUser;
    try {
        user = {
            first_name: _req.body.first_name,
            last_name: _req.body.last_name,
            password: _req.body.password
        };
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    try {
        const newUser = await userStore.create(user);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const userRoutes = Router();
userRoutes.get('/users', verifyAuth, index);
userRoutes.get('/users/:id', verifyAuth, show);
userRoutes.post('/users/create', create);
export default userRoutes;