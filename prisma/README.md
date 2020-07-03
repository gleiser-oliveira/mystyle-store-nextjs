# Prisma - Environment Variables

For this service, 3 configuration files must be added:

Add a .env file inside prisma/api_config with the following variables set:
```
PRISMA_MANAGEMENT_API_SECRET=<A random string that serves as the management API's secret>
PRISMA_ENDPOINT=<the endpoint where the prisma service to be deployed is located>
PRISMA_ENDPOINT_SECRET=<A random string that serves as the endpoint secret>
```
Add a prisma_config.yml file to prisma/server_config and define:
```
managementApiSecret: <the string defined as PRISMA_MANAGEMENT_API_SECRET>
port: <the connection port, is usually 4466>
databases:
  default:
    connector: postgres
    host: postgres
    port: <DB connection port, Postgres uses 5432 as default>
    database: <the name of the database>
    user: <the DB user, defined in the Postgres service's environment variable file>
    password: <the DB user's passwordr, defined in the Postgres service's environment variable file>
```

Finally, add a .envprisma file with the following variable:
```
PRISMA_CONFIG_PATH=<Path to prisma_config.yml file, if you didn't change it, it should be /usr/prisma_config/prisma_config.yml>
```