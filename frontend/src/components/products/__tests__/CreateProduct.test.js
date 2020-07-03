import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import CreateProduct from '../CreateProduct';
import { CREATE_PRODUCT_MUTATION, ALL_PRODUCTS_QUERY } from '../ProductsOperationsGQL';
import { perPage } from '../../../config';
import { fakeProduct, updateWrapper } from '../../../lib/testUtils';

const fakeProductImage = 'https://product.com/prod.jpg';

describe('testing the <CreateProduct/> component', () => {
    it('renders', async() => {
        const wrapper = mount(
            <MockedProvider>
                <CreateProduct/>
            </MockedProvider>
        );
        const form = wrapper.find('form');
        expect(toJSON(form)).toMatchSnapshot();
    });
    it('uploads the image when the corresponding input is changed', async() => {
        // making a mock for the global JS fetch API
        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({
                secure_url: fakeProductImage,
                eager: [{ secure_url: fakeProductImage }],
            }),
        });
        const wrapper = mount(
            <MockedProvider>
                <CreateProduct/>
            </MockedProvider>
        );
        const imgInput = wrapper.find('input[type="file"]');
        imgInput.simulate('change', { target: { files: ['fakeImg.jpg'] } });
        await updateWrapper(wrapper);
        const component = wrapper.find('CreateProduct').instance();
        expect(global.fetch).toHaveBeenCalled();
        expect(component.state.image).toEqual(fakeProductImage);
        expect(component.state.largeImage).toEqual(fakeProductImage);
        global.fetch.mockReset();
    });
    it('updates its state when there are input changes', async() => {
        const fakeProd = fakeProduct();
        const wrapper = mount(
            <MockedProvider>
                <CreateProduct/>
            </MockedProvider>
        );

        const title = wrapper.find('#title');
        const description = wrapper.find('#description');
        const price = wrapper.find('#price');

        title.simulate('change', { target: { value: fakeProd.title, name: 'title' } });
        description.simulate('change', { target: { value: fakeProd.description, name: 'description' } });
        price.simulate('change', { target: { value: fakeProd.price, name: 'price' } });

        // await updateWrapper(wrapper);

        const component = wrapper.find('CreateProduct').instance();

        expect(component.state).toMatchObject({
            title: fakeProd.title,
            description: fakeProd.description,
            price: fakeProd.price,
        });
    });
    it('creates a product when the form is submitted', async() => {
        const fakeProd = fakeProduct();
        const mocks = [
            {
                request: {
                    query: CREATE_PRODUCT_MUTATION,
                    variables: {
                        title: fakeProd.title,
                        description: fakeProd.description,
                        image: '',
                        largeImage: '',
                        price: fakeProd.price,
                    },
                },
                result: {
                    data: {
                        createProduct: {
                            __typename: fakeProd.__typename,
                            id: fakeProd.id,
                        },
                    },
                },
            },
            {
                request: {
                    query: ALL_PRODUCTS_QUERY,
                    variables: {
                        skip: 0,
                        first: perPage
                    },
                },
                result: {
                    data: {
                        products: []
                    }
                }
            },
        ];
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateProduct/>
            </MockedProvider>
        );

        const title = wrapper.find('#title');
        const description = wrapper.find('#description');
        const price = wrapper.find('#price');

        title.simulate('change', { target: { value: fakeProd.title, name: 'title' } });
        description.simulate('change', { target: { value: fakeProd.description, name: 'description' } });
        price.simulate('change', { target: { value: fakeProd.price, name: 'price' } });

        Router.router = { push: jest.fn() };
        wrapper.find('form').simulate('submit');
        await updateWrapper(wrapper, 50);
        expect(Router.router.push).toHaveBeenCalled();
    });
});
