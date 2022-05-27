/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users (id),
    status VARCHAR(30)
);