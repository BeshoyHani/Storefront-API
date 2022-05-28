/* Replace with your SQL commands */
CREATE TABLE users(id SERIAL PRIMARY KEY,
                   username VARCHAR(100) UNIQUE NOT NULL,
                   first_name VARCHAR(100) NOT NULL,
                   last_name VARCHAR(100) NOT NULL,
                   password VARCHAR(255) NOT NULL);