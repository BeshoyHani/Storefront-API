import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    PSTGRES_PORT,
    ENV,
} = process.env;

const Client = (): Pool => {
    if (ENV == 'test') {
        return new Pool({
            host: POSTGRES_HOST,
            port: parseInt(PSTGRES_PORT as string),
            database: POSTGRES_TEST_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        });
    } else {
        console.log(typeof 'test');
        return new Pool({
            host: POSTGRES_HOST,
            port: parseInt(PSTGRES_PORT as string),
            database: POSTGRES_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        });
    }
};

export default Client();
