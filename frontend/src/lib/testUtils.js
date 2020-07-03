import casual from 'casual';
import { act } from 'react-dom/test-utils';
import { CURRENT_USER_QUERY } from '../components/authentication/AuthenticationOperationsGQL';

// seeded for constant results
casual.seed(123);

const fakeUser = overrides => ({
    __typename: 'User',
    id: '4234',
    name: casual.name,
    email: casual.email,
    permissions: ['USER', 'PRODUCT_CREATE'],
    cart: [],
    ...overrides,
});

const fakeUser2 = () => ({
    __typename: 'User',
    id: '2222',
    name: casual.name,
    email: casual.email,
    permissions: ['USER'],
    orders: [],
    cart: [],
});

const fakeAdminUser = () => ({
    __typename: 'User',
    id: '1111',
    name: casual.name,
    email: casual.email,
    permissions: ['ADMIN', 'PRODUCT_CREATE'],
    orders: [],
    cart: [],
});

const fakeProduct = () => ({
    __typename: 'Product',
    id: 'QWERTY0123',
    title: 'A Fake Product',
    price: 5000,
    description: 'This is a fake product for testing.',
    image: 'product.jpg',
    largeImage: 'largeProduct.jpg',
    user: fakeUser(),
});

const fakeProduct2 = () => ({
    __typename: 'Product',
    id: 'AS012',
    title: 'Another Fake Product',
    price: 2999,
    description: 'This is another fake product for testing.',
    image: 'product2.jpg',
    largeImage: 'bigProduct2.jpg',
    user: fakeUser(),
});

const fakeOrderProduct = () => ({
    __typename: 'OrderProduct',
    id: casual.uuid,
    image: `${casual.word}.jpg`,
    title: casual.words(),
    price: 4234,
    quantity: 1,
    description: casual.words(),
});

const fakeOrder = () => ({
    __typename: 'Order',
    id: 'ord123',
    charge: 'ch_123',
    total: 40000,
    products: [fakeOrderProduct(), fakeOrderProduct()],
    createdAt: 'May 1, 2020 00:00:00',
    user: fakeUser(),
});


const fakeCartProduct = overrides => ({
    __typename: 'CartProduct',
    id: 'prod123',
    quantity: 2,
    product: fakeProduct(),
    user: fakeUser(),
    ...overrides,
});

const fakeCartProduct2 = overrides => ({
    __typename: 'CartProduct',
    id: 'prod312',
    quantity: 2,
    product: fakeProduct2(),
    user: fakeUser(),
    ...overrides,
});

const cartUser = fakeUser();
const fakeCart = () => ([
    fakeCartProduct({user: cartUser}),
    fakeCartProduct2({user: cartUser}),
]);

// Fake LocalStorage
class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

// mocks
const signedInMocks = (user = fakeUser) => { return [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: user(),
            }
        }
    }
]};

const notSignedInMocks = () => ([
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: null,
            }
        }
    }
]);

const updateWrapper = async (wrapper, ms = 0) => {
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, ms));
        wrapper.update();
    });
}

export {
    LocalStorageMock,
    fakeProduct,
    fakeProduct2,
    fakeUser,
    fakeUser2,
    fakeAdminUser,
    fakeCartProduct,
    fakeCartProduct2,
    fakeOrder,
    fakeCart,
    fakeOrderProduct,
    signedInMocks,
    notSignedInMocks,
    updateWrapper,
};
