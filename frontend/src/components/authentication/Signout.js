import React from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from './AuthenticationOperationsGQL';

const Signout = props => (
    <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signout, payload) => (
            <button onClick={async e => {
                // const res = await signout();
                await signout();
                Router.push({
                    pathname: '/products',
                });
            }}>Sign Out</button>
        )}
    </Mutation>
);

export default Signout;
