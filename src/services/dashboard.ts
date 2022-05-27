import database from "../database/database";
import IProduct from "../interfaces/product";

export class DashboardQueries {
    async productsInOrder(order_id: number): Promise<IProduct[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * from products INNER JOIN order_products on products.id = order_prodects.product_id and order_id=($1)';
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw Error(`Couldn't get products of order ${order_id}. Error ${error}`);
        }
    }
}