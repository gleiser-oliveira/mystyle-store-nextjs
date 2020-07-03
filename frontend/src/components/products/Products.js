import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ALL_PRODUCTS_QUERY, PRODUCTS_PAGINATION_QUERY } from './ProductsOperationsGQL';
import { Center } from '../theme/generalStyles';
import { ProductsList } from './styles';
import Product from './Product';
import Pagination from '../pagination/Pagination';
import Loader from 'react-loader-spinner';
import { perPage } from '../../config';

class Products extends Component {
    state = {
        pagLoading1: false,
        pagLoading2: false,
    };

    setLoading = (pag, isLoading) => {
        if (this.state[pag] !== isLoading)
            this.setState({ [pag]: isLoading });
    };

    render() {
        const event1 = (pag, isLoading) => {
            this.setLoading(pag, isLoading);
        };
        return (
            <>
                <Center>
                    <Pagination loading={{ event: event1, name: 'pagLoading1' }} page={this.props.page} query={PRODUCTS_PAGINATION_QUERY} nameObjects='Products' pathname='products' connectionName='productsConnection' />
                </Center>
                <Query query={ALL_PRODUCTS_QUERY} variables={{
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
                                    <p>Error: {payload.error.message}</p>
                                </Center>
                            );
                        if (payload.data.products.length < 1)
                            return (
                                <Center>
                                    <p>No products were found.</p>
                                </Center>
                            );
                        return <ProductsList>
                            {payload.data.products.map(product => <Product key={product.id} product={product} userData={this.props.userData}></Product>)}
                        </ProductsList>;
                    }}
                </Query>
                <Center>
                    <Pagination loading={{ event: event1, name: 'pagLoading2' }} page={this.props.page} query={PRODUCTS_PAGINATION_QUERY} nameObjects='Products' pathname='products' connectionName='productsConnection' />
                </Center>
            </>
        );
    }
};

Products.propTypes = {
    page: PropTypes.number,
    userData: PropTypes.object,
};

export default Products;
