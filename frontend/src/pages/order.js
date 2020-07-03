import Order from '../components/order/Order';
import NeedsLogin from '../components/authentication/NeedsLogin';

const OrderPage = props => (
    <div>
        <NeedsLogin>
            <Order id={props.query.id}/>
        </NeedsLogin>
    </div>
);

export default OrderPage;
