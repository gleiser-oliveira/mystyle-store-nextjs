import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import ProductExtendedView from '../ProductExtendedView';
import { SINGLE_PRODUCT_QUERY } from '../ProductsOperationsGQL';
import { fakeProduct } from '../../../lib/testUtils';

describe('Testing <ProductExtendedView/> component', () => {
    it('renders with proper data', async() => {
        const mocks = [
            {
                request: { query: SINGLE_PRODUCT_QUERY, variables: { id: 'QWERTY0123' } },
                result: {
                    data: {
                        product: fakeProduct(),
                    }
                }
            }
        ];
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ProductExtendedView id='QWERTY0123'/>
            </MockedProvider>
        );

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
            wrapper.update();
        });

        // title
        expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
        // image
        expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
        // description
        expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
    });

    it('renders an error when the product is not found', async() => {
        const testID = '321';
        const mocks = [
            {
                request: { query: SINGLE_PRODUCT_QUERY, variables: { id: testID } },
                result: {
                    data: {
                        product: null,
                    }
                }
            }
        ];

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ProductExtendedView id={testID}/>
            </MockedProvider>
        );

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
            wrapper.update();
        });

        expect(wrapper.find('p').text()).toBe(`No Product Found for ${testID}`);
    });
});
