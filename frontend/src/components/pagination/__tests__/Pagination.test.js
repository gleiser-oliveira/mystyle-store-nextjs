import { mount } from 'enzyme';
import Pagination from '../Pagination';
import toJSON from 'enzyme-to-json';
import { USER_ORDERS_PAGINATION_QUERY } from '../../order/OrderOperationsGQL';
import { PRODUCTS_PAGINATION_QUERY } from '../../products/ProductsOperationsGQL';
import { MockedProvider } from '@apollo/react-testing';
import { updateWrapper } from '../../../lib/testUtils';

const pagLoadingMock = {
    event: jest.fn(),
    name: 'mock',
};

const makeMocksFor = (query, connectionName, count) => {
    return [
        {
            request: { query: query },
            result: {
                data: {
                    [connectionName]: {
                        __typename: 'aggregate',
                        aggregate: {
                            __typename: 'count',
                            count: count,
                        },
                    },
                },
            },
        },
    ];
};

describe('testing the <Pagination/> component', () => {
    it('renders pagination for 37 products', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(PRODUCTS_PAGINATION_QUERY, 'productsConnection', 37)}>
                <Pagination loading={pagLoadingMock} page={1} query={PRODUCTS_PAGINATION_QUERY} nameObjects='Products' pathname='products' connectionName='productsConnection'/>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const pagination = wrapper.find('Pagination');

        expect(toJSON(pagination)).toMatchSnapshot();
    });
    it('renders pagination for 83 orders', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(USER_ORDERS_PAGINATION_QUERY, 'ordersConnection', 83)}>
                <Pagination loading={pagLoadingMock} page={1} query={USER_ORDERS_PAGINATION_QUERY} nameObjects='Orders' pathname='orders' connectionName='ordersConnection'/>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const pagination = wrapper.find('Pagination');
        expect(toJSON(pagination)).toMatchSnapshot();
    });
    it('disables only the previous button on the first page', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(PRODUCTS_PAGINATION_QUERY, 'productsConnection', 8)}>
                <Pagination loading={pagLoadingMock} page={1} query={PRODUCTS_PAGINATION_QUERY} nameObjects='Products' pathname='products' connectionName='productsConnection'/>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const prevBtn = wrapper.find('a.prev');
        const nextBtn = wrapper.find('a.next');
        expect(prevBtn.prop('aria-disabled')).toEqual(true);
        expect(nextBtn.prop('aria-disabled')).toEqual(false);
    });
    it('disables only the next button on the last page', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(PRODUCTS_PAGINATION_QUERY, 'productsConnection', 8)}>
                <Pagination loading={pagLoadingMock} page={2} query={PRODUCTS_PAGINATION_QUERY} nameObjects='Products' pathname='products' connectionName='productsConnection'/>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const prevBtn = wrapper.find('a.prev');
        const nextBtn = wrapper.find('a.next');
        expect(prevBtn.prop('aria-disabled')).toEqual(false);
        expect(nextBtn.prop('aria-disabled')).toEqual(true);
    });
    it('enables both buttons on a middle page', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(USER_ORDERS_PAGINATION_QUERY, 'ordersConnection', 15)}>
                <Pagination loading={pagLoadingMock} page={2} query={USER_ORDERS_PAGINATION_QUERY} nameObjects='Orders' pathname='orders' connectionName='ordersConnection'/>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const prevBtn = wrapper.find('a.prev');
        const nextBtn = wrapper.find('a.next');
        expect(prevBtn.prop('aria-disabled')).toEqual(false);
        expect(nextBtn.prop('aria-disabled')).toEqual(false);
    });
    it('disbles both buttons in a single page', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(USER_ORDERS_PAGINATION_QUERY, 'ordersConnection', 1)}>
                <Pagination loading={pagLoadingMock} page={1} query={USER_ORDERS_PAGINATION_QUERY} nameObjects='Orders' pathname='orders' connectionName='ordersConnection'/>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const prevBtn = wrapper.find('a.prev');
        const nextBtn = wrapper.find('a.next');
        expect(prevBtn.prop('aria-disabled')).toEqual(true);
        expect(nextBtn.prop('aria-disabled')).toEqual(true);
    });
});
