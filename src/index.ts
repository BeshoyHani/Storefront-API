import express, { Request, Response } from "express";
import userRoutes from "./handlers/users";

const app = express();

app.use(express.json());
app.use(userRoutes);

app.listen(3000, () => {
    console.log('Server Started on port 3000');
});