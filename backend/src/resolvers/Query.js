const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
    products: forwardTo('db'),
    product: forwardTo('db'),
    productsConnection: forwardTo('db'),
    me(parent, args, context, info) {
        // check if there is a user in the request
        if (!context.request.userId) {
            return null;
        }
        return context.db.query.user({
            where: { id: context.request.userId }
        }, info);
    },
    async users(parent, args, context, info) {
        // check permission to use this query
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        const reqUser = await context.db.query.user({
            where: { id: context.request.userId }
        }, '{id, permissions}');

        if (!hasPermission(reqUser, ['ADMIN']))
            throw new Error(`You do not have sufficient permissions

            : ${permissionsNeeded}
    
            You Have:
    
            ${user.permissions}
            `);

        return users = context.db.query.users({...args}, info);
    },
    usersConnection: forwardTo('db'),
    async permissions(parent, args, context, info) {
        // check permission to use this query
        if(!context.request.userId)
            throw new Error('You must be logged in to do this action.');

        const reqUser = await context.db.query.user({
            where: { id: context.request.userId }
        }, '{id, permissions}');

        if (!hasPermission(reqUser, ['ADMIN']))
            throw new Error(`You do not have sufficient permissions
    
                : ['ADMIN']
        
                You Have:
        
                ${reqUser.permissions}
                `);
        return context.db.query.permissionDescriptions({}, info);
    },
    async order(parent, args, context, info) {
        // check permission to use this query
        if(!context.request.userId)
            throw new Error('You must be logged in to do this action.');

        const reqUser = await context.db.query.user({
            where: { id: context.request.userId }
        }, '{id, permissions}'); 

        const order = await context.db.query.order({
            where: { id: args.id }
        }, info);

        // check ownership
        const ownsOrder = order.user.id === reqUser.id;
        const isAdmin = hasPermission(reqUser, ['ADMIN']);

        if(ownsOrder || isAdmin)
            return order;
        else
            throw new Error('Invalid order request.');
    },
    ordersConnection: forwardTo('db'),
    async orders(parent, args, context, info) {
        // check permission to use this query
        if(!context.request.userId)
            throw new Error('You must be logged in to do this action.');

        const reqUser = await context.db.query.user({
            where: { id: context.request.userId }
        }, '{id, permissions}'); 

        const orders = await context.db.query.orders({
            where: { user: {id: reqUser.id} }
        }, info);

        if(orders)
            return orders;
        else
            throw new Error('Invalid order request.');
    },
};

module.exports = Query;
