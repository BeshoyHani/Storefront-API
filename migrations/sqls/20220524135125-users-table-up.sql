/* Replace with your SQL commands */
CREATE TABLE users(id SERIAL PRIMARY KEY,
                   username VARCHAR(100),
                   first_name VARCHAR(100) NOT NULL,
                   last_name VARCHAR(100) NOT NULL,
                   password VARCHAR(255) NOT NULL);