const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, formatEmail } = require('../mailer');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');

const mutations = {
    async createProduct(parent, args, context, info) {
        //check login
        if (!context.request.userId)
            throw new Error('You must be logged in to do this action.');

        //create searchableText
        const searchableText = args.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") + ' ' + args.description.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");

        const product = await context.db.mutation.createProduct({
            data: {
                user: {
                    connect: {
                        id: context.request.userId,
                    }
                },
                ...args,
                searchableText: searchableText,
            }
        }, info);

        return product;
    },
    updateUser(parent, args, context, info) {
        //take copy
        const updates = { ...args };
        // do not update the id
        delete updates.id;
        // run update in the db
        return context.db.mutation.updateUser({
            data: { ...updates, permissions: { set: updates.permissions } },
            where: {
                id: args.id,
            },
        },
            info
        );
    },
    async updateUserPermissions(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        const reqUser = await context.db.query.user({ where: { id: context.request.userId } }, '{permissions}');

        if (!hasPermission(reqUser, ['ADMIN']))
            throw new Error(`You do not have sufficient permissions

                : ['ADMIN']

                You Have:

                ${reqUser.permissions}
            `);

        // run update in the db
        return context.db.mutation.updateUser({
            data: { permissions: { set: args.permissions } },
            where: {
                id: args.id,
            },
        },
            info
        );
    },
    async updateProduct(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');
        
        const reqUser = await context.db.query.user({ where: { id: context.request.userId } }, '{permissions}');

        //find product
        const where = { id: args.id };
        const product = await context.db.query.product({ where }, `{ id, title, description, user { id }}`);

        //check ownership and permission
        const userOwnsProduct = product.user.id === context.request.userId;
        const hasPermissionToUpdate = hasPermission(reqUser, ['ADMIN', 'PRODUCT_UPDATE']);
        if(!userOwnsProduct || !hasPermissionToUpdate)
        throw new Error('You are not authorized to update this product.');
        
        //update searchableText
        
        let searchableTitle = '';
        let searchableDescription = '';

        if(args.title)
            searchableTitle = args.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
        else
            searchableTitle = product.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");

        if(args.description)
            searchableDescription = args.description.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
        else
            searchableDescription = product.description.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
        
        const searchableText = searchableTitle + ' ' + searchableDescription;
        //take copy
        const updates = { ...args, searchableText: searchableText };
        // do not update the id
        delete updates.id;
        
        // run update in the db
        return context.db.mutation.updateProduct({
            data: updates,
            where: {
                id: args.id,
            },
        },
            info
        );
    },
    async deleteProduct(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        const reqUser = await context.db.query.user({ where: { id: context.request.userId } }, '{permissions}');

        const where = { id: args.id };

        //find product
        const product = await context.db.query.product({ where }, `{ id, title, user { id }}`);

        //check if person owns it and their permissions
        const userOwnsProduct = product.user.id === context.request.userId;
        const hasPermissionToDelete = hasPermission(reqUser, ['ADMIN', 'PRODUCT_DELETE']);

        //delete it or throw error
        if (userOwnsProduct || hasPermissionToDelete)
            return context.db.mutation.deleteProduct({ where }, info);
        else
            throw new Error(`This product does not belong to the current logged user and you do not have sufficient permissions

            : ['ADMIN' , 'PRODUCT_DELETE']

            You Have:

            ${reqUser.permissions}
        `);
    },
    async signup(parent, args, context, info) {
        // if no users exist, the first user to signup is the ADMIN
        const usersCount = await context.db.query.users({id_not: null}, '{id}');
        let permissionsArray;
        if(usersCount.length < 1)
            permissionsArray = ['USER', 'ADMIN'];
        else
            permissionsArray = ['USER'];
        //lowercase email
        const email = args.email.toLowerCase();
        //hash password
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(args.password, salt);
        //create user in the db
        const user = await context.db.mutation.createUser({
            data: {
                ...args,
                email: email,
                password: hashedPassword,
                permissions: { set: permissionsArray }
            }
        }, info);

        const token = jwt.sign({ userId: user.id }, process.env.MY_STYLE_APP_SECRET);
        //set jwt as cookie
        context.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });
        return user;
    },
    async signin(parent, args, context, info) {
        const { email, password } = args;
        // check if user exists
        const user = await context.db.query.user({ where: { email } });
        if (!user)
            throw new Error(`No user found for email ${email}`);

        // check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error(`Invalid password.`);

        // erase any resetToken
        const updatedUser = await context.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                resetToken: null,
                resetTokenExpiry: null
            },
        });

        // generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.MY_STYLE_APP_SECRET);
        //set jwt as cookie
        context.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        return updatedUser;
    },
    signout(parent, args, context, info) {
        context.response.clearCookie('token');

        return { message: 'Logged out!' };
    },
    async requestPasswordReset(parent, args, context, info) {
        //check if user exists
        const user = await context.db.query.user({ where: { email: args.email } });
        if (!user)
            throw new Error(`No user found for email ${args.email}`);

        //set a reset token
        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // one hour
        const res = await context.db.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken, resetTokenExpiry },
        });

        //send email with reset link
        const mailRes = await transport.sendMail({
            from: 'do-not-reply@my-style-store.com',
            to: user.email,
            subject: 'Reset Your Password - MyStyle',
            html: formatEmail(`Click the following link to set a new password for your account: \n\n <a href="${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}">Reset your password</a>`),
        });
        return { message: 'Request received. Check your email to continue the process.' };
    },
    async resetPassword(parent, args, context, info) {
        //check if passwords match
        const { password, confirmPassword, resetToken } = args;
        if (password !== confirmPassword)
            throw new Error('Password and confirmation do not match!')
        //check reset token and check if token is expired
        const [user] = await context.db.query.users({ where: { resetToken }, resetTokenExpiry_gte: Date.now() - 3600000 });
        if (!user)
            throw new Error(`Invalid token.`);

        //hash new password
        const hashedPassword = await bcrypt.hash(password, parseFloat(process.env.BCRYPT_SALT));

        //store new password
        const updatedUser = await context.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            },
        });

        // generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.MY_STYLE_APP_SECRET);
        //set jwt as cookie
        context.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });

        return updatedUser;
    },
    async addProductToCart(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        //query current cart
        const [existingCartProduct] = await context.db.query.cartProducts({
            where: {
                user: { id: context.request.userId },
                product: { id: args.id },
            },
        });

        if (existingCartProduct) {
            return context.db.mutation.updateCartProduct({
                where: { id: existingCartProduct.id },
                data: { quantity: existingCartProduct.quantity + 1 },
            });
        }
        else {
            return context.db.mutation.createCartProduct({
                data: {
                    product: {
                        connect: {
                            id: args.id
                        }
                    },
                    user: {
                        connect: {
                            id: context.request.userId
                        }
                    }
                }
            });
        }
    },
    async removeCartProduct(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        //query current cart
        const [existingCartProduct] = await context.db.query.cartProducts({
            where: {
                user: { id: context.request.userId },
                id: args.id,
            },
        });

        if(existingCartProduct) {
            return context.db.mutation.deleteCartProduct({
                where: {
                    id: existingCartProduct.id
                }
            });
        }
        else
            throw new Error('Cart product not found.');
    },
    async removeProductFromCart(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        //query current cart
        const [existingCartProduct] = await context.db.query.cartProducts({
            where: {
                user: { id: context.request.userId },
                product: { id: args.id },
            },
        });

        if(existingCartProduct) {
            if(existingCartProduct.quantity > 1)
                return context.db.mutation.updateCartProduct({
                    where: { id: existingCartProduct.id },
                    data: { quantity: existingCartProduct.quantity - 1 },
                });
            else
                return context.db.mutation.deleteCartProduct({
                    where: {
                        id: existingCartProduct.id
                    }
                });
        }
    },
    async removeAllProductsFromUserCart(parent, args, context, info) {
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        //query current cart
        const existingCartProducts = await context.db.query.cartProducts({
            where: {
                user: { id: context.request.userId },
            },
        });

        if(existingCartProducts) {
            let idsToDelete = existingCartProducts.map(cartProduct => cartProduct.id);
            return context.db.mutation.deleteManyCartProducts({
                id_in: idsToDelete,
            });
        }
        else
            throw new Error('No products to delete');
    },
    async createOrder(parent, args, context, info) {
        // get the user
        if (!context.request.userId)
            throw new Error('You must be logged in.');

        const reqUser = await context.db.query.user({ where: { id: context.request.userId } }, '{id name email cart { id quantity product { title price id description image largeImage } } }');

        //calculate total price
        const totalOrderPrice = reqUser.cart.reduce( (orderPrice, cartProduct) => orderPrice + cartProduct.product.price * cartProduct.quantity, 0);

        // charge with stripe
        const charge = await stripe.charges.create({
            amount: totalOrderPrice,
            currency: 'USD',
            source: args.token
        });

        // save order to database
        const orderProducts = reqUser.cart.map(cartProduct => {
            const orderProduct = { ...cartProduct.product, quantity: cartProduct.quantity, user: { connect: { id: reqUser.id }}};
            delete orderProduct.id;
            return orderProduct;
        });

        const order = await context.db.mutation.createOrder({
            data: {
                total: charge.amount,
                charge: charge.id,
                products: { create: orderProducts },
                user: { connect: { id: reqUser.id }},
            }
        });
        // clear the user's cart
        const cartProductsIds = reqUser.cart.map(cartProduct => cartProduct.id );
        await context.db.mutation.deleteManyCartProducts({
            where: {
                id_in: cartProductsIds,
            },
        });
        return order;

    }
};

module.exports = mutations;