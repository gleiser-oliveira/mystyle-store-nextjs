import React from 'react';
import { StyledError } from './styles';
import PropTypes from 'prop-types';

const DisplayError = ({ error }) => {
    if (!error || !error.message)
        return null;

    if (error.networkError && error.networkError.result && error.networkError.result.errors.length)
        return error.networkError.result.errors.map((error, i) => (
            <StyledError key={i}>
                <p data-test="graphql-error">
                    <strong>Oops!</strong>
                    {error.message.replace('GraphQL error: ', '')}
                </p>
            </StyledError>
        ));

    return (
        <StyledError>
            <p data-test="graphql-error">
                <strong>Oops!</strong>
                {error.message.replace('GraphQL error: ', '')}
            </p>
        </StyledError>
    );
};

DisplayError.defaultProps = {
    error: {},
};

DisplayError.propTypes = {
    error: PropTypes.object,
};

export default DisplayError;
