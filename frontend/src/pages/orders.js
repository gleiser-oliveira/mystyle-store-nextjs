import OrderList from '../components/order/OrderList';
import NeedsLogin from '../components/authentication/NeedsLogin';

const OrdersPage = props => (
    <NeedsLogin>
        <OrderList userData={props.userData} page={parseFloat(props.query.page) || 1}/>
    </NeedsLogin>
);

export default OrdersPage;
