import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import { CREATE_PRODUCT_MUTATION, ALL_PRODUCTS_QUERY } from './ProductsOperationsGQL';
import { Form } from '../theme/generalStyles';
import { ErrorMessage } from '../message/Message';

export default class CreateProduct extends Component {
    state = {
        title: '',
        description: '',
        price: 0,
        image: '',
        largeImage: ''
    };

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    handleSubmit = async(e, createProduct) => {
        e.preventDefault();
        const res = await createProduct();
        Router.push({
            pathname: '/product',
            query: { id: res.data.createProduct.id }
        });
    };

    uploadImage = async(e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'my-style');
        const res = await fetch('https://api.cloudinary.com/v1_1/go-medias/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
    };

    render() {
        return (
            <Mutation mutation={CREATE_PRODUCT_MUTATION} variables={this.state} refetchQueries={[{ query: ALL_PRODUCTS_QUERY }]}>
                {(createProduct, payload) => (
                    <Form onSubmit={async e => { this.handleSubmit(e, createProduct); }}>
                        {payload.error ? <ErrorMessage error={payload.error} /> : null}
                        <fieldset disabled={payload.loading} aria-busy={payload.loading}>
                            <label htmlFor='title'>
                                Title
                                <input
                                    type='text'
                                    id='title'
                                    name='title'
                                    placeholder='Title'
                                    required
                                    value={this.state.title}
                                    onChange={this.handleChange}/>
                            </label>
                            <label htmlFor='title'>
                                Price
                                <input
                                    type='number'
                                    id='price'
                                    name='price'
                                    placeholder='Price'
                                    required
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor='title'>
                                Description
                                <textarea
                                    type='text'
                                    id='description'
                                    name='description'
                                    placeholder='Enter a Description'
                                    required
                                    value={this.state.description}
                                    onChange={this.handleChange}/>
                            </label>
                            <label htmlFor='file'>
                                Image
                                <input
                                    type='file'
                                    id='file'
                                    name='file'
                                    placeholder='Upload Image'
                                    onChange={this.uploadImage}/>
                                {this.state.image && <img width='200px' src={this.state.image} alt='Upload Preview' />}
                            </label>
                            <button type='submit'>Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}
