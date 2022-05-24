import IUser from "../interfaces/user";
import AbstractModel from "./AbstractModel";
import dotenv from 'dotenv/config';
import bcrypt from 'bcrypt';

dotenv;

export class User extends AbstractModel<IUser>{
    async index(): Promise<IUser[]> {
        try {
            const conn = await this.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw Error(`Could not get users. Error: ${error}`);
        }
    }
    async show(id: number): Promise<IUser> {
        try {
            const conn = await this.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw Error(`Could not get user with id: ${id}. Error: ${error}`);
        }
    }
    async create(user: IUser): Promise<IUser> {
        try {
            const conn = await this.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            
            const rounds = +(process.env.SALT_ROUNDS as unknown as number);
            const salt =  bcrypt.genSaltSync(rounds);
            const password = bcrypt.hashSync(user.password, salt);
            
            const result = await conn.query(sql, [user.first_name, user.last_name, password]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw Error(`Could not add user ${user.first_name} ${user.last_name}. Error: ${error}`);
        }
    }

}