import { Columns } from '../components/theme/generalStyles';
import Permissions from '../components/authentication/Permissions';

const PermissionsPage = props => (
    <Columns>
        <Permissions userData={props.userData} page={parseFloat(props.query.page) || 1}/>
    </Columns>
);

export default PermissionsPage;
