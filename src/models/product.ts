import AbstractModel from "./AbstractModel";
import IProduct from '../interfaces/product';

export class Product extends AbstractModel<IProduct>{
    async index(): Promise<IProduct[]> {
        try {
            const conn = await this.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async show(id: number): Promise<IProduct> {
        try {
            const conn = await this.connect();
            const sql = 'SELECT FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];

        } catch (error) {
            throw new Error(`Could not get product with id: ${id}. Error: ${error}`);
        }
    }

    async create(product: IProduct): Promise<IProduct> {
        try {
            const conn = await this.connect();
            const sql = "INSERT INTO ptoducts (name, price, category) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add product with id: ${product.name}. Error: ${error}`);
        }
    }

}