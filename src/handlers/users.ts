import express, { Request, Response, Router } from 'express';
import IUser from '../interfaces/user';
import { signUser, verifyAuth } from '../middlewares/authentication';
import { User } from '../models/user';

const userStore = new User();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await userStore.index();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const id = (_req.params.id as unknown) as number;
        const user = await userStore.show(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

const create = async (_req: Request, res: Response) => {
    let user: IUser;
    try {
        user = {
            username: _req.body.username,
            first_name: _req.body.first_name,
            last_name: _req.body.last_name,
            password: _req.body.password
        };
        if (!user.username || !user.first_name || !user.last_name || !user.password)
            throw Error('Invalid Parameters');
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

const signin = async (_req: Request, res: Response) => {
    try {
        const username = _req.body.username as string;
        const password = _req.body.password as string;
        const user = await userStore.signin(username, password);
        const token = signUser(user);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(404).json(error);
    }
}

const userRoutes = Router();
userRoutes.get('/users', verifyAuth, index);
userRoutes.get('/users/:id', verifyAuth, show);
userRoutes.post('/users/create', create);
userRoutes.post('/users/signin', signin);
export default userRoutes;