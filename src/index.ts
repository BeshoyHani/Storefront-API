import express, { Request, Response } from "express";

const app = express();

app.get('/', (_req: Request, res: Response) => {
    res.send("Home");
});

app.listen(3000, () => {
    console.log('Server Started on port 3000');
});