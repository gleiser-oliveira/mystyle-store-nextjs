import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import NeedsLogin from '../NeedsLogin';
import { signedInMocks, notSignedInMocks, updateWrapper } from '../../../lib/testUtils';

describe('testing the <NeedsLogin/> component', () => {
    it('renders the sign in component if there\'s no user logged', async() => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks()}>
                <NeedsLogin id='4234'>
                    <p className='test-child'>Failed</p>
                </NeedsLogin>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const child = wrapper.find('.test-child');
        const signIn = wrapper.find('Signin');
        expect(child.exists()).toBe(false);
        expect(signIn.exists()).toBe(true);
    });

    it('renders its children if the user is logged', async() => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks()}>
                <NeedsLogin id='4234'>
                    <p className='test-child'>Success</p>
                </NeedsLogin>
            </MockedProvider>
        );

        await updateWrapper(wrapper);

        const child = wrapper.find('.test-child');
        const signIn = wrapper.find('Signin');
        expect(child.exists()).toBe(true);
        expect(signIn.exists()).toBe(false);
    });
});
