import { Columns } from '../components/theme/generalStyles';
import Signup from '../components/authentication/Signup';
import Signin from '../components/authentication/Signin';

const SignupPage = props => (
    <Columns>
        <Signup />
        <Signin />
    </Columns>
);

export default SignupPage;
