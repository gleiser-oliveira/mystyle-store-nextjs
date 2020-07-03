import Products from '../components/products/Products';

const Home = props => (
    <Products userData={props.userData} page={parseFloat(props.query.page) || 1}/>
);

export default Home;
