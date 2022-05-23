import { PoolClient } from 'pg';
import Client from '../database/database';

export default abstract class AbstractModel<T> {
    abstract index(): Promise<T[]>;
    abstract show(id: number): Promise<T>;
    abstract create(data: T): Promise<T>;
    protected connect(): Promise<PoolClient> {
        return Client.connect();
    }
}