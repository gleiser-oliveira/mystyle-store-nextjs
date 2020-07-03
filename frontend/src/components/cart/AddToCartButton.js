import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { ADD_PRODUCT_TO_CART_MUTATION } from './CartOperationsGQL';
import { CURRENT_USER_QUERY } from '../authentication/AuthenticationOperationsGQL';

class AddToCartButton extends Component {
    addAction = async(addMethod) => {
        try {
            await addMethod();
        } catch (error) {
            Router.push({
                pathname: '/signup',
            });
        }
    }

    render() {
        return (
            <Mutation mutation={ ADD_PRODUCT_TO_CART_MUTATION } variables={ { id: this.props.productId } } refetchQueries={ [{ query: CURRENT_USER_QUERY }] }>
                {(addToCart, payload) => (
                    <button disabled={payload.loading} onClick={() => this.addAction(addToCart)}>
                        {'\u{1F6D2}'} Add{payload.loading && 'ing'} To Cart
                    </button>
                )}
            </Mutation>
        );
    }
}

AddToCartButton.propTypes = {
    productId: PropTypes.string,
};

export default AddToCartButton;
