# StoreFront API
> An API for a storefront. Allowing create users, sign them in, add new products, making orders and more.

## Tools
- Node.js
- Express
- Typescript
- JWT
- Jasmine & Supertest
- Postgres DB

## How to Setup
1) Clone the repo
2) run  ` npm install` to install dependancies
3) Default port that postgres uses for this project is **5433**. you can change it in `.env` file and in `docker-compose` if you use it.
4) Update the user and password in the **.env** file and **database.json** file with an authorized user that can create and edit in your database.
5) Server will run on `http://localhost:3000`

## Scripts to Run
- `npm run build` or `yarn build` to build the type script project.
- `npm run start` or `yarn start` to start the server.
- `npm run migrate:up` or `yar migrate:up` to run database migration on your database.
- `npm run migrate:down` or `yar migrate:down` to remove database migration from your database.
- `npm run test` or `yarn test` to run migration on the testing database then run jasmine tests then remove testing database.
- `npm run fromat` or `yarn format` runs prettier and eslinter to improve & fix writing style and all fixable issues.

## RESTful Endpoints and Database Shema
> [REQUIREMENTS File](md/REQUIREMENTS.md)
