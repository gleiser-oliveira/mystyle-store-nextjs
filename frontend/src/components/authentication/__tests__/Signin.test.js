import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloConsumer } from 'react-apollo';
import toJSON from 'enzyme-to-json';
import Signin from '../Signin';
import { SIGNIN_MUTATION, CURRENT_USER_QUERY } from '../AuthenticationOperationsGQL';
import { updateWrapper, fakeUser } from '../../../lib/testUtils';

const usr = fakeUser();

const mocks = [
    {
        request: {
            query: SIGNIN_MUTATION,
            variables: {
                email: usr.email,
                name: usr.name,
                password: 'pass',
            },
        },
        result: {
            data: {
                signin: {
                    __typename: 'User',
                    id: usr.id,
                    email: usr.email,
                    name: usr.name,
                },
            },
        },
    },
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: {
            data: {
                me: {
                    ...usr,
                }
            }
        }
    }
];

describe('testing the <Signin/> component', () => {
    it('renders', () => {
        const wrapper = mount(
            <MockedProvider>
                <Signin/>
            </MockedProvider>
        );

        expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
    });
    it('calls the signin mutation', async() => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <Signin/>;
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );
        await updateWrapper(wrapper);

        const emailInput = wrapper.find('input[name="email"]');
        const passwordInput = wrapper.find('input[name="password"]');

        emailInput.simulate('change', { target: { name: 'email', value: usr.email } });
        passwordInput.simulate('change', { target: { name: 'password', value: 'pass' } });
        await updateWrapper(wrapper);

        const user = await apolloClient.query({ query: CURRENT_USER_QUERY });

        expect(user.data.me).toMatchObject(usr);
    });
});
