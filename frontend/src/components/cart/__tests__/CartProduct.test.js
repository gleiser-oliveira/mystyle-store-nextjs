import { shallow } from 'enzyme';
import CartProduct from '../CartProduct';
import { fakeCartProduct } from '../../../lib/testUtils';

describe('Testing <CartProduct/> component', () => {
    it('renders', () => {
        const cartProduct = fakeCartProduct();
        const wrapper = shallow(<CartProduct cartProduct={cartProduct} />);
        const h3 = wrapper.find('h3');

        expect(h3.text()).toEqual(cartProduct.product.title);
    });
});
