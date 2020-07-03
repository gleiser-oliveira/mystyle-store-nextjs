import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import { Form } from '../theme/generalStyles';
import { SIGNIN_MUTATION, CURRENT_USER_QUERY } from './AuthenticationOperationsGQL';
import { ErrorMessage, ConfirmationMessage } from '../message/Message';

class Signin extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async(e, signin) => {
        e.preventDefault();
        const res = await signin();
        this.setState({
            name: '',
            email: '',
            password: '',
            message: `User ${res.data.signin.name} logged successfully!`,
        });
    }

    render() {
        return (
            <Mutation mutation={SIGNIN_MUTATION} variables={{ email: this.state.email, password: this.state.password }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signin, payload) => (
                    <Form method='post' onSubmit={e => { this.handleSubmit(e, signin); }}>
                        <fieldset disabled={payload.loading} aria-busy={payload.loading}>
                            <h2>Sign into your Account</h2>
                            {payload.error ? <ErrorMessage error={payload.error} /> : null}
                            {!payload.error && this.state.message ? <ConfirmationMessage message={this.state.message} /> : null}
                            <label htmlFor='email'>
                                Email
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='email'
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor='password'>
                                Password
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='password'
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <Link href={{
                                pathname: '/resetPassword',
                                query: { email: this.state.email }
                            }}>
                                <a>Forgot your password? Click here!</a>
                            </Link>
                            <button type='submit'>Sign In!</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default Signin;
