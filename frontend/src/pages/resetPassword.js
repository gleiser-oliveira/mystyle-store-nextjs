import { Columns } from '../components/theme/generalStyles';
import ResetPassword from '../components/authentication/ResetPassword';

const ResetPasswordPage = props => (
    <Columns>
        <ResetPassword email={props.query.email} token={props.query.token} />
    </Columns>
);

export default ResetPasswordPage;
