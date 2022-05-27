import database from "../database/database";
import { orderStatus } from "../interfaces/order";
import IOrder from "../interfaces/order";

export class Order {
    async openOrder(user_id: number): Promise<number> {
        try {
            const conn = await database.connect();
            const sql = 'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [user_id, orderStatus.active]);
            conn.release();
            return result.rows[0].id;
        } catch (error) {
            throw Error(`Couldn't open an order for user ${user_id}. Error ${error}`);
        }
    }
    async changeOrderStatus(id: number, status: orderStatus): Promise<void> {
        try {
            const conn = await database.connect();
            const sql = 'UPDATE orders SET status=($1) WHERE id=($2)';
            const result = await conn.query(sql, [status, id]);
            conn.release();
            return;
        } catch (error) {
            throw Error(`Couldn't change status for order ${id}. Error ${error}`);
        }
    }

    async addProduct(order_id: number, product_id: number, quantity: number): Promise<IOrder> {
        try {
            const conn = await database.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw Error(`Couldn't add product of id ${product_id} to order ${order_id}. Error ${error}`);
        }
    }

    async getOrders(user_id: number): Promise<IOrder[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw Error(`Couldn't get orders of user ${user_id}. Error ${error}`);
        }
    }

    async getCompletedOrders(user_id: number): Promise<IOrder[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) and status=($2)';
            const result = await conn.query(sql, [user_id, "COMPLETED"]);
            conn.release();
            return result.rows;
        } catch (error) {
            console.log(error)
            throw Error(`Couldn't get completed orders of user ${user_id}. Error ${error}`);
        }
    }
}