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

## Technologies Used
- Node
- Express
- MySQL
- AWS Elastic Beanstalk

## Endpoints

### POST
- `/cat/register`
- `/cat/login`

Post requests need arguments in the request body. I've been declaring Content-type as application/json, and sending raw JSON using Postman.

Authentication tokens are sent as Bearer Token type.

Date format is YYYY-MM-DD. There isn't really any special date parsing here.

### GET
- `/cats`
  - I could have used a POST request since the direction said to put arguments in the request body again but decided to use a GET request instead and the arguments will go into the search queries. Example: `http://bcrew-dev.i8mqpx3edx.us-west-1.elasticbeanstalk.com/cats?name=Midnight`. I thought it to be a more elegant approach than to use POST again.
- `/cats/random`
  - No arguments needed

## Miscellaneous

Passwords are hashed using bcrypt so that plain text isn't stored into the database. Authentication tokens are managed by JSON web tokens (JWT) and endpoints are protected by an Express JWT middleware.

Setting up the deployment took a little longer than expected since Elastic Beanstalk isn't as user friendly as something as Heroku. But of course AWS is a lot more configurable and powerful. There

If I had more time, I would have used a logger library instead of console.log and a testing framework to test endpoints. I would have also wanted some more robust input handling of the dates. Right now if it's not inputted in the proper format, then it will just record 0000-00-00.
