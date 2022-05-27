import database from '../database/database';
import IProduct from '../interfaces/product';

export default class DashboardQueries {
    async productsInOrder(order_id: number): Promise<IProduct[]> {
        try {
            const conn = await database.connect();
            const sql =
                'SELECT p.*, op.quantity from products p INNER JOIN order_products op ON p.id = op.product_id WHERE op.order_id=($1)';
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows;
        } catch (error) {
            console.log(error);
            throw Error(
                `Couldn't get products of order ${order_id}. Error ${error}`
            );
        }
    }
}
