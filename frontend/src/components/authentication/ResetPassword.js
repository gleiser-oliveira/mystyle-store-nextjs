import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form } from '../theme/generalStyles';
import { REQUEST_PASSWORD_RESET_MUTATION, RESET_PASSWORD_MUTATION, CURRENT_USER_QUERY } from './AuthenticationOperationsGQL';
import { ErrorMessage, ConfirmationMessage } from '../message/Message';

class ResetPassword extends Component {
    state = {
        email: this.props.email || '',
        password: '',
        confirmPassword: '',
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRequestPasswordReset = async(e, requestReset) => {
        e.preventDefault();
        await requestReset();
        this.setState({
            email: ''
        });
    }

    handlePasswordReset = async(e, resetPassword) => {
        e.preventDefault();
        await resetPassword();
        this.setState({
            password: '',
            confirmPassword: '',
        });
    }

    renderRequestResetPasswordForm() {
        return (
            <Mutation mutation={REQUEST_PASSWORD_RESET_MUTATION} variables={{ email: this.state.email }} >
                {(requestReset, payload) => (
                    <Form method="post" onSubmit={e => { this.handleRequestPasswordReset(e, requestReset); }}>
                        <fieldset disabled={payload.loading} aria-busy={payload.loading}>
                            <h2>Reset your Account&rsquo;s Password</h2>
                            {payload.error ? <ErrorMessage error={payload.error} /> : null}
                            {!payload.error && !payload.loading && payload.called && payload.data ? <ConfirmationMessage message={payload.data.requestPasswordReset.message} /> : null}
                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button type="submit">Reset</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }

    renderResetPasswordForm() {
        return (
            <Mutation
                mutation={RESET_PASSWORD_MUTATION}
                variables={{
                    resetToken: this.props.token,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(resetPassword, payload) => (
                    <Form method="post" onSubmit={e => { this.handlePasswordReset(e, resetPassword); }}>
                        <fieldset disabled={payload.loading} aria-busy={payload.loading}>
                            <h2>Reset your Account&rsquo;s Password</h2>
                            {payload.error ? <ErrorMessage error={payload.error} /> : null}
                            {!payload.error && payload.data ? <ConfirmationMessage message={`Password sucessfully reset for user ${payload.data.resetPassword.name}`} /> : null}
                            <label htmlFor="password">
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="New password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="confirmPassword">
                                Confirm the new password:
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={this.state.confirmPassword}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button type="submit">Confirm</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }

    render() {
        return this.props.token ? this.renderResetPasswordForm() : this.renderRequestResetPasswordForm();
    }
}

ResetPassword.propTypes = {
    email: PropTypes.string,
    token: PropTypes.string,
};

export default ResetPassword;
