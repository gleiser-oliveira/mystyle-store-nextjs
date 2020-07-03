import React from 'react';
import { formatPrice } from '../../lib/cartHelper';
import PropTypes from 'prop-types';
import RemoveCartProductButton from './RemoveCartProductButton';
import RemoveProductFromCartButton from './RemoveProductFromCartButton';
import { CartProductStyle } from './styles';

const CartProduct = props => {
    if (props.cartProduct.product)
        return (
            <CartProductStyle>
                <img width="100" src={props.cartProduct.product.image} alt={props.cartProduct.product.title} />
                <div className="cart-product-details">
                    <h3>{props.cartProduct.product.title}</h3>
                    <p>
                        {formatPrice(props.cartProduct.product.price * props.cartProduct.quantity)}
                        {' - '}
                        <em>
                            {props.cartProduct.quantity} &times; {formatPrice(props.cartProduct.product.price)} each
                        </em>
                    </p>
                </div>
                <RemoveProductFromCartButton productId={props.cartProduct.product.id} />
            </CartProductStyle>
        );
    else
        return (
            <CartProductStyle>
                <div />
                <span>This product has been removed from the store.</span>
                <RemoveCartProductButton cartProductId={props.cartProduct.id} />
            </CartProductStyle>
        );
};

CartProduct.propTypes = {
    cartProduct: PropTypes.object.isRequired,
};

export default CartProduct;
