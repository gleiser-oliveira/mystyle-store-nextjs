import UpdateProduct from '../components/products/UpdateProduct';

const Update = props => (
    <div>
        <UpdateProduct id={props.query.id} />
    </div>
);

export default Update;
