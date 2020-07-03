import CreateProduct from '../components/products/CreateProduct';
import NeedsLogin from '../components/authentication/NeedsLogin';

const Sell = props => (
    <div>
        <NeedsLogin>
            <CreateProduct/>
        </NeedsLogin>
    </div>
);

export default Sell;
