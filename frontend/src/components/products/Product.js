import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import Image from '../image/Image';
import { PriceTag, ProductStyle, Title } from './styles';
import { formatPrice } from '../../lib/cartHelper';
import DeleteProduct from './DeleteProduct';
import NeedsPermission from '../authentication/NeedsPermission';
import AddToCartButton from '../cart/AddToCartButton';

class Product extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
    };

    render() {
        const { product } = this.props;
        const titleHref = { pathname: '/product', query: { id: product.id } };
        const editHref = { pathname: '/update', query: { id: product.id } };
        const user = this.props.userData ? this.props.userData : null;
        return (
            <ProductStyle>
                {product.image ? <Image src={product.image} alt={product.title} /> : null}
                <Title>
                    <Link href={titleHref}>
                        <a>{product.title}</a>
                    </Link>
                </Title>
                <PriceTag>{formatPrice(product.price)}</PriceTag>
                <p>{product.description}</p>
                <div className='buttonList'>
                    <NeedsPermission ownerId={product.user.id} neededPermission={['ADMIN', 'PRODUCT_UPDATE']} user={user} showMessage={false}>
                        <Link href={editHref}>
                            <a>{'\u270F'} Edit</a>
                        </Link>
                    </NeedsPermission>
                    <AddToCartButton productId={product.id} />
                    <NeedsPermission ownerId={product.user.id} neededPermission={['ADMIN', 'PRODUCT_DELETE']} user={user} showMessage={false}>
                        <DeleteProduct id={product.id}>{'\u{1F4A5}'} Delete This Product</DeleteProduct>
                    </NeedsPermission>
                </div>
            </ProductStyle>
        );
    }
}

Product.propTypes = {
    userData: PropTypes.object,
};

export default Product;
