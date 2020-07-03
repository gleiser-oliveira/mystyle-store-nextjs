import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { CartStyle, Supreme, CloseButton } from './styles';
import CartProduct from './CartProduct';
import Payment from '../payment/Payment';
import { calcTotalCartPrice, formatPrice, numberOfProducts } from '../../lib/cartHelper';
import { CLEAR_CART_MUTATION } from './CartOperationsGQL';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../../lib/ClientGQL/LocalGQL';
import { CURRENT_USER_QUERY } from '../authentication/AuthenticationOperationsGQL';

class Cart extends Component {
    clearCartAction = (e, clearCartMutation) => {
        const confirmed = confirm('Are you sure you want to empty your cart?');
        if (confirmed)
            clearCartMutation();
    }

    render() {
        return (!this.props.userCart ? null
            : (
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                    {toggleCart => (
                        <Query query={LOCAL_STATE_QUERY}>
                            {payload => (
                                <CartStyle open={payload.data.cartOpen}>
                                    <header>
                                        <CloseButton onClick={toggleCart} title='close'>&times;</CloseButton>
                                        <Supreme>Your Cart</Supreme>
                                        <p>You have {numberOfProducts(this.props.userCart)} products in your cart.</p>
                                    </header>
                                    <ul>
                                        {this.props.userCart.map(cartProduct => <CartProduct key={cartProduct.id} cartProduct={cartProduct} />)}
                                    </ul>
                                    <Mutation mutation={CLEAR_CART_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                                        {(clearCart, payload) => (
                                            <div>
                                                <button className='clear-cart-button' disabled={payload.loading || this.props.userCart.length < 1} onClick={e => this.clearCartAction(e, clearCart)}>
                                                    <span>Clear{payload.loading && 'ing'} Cart</span>
                                                </button>
                                            </div>
                                        )}
                                    </Mutation>
                                    <footer>
                                        <div>
                                            <p>Total: {formatPrice(calcTotalCartPrice(this.props.userCart))}</p>
                                            <Payment>
                                                <button disabled={this.props.userCart.length < 1 || this.props.userCart.some(cartProduct => !cartProduct.product)}>
                                                    Checkout
                                                </button>
                                            </Payment>
                                        </div>
                                    </footer>
                                </CartStyle>
                            )}
                        </Query>
                    )}
                </Mutation>
            )
        );
    }
}

Cart.propTypes = {
    userCart: PropTypes.array,
};

export default Cart;
