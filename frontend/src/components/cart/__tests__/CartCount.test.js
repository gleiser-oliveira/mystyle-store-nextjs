import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../CartCount';

describe('Testing <CartCount/> component', () => {
    it('renders', () => {
        shallow(<CartCount count={3} />);
    });

    it('matches the snapshot', () => {
        const wrapper = shallow(<CartCount count={1} />);

        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('updates via props', () => {
        const wrapper = shallow(<CartCount count={1} />);

        expect(toJSON(wrapper)).toMatchSnapshot();

        wrapper.setProps({ count: 3 });

        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
