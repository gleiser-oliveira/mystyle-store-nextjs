import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Loader from 'react-loader-spinner';
import Head from 'next/head';
import AddToCartButton from '../cart/AddToCartButton';
import Image from '../image/Image';
import ErrorMessage from '../error/ErrorMessage';
import { Center } from '../theme/generalStyles';
import { formatPrice } from '../../lib/cartHelper';
import { SINGLE_PRODUCT_QUERY } from './ProductsOperationsGQL';
import { ProductExtendedViewStyle, PriceTag } from './styles';

class ProductExtendedView extends Component {
    render() {
        return (
            <Query query={ SINGLE_PRODUCT_QUERY } variables={{ id: this.props.id }}>
                {(payload) => {
                    if (payload.error)
                        return (
                            <Center>
                                <ErrorMessage error={payload.error} />
                            </Center>
                        );
                    if (payload.loading)
                        return (
                            <ProductExtendedViewStyle>
                                <div className='cell'>
                                    <Center>
                                        <Loader type="TailSpin" visible={true} />
                                    </Center>
                                </div>
                            </ProductExtendedViewStyle>
                        );
                    if (!payload.data || !payload.data.product)
                        return (
                            <Center>
                                <p>No Product Found for {this.props.id}</p>
                            </Center>
                        );
                    const product = payload.data.product;
                    return (
                        <ProductExtendedViewStyle>
                            <Head>
                                <title>My Style | {product.title}</title>
                            </Head>
                            <div>
                                <div className='cell'>
                                    <div className='relative'>
                                        <PriceTag>{formatPrice(product.price)}</PriceTag>
                                        <Image src={product.largeImage} alt={product.title} />
                                        {/* <img src={product.largeImage} alt={product.title} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="details">
                                <h2>Viewing: {product.title}</h2>
                                <div>
                                    <h3>About this product:</h3>
                                    <p>{product.description}</p>
                                </div>
                                <AddToCartButton productId={this.props.id}/>
                            </div>
                        </ProductExtendedViewStyle>
                    );
                }}
            </Query>
        );
    }
}

ProductExtendedView.propTypes = {
    id: PropTypes.string,
};

export default ProductExtendedView;
