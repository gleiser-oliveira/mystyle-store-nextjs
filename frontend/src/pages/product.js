import ProductExtendedView from '../components/products/ProductExtendedView';

const Product = props => {
    return (
        <div>
            <ProductExtendedView id={props.query.id}/>
        </div>
    );
};

export default Product;
