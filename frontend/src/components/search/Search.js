import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { ApolloConsumer } from 'react-apollo';
import { DropDown, DropDownProduct, SearchArea } from './styles';
import { SEARCH_PRODUCTS_QUERY } from './SearchOperationsGQL';

export default class Search extends Component {
    state = {
        products: [],
        loading: false
    }

    search = debounce(async(searchTerm, apolloClient) => {
        const lowercased = searchTerm.toLowerCase();
        const res = await apolloClient.query({
            query: SEARCH_PRODUCTS_QUERY,
            variables: { searchTerm: lowercased }
        });
        this.setState({
            products: res.data.products,
            loading: false
        });
    }, 400);

    handleInputChange(e, apolloClient) {
        if (e.target.value === '' || e.target.value.length < 2)
            this.setState({
                products: [],
                loading: false
            });
        else {
            this.setState({
                loading: true
            });
            this.search(e.target.value, apolloClient);
        }
    }

    routeToProduct = (product) => {
        Router.push({
            pathname: '/product',
            query: {
                id: product.id,
            },
        });
    }

    render() {
        resetIdCounter();
        return (
            <SearchArea>
                <Downshift onChange={this.routeToProduct} itemToString={product => (product !== null ? product.title : '')}>
                    {downshift => (
                        <div>
                            <ApolloConsumer>
                                {client => (<input {...downshift.getInputProps({
                                    onChange: e => { e.persist(); this.handleInputChange(e, client); },
                                    placeholder: 'Search for products',
                                    type: 'search',
                                    id: 'search',
                                    className: this.state.loading ? 'loading' : '',
                                })
                                } />
                                )}
                            </ApolloConsumer>
                            {downshift.isOpen && (
                                <DropDown>
                                    {this.state.products.map((product, index) => (<DropDownProduct {...downshift.getItemProps({ item: product })} key={product.id} highlighted={index === downshift.highlightedIndex}>
                                        <img width="50" src={product.image} alt={product.title} />
                                        {product.title}
                                    </DropDownProduct>))}
                                    {this.state.products.length < 1 && downshift.inputValue.length > 1 && !this.state.loading && <DropDownProduct> Nothing Found for {downshift.inputValue} </DropDownProduct>}
                                </DropDown>
                            )}
                        </div>
                    )}
                </Downshift>
            </SearchArea>
        );
    }
}
