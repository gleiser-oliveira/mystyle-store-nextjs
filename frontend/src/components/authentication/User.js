import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './AuthenticationOperationsGQL';

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => !payload.loading && props.children(payload)}
    </Query>
);

User.propTypes = {
    children: PropTypes.func.isRequired,
};

export default User;
