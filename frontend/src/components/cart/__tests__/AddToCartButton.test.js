import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloConsumer } from 'react-apollo';
import toJSON from 'enzyme-to-json';
import AddToCartButton from '../AddToCartButton';
import { ADD_PRODUCT_TO_CART_MUTATION } from '../CartOperationsGQL';
import { CURRENT_USER_QUERY } from '../../authentication/AuthenticationOperationsGQL';
import { updateWrapper, fakeUser, fakeCartProduct } from '../../../lib/testUtils';

const cartProd = fakeCartProduct();
const usr = fakeUser();
const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...usr,
                    cart: [],
                },
            },
        },
    },
    {
        request: { query: ADD_PRODUCT_TO_CART_MUTATION, variables: { id: cartProd.product.id } },
        result: {
            data: {
                addProductToCart: {
                    ...cartProd,
                    quantity: 1,
                },
            },
        },
    },
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...usr,
                    cart: [cartProd],
                },
            },
        },
    },
];

describe('testing the <AddToCartButton/> component', async() => {
    it('renders', async() => {
        const prod = fakeCartProduct().product;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <AddToCartButton productId={prod.id}/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        const addToCartBtn = wrapper.find('AddToCartButton');
        expect(addToCartBtn.prop('productId')).toEqual(prod.id);
        expect(toJSON(addToCartBtn)).toMatchSnapshot();
    });
    it('adds a product to the cart when clicked', async() => {
        let apolloClient;
        const prod = fakeCartProduct().product;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <AddToCartButton productId={prod.id}/>;
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );

        const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
        await updateWrapper(wrapper);
        expect(me.cart).toHaveLength(0);

        wrapper.find('button').simulate('click');
        await updateWrapper(wrapper, 50);
        const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });

        expect(me2.cart).toHaveLength(1);
        expect(me2.cart[0].id).toBe(cartProd.id);
    });
    it('changes from add to adding when clicked', async() => {
        const prod = fakeCartProduct().product;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <AddToCartButton productId={prod.id}/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        expect(wrapper.text()).toContain('🛒 Add To Cart');
        wrapper.find('button').simulate('click');
        expect(wrapper.text()).toContain('🛒 Adding To Cart');
    });
});
