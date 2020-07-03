import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloConsumer } from 'react-apollo';
import toJSON from 'enzyme-to-json';
import RemoveCartProductButton from '../RemoveCartProductButton';
import { REMOVE_CART_PRODUCT_MUTATION } from '../CartOperationsGQL';
import { CURRENT_USER_QUERY } from '../../authentication/AuthenticationOperationsGQL';
import { updateWrapper, fakeUser, fakeCartProduct } from '../../../lib/testUtils';

const cartProd = fakeCartProduct();
const mocks = [
    {
        request: {
            query: CURRENT_USER_QUERY
        },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [cartProd],
                },
            },
        },
    },
    {
        request: {
            query: REMOVE_CART_PRODUCT_MUTATION,
            variables: { id: cartProd.id }
        },
        result: {
            data: {
                removeCartProduct: {
                    __typename: 'CartProduct',
                    id: cartProd.id,
                },
            },
        },
    },
    {
        request: {
            query: CURRENT_USER_QUERY
        },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [{ ...cartProd, quantity: cartProd.quantity - 1 }],
                },
            },
        },
    },
];

describe('testing the <RemoveCartProductButton/> component', () => {
    it('renders', async() => {
        const wrapper = mount(
            <MockedProvider>
                <RemoveCartProductButton cartProductId={cartProd.id}/>
            </MockedProvider>
        );

        expect(toJSON(wrapper.find('RemoveCartProductButton'))).toMatchSnapshot();
    });
    it('removes the product from the cart', async() => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <RemoveCartProductButton cartProductId={cartProd.id}/>;
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );

        const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
        await updateWrapper(wrapper);
        expect(me.cart).toHaveLength(1);
        expect(me.cart[0].quantity).toBe(2);
        expect(me.cart[0].product.price).toBe(5000);
        wrapper.find('button').simulate('click');
        await updateWrapper(wrapper, 50);
        const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });

        expect(me2.cart).toHaveLength(1);
        expect(me2.cart[0].quantity).toBe(1);
    });
});
