import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Form } from '../theme/generalStyles';
import { SIGNUP_MUTATION, CURRENT_USER_QUERY } from './AuthenticationOperationsGQL';
import { ErrorMessage, ConfirmationMessage } from '../message/Message';

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async(e, signup) => {
        e.preventDefault();
        const res = await signup();
        this.setState({
            name: '',
            email: '',
            password: '',
            message: `User ${res.data.signup.name} added successfully!`,
        });
    }

    render() {
        return (
            <Mutation mutation={SIGNUP_MUTATION} variables={{ name: this.state.name, email: this.state.email, password: this.state.password }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signup, payload) => (
                    <Form method='post' onSubmit={e => { this.handleSubmit(e, signup); }}>
                        <fieldset disabled={payload.loading} aria-busy={payload.loading}>
                            <h2>Sign Up for an Account</h2>
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
                            <label htmlFor='name'>
                                Name
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='name'
                                    value={this.state.name}
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
                            <button type='submit'>Sign Up!</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default Signup;
