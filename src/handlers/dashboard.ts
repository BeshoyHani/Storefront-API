import { Request, Response, Router } from "express";
import { verifyAuth } from "../middlewares/authentication";
import validateUser from "../middlewares/validateUser";
import { DashboardQueries } from "../services/dashboard";


const dashboardQueries = new DashboardQueries();

const getProductsInOrder = async (_req: Request, res: Response) => {
    let order_id: number;
    try {
        order_id = parseInt(_req.params.id as string);
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    try {
        const products = await dashboardQueries.productsInOrder(order_id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

const dashboardRouter = Router();
dashboardRouter.get('/orders/:id/products', verifyAuth, getProductsInOrder);
export default dashboardRouter;