import { Request, Response, Router } from 'express';
import { getOrderStatus, orderStatus } from '../interfaces/order';
import { verifyAuth } from '../middlewares/authentication';
import { Order } from '../models/order';

const orderStore = new Order();

const getOrders = async (_req: Request, res: Response): Promise<void> => {
    let user_id;
    try {
        user_id = parseInt(_req.userId as string);
    } catch (error) {
        res.status(400).json(error);
        return;
    }
    try {
        const orders = await orderStore.getOrders(user_id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getCompletedOrders = async (
    _req: Request,
    res: Response
): Promise<void> => {
    let user_id;
    try {
        user_id = parseInt(_req.userId as string);
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    try {
        const completed_orders = await orderStore.getCompletedOrders(user_id);
        res.status(200).json(completed_orders);
    } catch (error) {
        res.status(500).json(error);
    }
};

const openOrder = async (_req: Request, res: Response): Promise<void> => {
    let user_id;
    try {
        user_id = parseInt(_req.userId as string);
    } catch (error) {
        res.status(400).json(error);
        return;
    }
    try {
        const order_id = await orderStore.openOrder(user_id);
        res.status(200).json({ order_id });
    } catch (error) {
        res.status(500).json(error);
    }
};

const changeOrderStatus = async (
    _req: Request,
    res: Response
): Promise<void> => {
    let order_id: number, status: orderStatus;
    try {
        order_id = parseInt(_req.body.orderId as string);
        const status_name = _req.body.status as string;
        status = getOrderStatus(status_name);
    } catch (error) {
        res.status(400).json(error);
        return;
    }
    try {
        await orderStore.changeOrderStatus(order_id, status);
        res.status(200).json('Status Changed Successfully.');
    } catch (error) {
        res.status(500).json(error);
    }
};

const addProduct = async (_req: Request, res: Response): Promise<void> => {
    let order_id: number, product_id: number, quantity: number;
    try {
        order_id = parseInt(_req.body.orderId as string);
        product_id = parseInt(_req.body.productId as string);
        quantity = parseInt(_req.body.quantity as string);
    } catch (error) {
        res.status(400).json(error);
        return;
    }
    try {
        const product = await orderStore.addProduct(
            order_id,
            product_id,
            quantity
        );
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

const orderRouter = Router();
orderRouter.use(verifyAuth);
orderRouter.get('/orders', getOrders);
orderRouter.get('/orders/completed', getCompletedOrders);
orderRouter.post('/orders/new', openOrder);
orderRouter.post('/orders/status', changeOrderStatus);
orderRouter.post('/orders/add_product', addProduct);

export default orderRouter;
