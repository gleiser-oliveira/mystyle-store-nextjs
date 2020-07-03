import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { USER_ORDERS_QUERY, USER_ORDERS_PAGINATION_QUERY } from './OrderOperationsGQL';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import Pagination from '../pagination/Pagination';
import Loader from 'react-loader-spinner';
import { formatPrice } from '../../lib/cartHelper';
import { ErrorMessage } from '../message/Message';
import { Center } from '../theme/generalStyles';
import { OrderItemStyle, OrderListStyle } from './styles';
import { perPage } from '../../config';

class OrderList extends Component {
    state = {
        pagLoading1: false,
        pagLoading2: false,
    };

    setLoading = (pag, isLoading) => {
        if (this.state[pag] !== isLoading)
            this.setState({ [pag]: isLoading });
    };

    renderImgGrid(products) {
        let grid = products;
        let overflow = null;
        if (products.length > 7) {
            grid = products.slice(0, 7);
            overflow = <div className="order-meta"><span>...</span></div>;
        }

        const imgs = grid.map(product => <img key={product.id} src={product.image} alt={product.title} />);

        return (
            <>
                {imgs}
                {overflow}
            </>
        );
    };

    render() {
        return (
            <>
                <Center>
                    <Pagination
                        page={this.props.page}
                        loading={{ event: this.setLoading, name: 'pagLoading1' }}
                        query={USER_ORDERS_PAGINATION_QUERY}
                        variables={{ userId: this.props.userData.id }}
                        nameObjects='Orders'
                        pathname='orders'
                        connectionName='ordersConnection'
                    />
                </Center>
                <Query query={USER_ORDERS_QUERY} variables={{
                    skip: this.props.page * perPage - perPage,
                    first: perPage
                }}>
                    {(payload) => {
                        if (payload.loading || this.state.pagLoading1 || this.state.pagLoading2)
                            return (
                                <Center>
                                    <Loader type="TailSpin" visible={true} />
                                </Center>
                            );
                        if (payload.error)
                            return (
                                <Center>
                                    <ErrorMessage error={payload.error} />
                                </Center>
                            );
                        return (
                            <Center>
                                <OrderListStyle>
                                    {payload.data.orders.length < 1 && <Center><p>No orders were found.</p></Center>}
                                    {payload.data.orders.map(order => (
                                        <OrderItemStyle key={order.id}>
                                            <Link
                                                href={{
                                                    pathname: '/order',
                                                    query: { id: order.id },
                                                }}
                                            >
                                                <a>
                                                    <div className="order-meta">
                                                        <p>{order.products.reduce((a, b) => a + b.quantity, 0)} Items</p>
                                                        <p>{order.products.length} Products</p>
                                                        <p>{formatDistance(new Date(order.createdAt), new Date())}</p>
                                                        <p>{formatPrice(order.total)}</p>
                                                    </div>
                                                    <div className="images">
                                                        {this.renderImgGrid(order.products)}
                                                    </div>
                                                </a>
                                            </Link>
                                        </OrderItemStyle>
                                    ))}
                                </OrderListStyle>
                            </Center>
                        );
                    }}
                </Query>
                <Center>
                    <Pagination
                        page={this.props.page}
                        loading={{ event: this.setLoading, name: 'pagLoading2' }}
                        query={USER_ORDERS_PAGINATION_QUERY}
                        variables={{ userId: this.props.userData.id }}
                        nameObjects='Orders'
                        pathname='orders'
                        connectionName='ordersConnection'
                    />
                </Center>
            </>
        );
    }
}

OrderList.propTypes = {
    page: PropTypes.number,
    userData: PropTypes.shape({
        id: PropTypes.string,
    }),
};

export default OrderList;
