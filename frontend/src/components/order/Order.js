import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Query } from 'react-apollo';
import { SINGLE_ORDER_QUERY } from './OrderOperationsGQL';
import { format } from 'date-fns';
import Head from 'next/head';
import { formatPrice } from '../../lib/cartHelper';
import { ErrorMessage } from '../message/Message';
import { Center } from '../theme/generalStyles';
import { OrderStyle } from './styles';

export default class Order extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    render() {
        return (
            <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
                {payload => {
                    if (payload.error)
                        return <ErrorMessage error={payload.error} />;
                    if (payload.loading)
                        return (
                            <Center>
                                <Loader type="TailSpin" visible={true} />
                            </Center>
                        );
                    const order = payload.data.order;
                    return (
                        <OrderStyle data-test='order'>
                            <Head>
                                <title>Sick Fits - Order {order.id}</title>
                            </Head>
                            <p>
                                <span>Order ID:</span>
                                <span>{this.props.id}</span>
                            </p>
                            <p>
                                <span>Charge</span>
                                <span>{order.charge}</span>
                            </p>
                            <p>
                                <span>Date</span>
                                <span>{format(new Date(order.createdAt), 'MMMM d, yyyy hh:mm:ss')}</span>
                            </p>
                            <p>
                                <span>Order Total</span>
                                <span>{formatPrice(order.total)}</span>
                            </p>
                            <p>
                                <span>Item Count</span>
                                <span>{order.products.length}</span>
                            </p>
                            <div className="items">
                                {order.products.map(product => (
                                    <div className="order-item" key={product.id}>
                                        <img src={product.image} alt={product.title} />
                                        <div className="item-details">
                                            <h2>{product.title}</h2>
                                            <p>Qty: {product.quantity}</p>
                                            <p>Each: {formatPrice(product.price)}</p>
                                            <p>SubTotal: {formatPrice(product.price * product.quantity)}</p>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </OrderStyle>
                    );
                }}
            </Query>
        );
    }
}
