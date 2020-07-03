import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NeedsPermission from './NeedsPermission';
import { Query, Mutation } from 'react-apollo';
import { ALL_PERMISSIONS_QUERY, ALL_USERS_QUERY, USERS_PAGINATION_QUERY, UPDATE_USER_PERMISSIONS_MUTATION } from './AuthenticationOperationsGQL';
import { ErrorMessage } from '../message/Message';
import Pagination from '../pagination/Pagination';
import { Center } from '../theme/generalStyles';
import { PermissionsGrid, AdminView } from './styles';
import { perPage } from '../../config';

class UserPermissions extends Component {
    state = {
        id: this.props.user.id,
        permissions: this.props.user.permissions,
    }

    handlePermissionChange = (e) => {
        let updatedPermissions = [...this.state.permissions];
        if (e.target.checked)
            updatedPermissions.push(e.target.value);
        else
            updatedPermissions = updatedPermissions.filter(permission => (permission !== e.target.value));

        this.setState({ permissions: updatedPermissions });
    }

    updatePermissionAction = (e, updatePermissions) => {
        updatePermissions();
    }

    render() {
        const permissionsInputs = this.props.allPermissions.map(permObj => (<div key={`${this.props.user.id}-permission-${permObj.permission}`} className="perm">
            <label htmlFor={`${this.props.user.id}-permission-${permObj.permission}`}>
                <input id={`${this.props.user.id}-permission-${permObj.permission}`} type="checkbox" value={permObj.permission} checked={this.state.permissions.includes(permObj.permission)} onChange={this.handlePermissionChange} />
            </label>
        </div>));

        const permissionsRow = <Mutation mutation={UPDATE_USER_PERMISSIONS_MUTATION} variables={{ id: this.state.id, permissions: this.state.permissions }}>
            {(updatePermissions, payload) => (
                [permissionsInputs, <div key={this.props.user.id} className='perm'><button onClick={(e) => { this.updatePermissionAction(e, updatePermissions); }}>UPDAT{payload.loading ? 'ING' : 'E'}</button></div>]
            )}
        </Mutation>;

        return permissionsRow;
    }
}

class Permissions extends Component {
    state = {
        pagLoading: false,
    }

    setLoading = (pag, isLoading) => {
        if (this.state[pag] !== isLoading)
            this.setState({ [pag]: isLoading });
    };

    renderPermissionsGrid = (permissionsData, usersData) => {
        return <Center>
            <AdminView>
                <PermissionsGrid>
                    <div className="col-u"></div>
                    <div className="col-p">
                        <div className="perms">
                            {permissionsData.map(perm => (<div key={perm.id} className="perm">{perm.description}</div>))}
                            <div className="perm">
                                <p>UPDATE</p>
                            </div>
                        </div>
                    </div>
                    <div className="col col-u">
                        {usersData.map(user => (<div key={user.id} className="user">{user.name}</div>))}
                    </div>
                    <div className="col col-p">
                        {usersData.map(user => (<div key={user.id} className="perms"><UserPermissions key={user.id} allPermissions={permissionsData} user={user} /></div>))}
                    </div>
                </PermissionsGrid>
            </AdminView>
            <Pagination
                page={this.props.page}
                loading={{ event: this.setLoading, name: 'pagLoading' }}
                query={USERS_PAGINATION_QUERY}
                nameObjects='Users'
                pathname='permissions'
                connectionName='usersConnection'
            />
        </Center>;
    }

    render() {
        return (
            <NeedsPermission neededPermission={['ADMIN']} user={this.props.userData} showMessage={true} >
                <Query query={ALL_PERMISSIONS_QUERY}>
                    {({ data, loading, error }) => {
                        if (loading)
                            return <p>Loading permissions...</p>;
                        if (error)
                            return <ErrorMessage error={error} />;
                        if (data)
                            return (
                                <Query query={ALL_USERS_QUERY} variables={{
                                    skip: this.props.page * perPage - perPage,
                                    first: perPage
                                }}>
                                    {payload => {
                                        if (payload.loading)
                                            return <p>Loading users...</p>;
                                        if (payload.data)
                                            return this.renderPermissionsGrid(data.permissions, payload.data.users);
                                    }}
                                </Query>
                            );
                    }}
                </Query>
            </NeedsPermission>
        );
    }
}

UserPermissions.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        permissions: PropTypes.array,
    }),
    allPermissions: PropTypes.array,
};

Permissions.propTypes = {
    userData: PropTypes.number,
    page: PropTypes.number,
};

export default Permissions;
