## RESTful Endpoint
> All endpoints you may work with through this project.

>You Should first Create a user then sign in with that user in order to get token you can use when it is needed.

<br>

## Users

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Create User  | `POST`  | `/users/create` | <u>**in json format**</u> <br> username <br> first_name <br> last_name <br> password   | Not Required |
| Sign in  | `POST`  | `/users/signin` | username <br> password | Not Required |
| Get All Users  | `GET`  | `/users` | N/A | Required |
| Get Specific User | `GET`  | `/users/{user id}` | N/A | Required |

## Products

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Add new Product  | `POST`  | `/products` | name <br> price <br> last_name <br> category `optinal`  | Required |
| Get All Products  | `GET`  | `/products` | N/A | Not Required |
| Get Specific Product | `GET`  | `/products/{product id}` | N/A | Not Required |

<br>

## Orders

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Create new Order  | `POST`  | `/orders/new` | N/A  | Required |
| Add a Product to Specific Order  | `POST`  | `/orders/add_product` | order_id <br> product_id <br> quantity | Required |
| Change Order Status | `POST`  | `/orders/status` | status <br><small> is a value that equals either `completed` <br>or `pending` <br>or `active` <br>or `in progress`</small> | Required |
| Get Orders | `GET`  | `/orders` | N/A | Required |
| Get Completed Orders| `GET`  | `/orders/completed` | N/A | Required |
| Get All Products Contained in a Specific Order| `GET`  | `/orders/{order id}/products` | N/A | Required |