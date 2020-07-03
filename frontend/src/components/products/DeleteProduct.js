import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ALL_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from './ProductsOperationsGQL';
import { CURRENT_USER_QUERY } from '../authentication/AuthenticationOperationsGQL';

class DeleteProduct extends Component {
    updateCache = (cache, payload) => {
        // manually update the apollo cache on the client, so it matches the server
        // read cache for the products we want
        const data = cache.readQuery({ query: ALL_PRODUCTS_QUERY });
        // filter the deleted product
        data.products = data.products.filter(product => product.id !== payload.data.deleteProduct.id);
        cache.writeQuery({ query: ALL_PRODUCTS_QUERY, data });
    }

    deleteProductAction = (e, deleteProductMutation) => {
        let res = null;
        const confirmed = confirm('Are you sure you want to delete this product?');
        if (confirmed)
            res = deleteProductMutation();
        return res;
    }

    render() {
        return (
            <Mutation mutation={ DELETE_PRODUCT_MUTATION } variables={{ id: this.props.id }} refetchQueries={[{ query: CURRENT_USER_QUERY }, { query: ALL_PRODUCTS_QUERY }]} update={this.updateCache}>
                {(deleteProductMutation, payload) => (
                    // <ErrorMessage error={payload.error}></ErrorMessage>
                    <button onClick={ e => this.deleteProductAction(e, deleteProductMutation)}>
                        {this.props.children}
                    </button>
                )}
            </Mutation>
        );
    }
}

DeleteProduct.propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

export default DeleteProduct;
