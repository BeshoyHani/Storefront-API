## Database Schema
### consists of four tables: **users**, **products**, **orders** and **order_products** table

# Users
used in routes `/users`
| Column | Type | Nullable | Constraints |
| ------------- | ------------- | -------------| ------------- |
| id  | `SERIAL/INTEGER`  | NO | Primary Key |
| username  | `VARCHAR(100)`  | NO | Unique |
| first_name  | `VARCHAR(100)`  | NO | N/A |
| last_name  | `VARCHAR(100)`  | NO | N/A |
| password  | `VARCHAR(250)`  | NO | N/A |
<br>
# Products

used in routes `/products`
| Column | Type | Nullable | Constraints |
| ------------- | ------------- | -------------| ------------- |
| id  | `SERIAL/INTEGER`  | NO | Primary Key |
| name  | `VARCHAR(100)`  | NO | N/A |
| price  | `INTEGER`  | NO | N/A |
| category  | `VARCHAR(100)`  | YES | N/A |
<br>
# Orders

used in routes `/orders`
| Column | Type | Nullable | Constraints |
| ------------- | ------------- | -------------| ------------- |
| id  | `SERIAL/INTEGER`  | NO | Primary Key |
| status  | `VARCHAR(30)`  | NO | N/A |
| user_id  | `INTEGER`  | NO | Foreign Key |
<br>
# Order_Products

used in routes `/orders`
| Column | Type | Nullable | Constraints |
| ------------- | ------------- | -------------| ------------- |
| id  | `SERIAL/INTEGER`  | NO | Primary Key |
| user_id  | `INTEGER`  | NO | Foreign Key |
| product_id  | `INTEGER`  | NO | Foreign Key |
| quantity  | `INTEGER`  | NO | N/A |