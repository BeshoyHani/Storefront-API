import { Request, Response, Router } from 'express';
import IProduct from '../interfaces/product';
import { verifyAuth } from '../middlewares/authentication';
import { Product } from '../models/product';

const productStore = new Product();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await productStore.index();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

const show = async (_req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(_req.params.id as string);
        const product = await productStore.show(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
}

const create = async (_req: Request, res: Response) => {
    let product: IProduct;
    try {
        product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category
        };
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    try {
        const newProduct = await productStore.create(product);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}


const productRouter = Router();
productRouter.get('/products', index);
productRouter.get('/products/:id', show);
productRouter.post('/products', verifyAuth, create);
export default productRouter;