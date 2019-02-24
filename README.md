# bcrew
cats cats cats

## Installation

In the root directory
```
npm install
```

- Create a `.env` file using the `dotenv.dist` as a reference
- Create database and tables using the `setup.sql` file
```
npm start
```

## Stack
- Node
- Express
- MySQL

## Endpoints

POST
- `/cat/register`
- `/cat/login`

Post requests need arguments in the request body. I've been declaring Content-type as application/json. Authentication tokens are sent as Bearer Token type.

GET
- `/cats`
  - I could have used a POST request but decided to use a GET request and the arguments go into the search queries. I thought it to be a cleaner approach than to use POST again.
- `/cats/random`
  - No arguments needed

## Miscellaneous

Passwords are hashed using bcrypt so that plain text isn't stored into the database. Authentication tokens are managed by JSON web tokens (JWT) and endpoints are protected by an Express JWT middleware.

If I had more time, I would have used a logger library instead of console.log and a testing framework to test endpoints.
