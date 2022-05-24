import database from "../database/database";
import IOrder from "../interfaces/order";
import IProduct from "../interfaces/product";

export class Order {
    // async makeOrder(user_id: number, products: number[]): Promise<IOrder>{
    //     try{

    //     } catch(error){}
    // }
    async getOrders(id: number): Promise<IOrder[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw Error(`Couldn't get orders of user ${id}. Error ${error}`);
        }
    }

    async getCompletedOrders(id: number): Promise<IOrder[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) and status="COMPLETED"';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw Error(`Couldn't get completed orders of user ${id}. Error ${error}`);
        }
    }
}