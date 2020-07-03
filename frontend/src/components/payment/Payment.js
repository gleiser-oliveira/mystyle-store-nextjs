import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import User from '../authentication/User';
import { calcTotalCartPrice, numberOfProducts } from '../../lib/cartHelper';
import { CREATE_ORDER_MUTATION } from './PaymentOperationsGQL';
import { CURRENT_USER_QUERY } from '../authentication/AuthenticationOperationsGQL';
import { USER_ORDERS_QUERY } from '../order/OrderOperationsGQL';

class Payment extends Component {
    onTokenReceived = async(token, createOrder) => {
        NProgress.start();
        const order = await createOrder({
            variables: { token: token.id }
        }).catch(err => {
            alert(err.message);
        });
        Router.push({
            pathname: '/order',
            query: { id: order.data.createOrder.id },
        });
    }

    render() {
        return (
            <User>
                {userPayload => (!userPayload.loading &&
                    <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }, { query: USER_ORDERS_QUERY }]}>
                        {(createOrder, payload) => (
                            <StripeCheckout
                                amount={calcTotalCartPrice(userPayload.data.me.cart)}
                                name='My Style Webstore'
                                description={`Order of ${numberOfProducts(userPayload.data.me.cart)} product${numberOfProducts(userPayload.data.me.cart) > 1 ? 's' : ''}.`}
                                image={userPayload.data.me.cart[0] && userPayload.data.me.cart[0].product ? userPayload.data.me.cart[0].product.image : null}
                                stripeKey='pk_test_jlDTuEyi02e2uNfoxmBbsqzP00tkeTMj4u'
                                currency='USD'
                                email={userPayload.data.me.email}
                                billingAddress={true}
                                token={token => this.onTokenReceived(token, createOrder)}
                            >
                                {this.props.children}
                            </StripeCheckout>
                        )}
                    </Mutation>
                )}
            </User>
        );
    }
}

Payment.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default Payment;
