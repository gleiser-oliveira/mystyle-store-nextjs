const { Prisma } = require('prisma-binding');

const db = new Prisma({
    typeDefs:'schemas/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_ENDPOINT_SECRET,
    debug: true,
});

module.exports = db;

