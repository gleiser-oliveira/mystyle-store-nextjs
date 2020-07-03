import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import toJSON from 'enzyme-to-json';
import Order from '../Order';
import { SINGLE_ORDER_QUERY } from '../OrderOperationsGQL';
import { updateWrapper, fakeOrder } from '../../../lib/testUtils';

const order = fakeOrder();
const mocks = [
    {
        request: {
            query: SINGLE_ORDER_QUERY,
            variables: { id: order.id }
        },
        result: {
            data: {
                order: {
                    ...order,
                },
            },
        },
    },
];

describe('testing the <RemoveCartProductButton/> component', () => {
    it('renders', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Order id={order.id}/>
            </MockedProvider>
        );
        await updateWrapper(wrapper);
        const div = wrapper.find('[data-test="order"]');
        expect(toJSON(div)).toMatchSnapshot();
    });
});
