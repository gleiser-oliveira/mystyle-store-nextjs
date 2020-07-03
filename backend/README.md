# Backend - environment variables

Set the following variables inside a ```.envbackend``` file:

```
FRONTEND_URL=<the frontend URL, should be your domain name or http://localhost if deploying locally>
PRISMA_ENDPOINT=<the prisma endpoint URL>
PRISMA_ENDPOINT_SECRET=<the prisma endpoint secret set in prisma's environment variables file>
MY_STYLE_APP_SECRET=<a random string that serves as the app secret for the JWT token>
MAIL_HOST=<your email service host>
MAIL_PORT=<your email service port>
MAIL_USER=<your email service user>
MAIL_PASSWORD=<your email service user password>
STRIPE_SECRET=<your stripe secret>
```