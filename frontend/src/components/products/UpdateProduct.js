import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../authentication/User';
import { Mutation, Query } from 'react-apollo';
import Loader from 'react-loader-spinner';
import { SINGLE_PRODUCT_QUERY, UPDATE_PRODUCT_MUTATION, ALL_PRODUCTS_QUERY } from './ProductsOperationsGQL';
import { Form } from '../theme/generalStyles';
import { ErrorMessage } from '../message/Message';

class UpdateProduct extends Component {
    state = {};

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    updateProductAction = async(e, updateProductMutation) => {
        e.preventDefault();
        await updateProductMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });
    };

    renderUpdateArea(userId) {
        return (
            <Query query={SINGLE_PRODUCT_QUERY} variables={{ id: this.props.id }}>
                {(queryPayload) => {
                    if (queryPayload.loading)
                        return <Loader type="TailSpin" visible={true} />;
                    if (queryPayload.error)
                        return <ErrorMessage error={queryPayload.error} />;
                    if (!queryPayload.data.product)
                        return <ErrorMessage error={{ message: `No Product Found for ID ${this.props.id}` }} />;
                    if (queryPayload.data.product.user.id !== userId)
                        return <ErrorMessage error={{ message: 'You are not allowed to edit this item.' }} />;
                    return (
                        <Mutation
                            mutation={UPDATE_PRODUCT_MUTATION}
                            variables={this.state}
                            refetchQueries={[
                                { query: SINGLE_PRODUCT_QUERY, variables: { id: this.props.id } },
                                { query: ALL_PRODUCTS_QUERY },
                            ]}
                        >
                            {(updateProductMutation, mutationPayload) => (
                                <Form onSubmit={async e => { this.updateProductAction(e, updateProductMutation); }}>
                                    <ErrorMessage error={mutationPayload.error}></ErrorMessage>
                                    <fieldset disabled={mutationPayload.loading} aria-busy={mutationPayload.loading}>
                                        <label htmlFor='title'>
                                            Title
                                            <input
                                                type='text'
                                                id='title'
                                                name='title'
                                                placeholder='Title'
                                                required
                                                defaultValue={queryPayload.data.product.title}
                                                onChange={this.handleChange} />
                                        </label>
                                        <label htmlFor='title'>
                                            Price
                                            <input
                                                type='number'
                                                id='price'
                                                name='price'
                                                placeholder='Price'
                                                required
                                                defaultValue={queryPayload.data.product.price}
                                                onChange={this.handleChange} />
                                        </label>
                                        <label htmlFor='title'>
                                            Description
                                            <textarea
                                                type='text'
                                                id='description'
                                                name='description'
                                                placeholder='Enter a Description'
                                                required
                                                defaultValue={queryPayload.data.product.description}
                                                onChange={this.handleChange} />
                                        </label>
                                        <button type='submit'>Sav{mutationPayload.loading ? 'ing' : 'e'} Changes</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

    render() {
        return (
            <User>
                {payload => (
                    payload.data.me ? this.renderUpdateArea(payload.data.me.id) : <div> <p>You need to sign in to access this resource.</p> </div>
                )}
            </User>

        );
    }
}

UpdateProduct.propTypes = {
    id: PropTypes.string,
};

export default UpdateProduct;
