/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    product_ids INTEGER[],
    status VARCHAR(30)
);