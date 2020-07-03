import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import toJSON from 'enzyme-to-json';
import ResetPassword from '../ResetPassword';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../AuthenticationOperationsGQL';
import { updateWrapper } from '../../../lib/testUtils';

const mocks = [
    {
        request: {
            query: REQUEST_PASSWORD_RESET_MUTATION,
            variables: { email: 'test@gmail.com' }
        },
        result: {
            data: { requestPasswordReset: { message: 'success', __typename: 'Message' } },
        },
    },
];

describe('testing the <ResetPassword/> component', () => {
    it('renders', async() => {
        const wrapper = mount(
            <MockedProvider>
                <ResetPassword/>
            </MockedProvider>
        );

        const form = wrapper.find('form');
        expect(toJSON(form)).toMatchSnapshot();
    });
    it('calls the REQUEST_PASSWORD_RESET_MUTATION', async() => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ResetPassword/>
            </MockedProvider>
        );

        const form = wrapper.find('form');
        const emailInput = form.find('input');

        emailInput.simulate('change', { target: { name: 'email', value: 'test@gmail.com' } });

        form.simulate('submit');

        await updateWrapper(wrapper);

        expect(wrapper.find('p').text()).toContain('success');
    });
});
