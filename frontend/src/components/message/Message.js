import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessageStyle, ConfirmationMessageStyle, WarningMessageStyle } from './style';

export const ErrorMessage = ({ error }) => {
    if (!error || !error.message)
        return null;
    if (error.networkError && error.networkError.result && error.networkError.result.errors.length)
        return error.networkError.result.errors.map((error, i) => (
            <ErrorMessageStyle key={i}>
                <p data-test="graphql-error">
                    <strong>Oh No!</strong>
                    {error.message.replace('GraphQL error: ', '')}
                </p>
            </ErrorMessageStyle>
        ));
    return (
        <ErrorMessageStyle>
            <p data-test="graphql-error">
                <strong>Oops!</strong>
                {error.message.replace('GraphQL error: ', '')}
            </p>
        </ErrorMessageStyle>
    );
};

export const ConfirmationMessage = props => (
    <ConfirmationMessageStyle>
        <p>
            {props.message}
        </p>
    </ConfirmationMessageStyle>
);

export const WarningMessage = props => (
    <WarningMessageStyle>
        <p>
            {props.message}
        </p>
    </WarningMessageStyle>
);

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
        networkError: PropTypes.shape({
            result: PropTypes.object,
        }),
    }),
};

ConfirmationMessage.propTypes = {
    message: PropTypes.string,
};

WarningMessage.propTypes = {
    message: PropTypes.string,
};
