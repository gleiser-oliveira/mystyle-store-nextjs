import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import Nav from '../Nav';
import { fakeUser, fakeAdminUser, fakeUser2 } from '../../../lib/testUtils';
import { TOGGLE_CART_MUTATION } from '../../../lib/ClientGQL/LocalGQL';

const toggleCartMocks = (user = fakeUser) => {
    return [
        {
            request: { query: TOGGLE_CART_MUTATION },
            result: {
                data: {}
            }
        },
    ];
};

describe('Testing <Nav/> component', () => {
    it('renders a minimal navbar when there\'s no user signed in', () => {
        const wrapper = mount(<Nav userData={ { me: null } } />);

        const links = wrapper.find('a');

        expect(links).toHaveLength(2);
        expect(links.exists('a[href="/products"]')).toBe(true);
        expect(links.exists('a[href="/signup"]')).toBe(true);
    });
    it('renders a specific navbar when a seller is signed in', () => {
        const wrapper = mount(
            <MockedProvider mocks={toggleCartMocks()}>
                <Nav userData={ { me: fakeUser() } } />
            </MockedProvider>
        );

        const links = wrapper.find('a');
        expect(links).toHaveLength(3);

        expect(links.exists('a[href="/sell"]')).toBe(true);
        expect(links.exists('a[href="/orders"]')).toBe(true);
        expect(links.exists('a[href="/products"]')).toBe(true);
    });
    it('renders a specific navbar when a common user is signed in', () => {
        const wrapper = mount(
            <MockedProvider mocks={toggleCartMocks()}>
                <Nav userData={ { me: fakeUser2() } } />
            </MockedProvider>
        );

        const links = wrapper.find('a');
        expect(links).toHaveLength(2);

        expect(links.exists('a[href="/orders"]')).toBe(true);
        expect(links.exists('a[href="/products"]')).toBe(true);
    });
    it('renders a specific navbar when an admin is signed in', () => {
        const wrapper = mount(
            <MockedProvider mocks={toggleCartMocks()}>
                <Nav userData={ { me: fakeAdminUser() } } />
            </MockedProvider>
        );

        const links = wrapper.find('a');
        expect(links).toHaveLength(4);

        expect(links.exists('a[href="/sell"]')).toBe(true);
        expect(links.exists('a[href="/orders"]')).toBe(true);
        expect(links.exists('a[href="/products"]')).toBe(true);
        expect(links.exists('a[href="/permissions"]')).toBe(true);
    });
});
