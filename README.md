# MyStyle Store

[MyStyle] - Visit live version

MyStyle is an e-commerce platform made with React/NextJS, GraphQL, Apollo, Prisma ORM v1, PostgreSQL and Docker. It showcases how these technologies can be used together to produce a real, production ready web application.

## Features

  - Authentication with JWT.
  - Server side rendering and page routing with NextJS.
  - Custom UI components with styled-components.
  - A GraphQL API for backend/frontend communication.
  - Client-side caching with Apollo.
  - Integration with Stripe for payments.
  - Automated frontend testing with Jest and Enzyme.
  - Fully dockerized backend, database, frontend and ORM services.


## Using the Live Version
You can access the live demo by clicking [here](https://mystyle.gleiseroliveira.com/). Then, use one of the following credentials to log in:

### Sellers:

user: `seller01@seller.com`

pass: `SELLER01`


user: `seller02@seller.com`

pass: `SELLER02`

### Customers:

user: `customer01@customer.com`

pass: `CUSTOMER01`

user: `customer02@customer.com`

pass: `CUSTOMER02`

The difference between a seller and a customer user is the kind of permissions they have once they log in. A customer user can only add products to their cart, while a seller user can add new products to be sold and edit the information of the products they added before. The application also supports an admin user type, who can edit permissions for existing users or edit/delete anyone's products.

## Testing

You can run the automated tests with the following command:

```docker-compose run -e NODE_ENV=test frontend npm run test```

There is also a command to run the code linter:

```docker-compose run -e LINT_PATH=./components frontend npm run lint```

## Deploying

### Requirements
You will need:
- A running instance of [Docker] to build the images and start the containers 
- The [Prisma CLI] if you want to deploy the schema to a new PostgreSQL database.

### How to deploy
Docker makes it easy to deploy a development/production version of the app. There are only three steps necessary:

- Define the environment variables for the docker services that compose the application. Refer to the readme inside each service to know which variables must be set.
- Deploy the prisma scheme to your database using Prisma's CLI. Inside the prisma/api_config folder, run:
```prisma deploy```
- Start the application using docker-compose
```docker-compose -f docker-compose.yml up```

[MyStyle]: <https://mystyle.gleiseroliveira.com/>
[Docker]: <https://www.docker.com/>
[Prisma CLI]: <https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/installation>
