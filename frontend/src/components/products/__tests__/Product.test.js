import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { formatPrice } from '../../../lib/cartHelper';
import Product from '../Product';
import { fakeUser, fakeProduct } from '../../../lib/testUtils';

describe('Testing <Product/> component', () => {
    it('renders the title', () => {
        const fp = fakeProduct();
        const fu = fakeUser();
        const wrapper = shallow(<Product product={fp} userData={fu}/>);
        const title = wrapper.find('styles__Title a');

        expect(title.text()).toBe(fp.title);
    });

    it('renders the image', () => {
        const fp = fakeProduct();
        const fu = fakeUser();
        const wrapper = shallow(<Product product={fp} userData={fu}/>);
        const img = wrapper.find('Image');

        expect(img.props().src).toBe(fp.image);
        expect(img.props().alt).toBe(fp.title);
    });

    it('renders the description', () => {
        const fp = fakeProduct();
        const fu = fakeUser();
        const wrapper = shallow(<Product product={fp} userData={fu}/>);
        const description = wrapper.find('p');

        expect(description.text()).toBe(fp.description);
    });

    it('renders and displays the formatted price', () => {
        const fp = fakeProduct();
        const fu = fakeUser();
        const wrapper = shallow(<Product product={fp} userData={fu}/>);

        const price = wrapper.find('styles__PriceTag');

        expect(price.text()).toBe(formatPrice(fp.price));
    });

    it('renders and matches snapshot', () => {
        const fp = fakeProduct();
        const fu = fakeUser();
        const wrapper = shallow(<Product product={fp} userData={fu}/>);

        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
