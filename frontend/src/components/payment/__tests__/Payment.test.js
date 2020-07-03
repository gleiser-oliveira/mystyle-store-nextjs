import { mount } from 'enzyme';
import Router from 'next/router';
import NProgress from 'nprogress';
import { MockedProvider } from '@apollo/react-testing';
import toJSON from 'enzyme-to-json';
import Payment from '../Payment';
import { CURRENT_USER_QUERY } from '../../authentication/AuthenticationOperationsGQL';
import { updateWrapper, fakeUser, fakeCartProduct } from '../../../lib/testUtils';

const cartProd = fakeCartProduct();
Router.router = { push() {} };

const createOrderMock = jest.fn().mockResolvedValue({
    data: { createOrder: { id: 'aaa1111' } }
});

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [cartProd],
                },
            },
        },
    },
];

describe('testing the <Payment/> component', () => {
    it('renders', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        const btn = wrapper.find('ReactStripeCheckout');
        expect(toJSON(btn)).toMatchSnapshot();
    });
    it('creates an order', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        const paymentComponent = wrapper.find('Payment').instance();
        paymentComponent.onTokenReceived({ id: cartProd.id }, createOrderMock);
        expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: cartProd.id } });
    });
    it('turns the progress bar on', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        NProgress.start = jest.fn();
        const paymentComponent = wrapper.find('Payment').instance();
        paymentComponent.onTokenReceived({ id: cartProd.id }, createOrderMock);
        expect(NProgress.start).toHaveBeenCalled();
    });
    it('routes to the order page when completed', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        Router.router.push = jest.fn();
        const paymentComponent = wrapper.find('Payment').instance();
        paymentComponent.onTokenReceived({ id: cartProd.id }, createOrderMock);
        await updateWrapper(wrapper);
        expect(Router.router.push).toHaveBeenCalledWith({
            pathname: '/order',
            query: { id: 'aaa1111' }
        });
    });
});
