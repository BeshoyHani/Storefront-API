# StoreFront API
> An API for a storefront. Allowing create users, sign them in, add new products, making orders and more.
#
1) [Tools](#tools)
2) [Database Setup](#database-setup)
3) [How To Setup the Server](#how-to-setup)
4) [Configure env file](#environment-file)
5) [Scripts to Run](#scripts-to-run)
5) [Database Schema && Endpoints Illustration](#restful-endpoints-and-database-shema)
## Tools
- Node.js
- Express
- Typescript
- JWT
- Jasmine & Supertest
- Postgres DB

## Database Setup
1) First you should have postgresDB. you can download it from this [link](https://www.postgresql.org/download/)
2) Create a new database. `CREATE DATABSE {database name};`
3) Create a user that can create and edit databases. `CREATE USER {username} with password '123';` <br>
`ALTER USER {username} CREATEDB;`

## How to Setup
1) Clone the repo
2) run  ` npm install` to install dependancies
3) Default port that postgres uses for this project is **5433**. you can change it in `.env` file and in `docker-compose` if you use it.
4) Update the **.env** file with the correct names of database and user you created.
5) Server will run on `http://localhost:3000`

## Environment File
You should create and environment file called `.env` in the root of the project.
This file should look like the following
```
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
ENV=dev
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=

```
| Property | Type | Description |
| ------------- | ------------- | ------------- |
| POSTGRES_HOST  | `IP Format`  | IP That Postgres is Running On | 
| POSTGRES_PORT  | `Integer`  | Port That Postgres is Running On |
| POSTGRES_DB  | `String`  | Name of the database |
| POSTGRES_TEST_DB  | `String`  | Name of The database used for testing |
| POSTGRES_USER  | `String`  | Name of The User you Created in Postgres |
| POSTGRES_PASSWORD  | `String`  | Password of The User |
| BCRYPT_PASSWORD  | `String`  | A String of Arbitrary Characters used in the Hashing Process of the Password |
| SALT_ROUNDS  | `INTEGER`  | Number is Used in The Hashing Process of The Password |
| TOKEN_SECRET  | `String`  |  A String of Arbitrary Characters used in the Hashing Process of the Token |

<br>

> Kindly notes that all strings should be written in the .env file without any single or double qoutation marks.

> You should also leave `ENV=dev` as it is. it is a parameter used when running tests to select whether to work with the development or the testing database.

## Scripts to Run
- `npm run build` or `yarn build` to build the type script project.
- `npm run start` or `yarn start` to start the server.
- `npm run migrate:up` or `yar migrate:up` to run database migration on your database.
- `npm run migrate:down` or `yar migrate:down` to remove database migration from your database.
- `npm run test` or `yarn test` to run migration on the testing database then run jasmine tests then remove testing database.
- `npm run fromat` or `yarn format` runs prettier and eslinter to improve & fix writing style and all fixable issues.

## RESTful Endpoints and Database Shema
> [REQUIREMENTS File](md/REQUIREMENTS.md)
