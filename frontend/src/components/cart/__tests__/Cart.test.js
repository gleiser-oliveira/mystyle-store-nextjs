import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import toJSON from 'enzyme-to-json';
import Cart from '../Cart';
import { LOCAL_STATE_QUERY } from '../../../lib/ClientGQL/LocalGQL';
import { CURRENT_USER_QUERY } from '../../authentication/AuthenticationOperationsGQL';
import { updateWrapper, fakeUser, fakeCart } from '../../../lib/testUtils';

// mocked local cache for LOCAL_STATE_QUERY
const cache = new InMemoryCache();
cache.writeData({
    data: {
        cartOpen: true,
    },
});

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: fakeCart(),
                },
            },
        },
    },
    {
        request: { query: LOCAL_STATE_QUERY },
        result: {
            data: {
                cartOpen: true,
            },
        },
    },
];

describe('testing the <Cart/> component', () => {
    it('renders', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks} cache={cache} resolvers={{}}>
                <Cart userCart={ fakeCart() }/>
            </MockedProvider>
        );

        await updateWrapper(wrapper, 50);
        const cart = wrapper.find('div[open=true]');
        const header = cart.find('header');

        expect(toJSON(header)).toMatchSnapshot();
        expect(cart.find('CartProduct')).toHaveLength(2);
    });
});
