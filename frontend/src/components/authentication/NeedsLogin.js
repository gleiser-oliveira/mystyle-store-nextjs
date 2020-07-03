import React from 'react';
import PropTypes from 'prop-types';
import User from '../authentication/User';
import Signin from '../authentication/Signin';

const NeedsLogin = props => (
    <User>
        {payload => (
            payload.data.me ? props.children : <div>
                <p>You need to sign in to access this resource.</p>
                <Signin/>
            </div>
        )}
    </User>
);

NeedsLogin.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default NeedsLogin;
