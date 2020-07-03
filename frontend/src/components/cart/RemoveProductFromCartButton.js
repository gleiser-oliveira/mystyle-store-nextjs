import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { REMOVE_PRODUCT_FROM_CART_MUTATION } from './CartOperationsGQL';
import { CURRENT_USER_QUERY } from '../authentication/AuthenticationOperationsGQL';
import { RemoveButton } from './styles';

const RemoveProductFromCartButton = props => {
    return (
        <Mutation mutation={ REMOVE_PRODUCT_FROM_CART_MUTATION } variables={ { id: props.productId } } refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {(removeProductFromCart, payload) => (
                <RemoveButton disabled={payload.loading} onClick={removeProductFromCart}>
                    &times;
                </RemoveButton>
            )}
        </Mutation>
    );
};

RemoveProductFromCartButton.propTypes = {
    productId: PropTypes.string,
};

export default RemoveProductFromCartButton;
