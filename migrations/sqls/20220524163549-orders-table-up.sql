/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(30) NOT NULL,
    user_id BIGINT, 
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);