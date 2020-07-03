import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { REMOVE_CART_PRODUCT_MUTATION } from './CartOperationsGQL';
import { CURRENT_USER_QUERY } from '../authentication/AuthenticationOperationsGQL';
import { RemoveButton } from './styles';

const RemoveCartProductButton = props => {
    return (
        <Mutation mutation={ REMOVE_CART_PRODUCT_MUTATION } variables={ { id: props.cartProductId } } refetchQueries={ [{ query: CURRENT_USER_QUERY }] }>
            {(removeCartProduct, payload) => (
                <RemoveButton disabled={payload.loading} onClick={removeCartProduct}>
                    &times;
                </RemoveButton>
            )}
        </Mutation>
    );
};

RemoveCartProductButton.propTypes = {
    cartProductId: PropTypes.string,
};

export default RemoveCartProductButton;
