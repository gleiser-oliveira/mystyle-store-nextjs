import React from 'react';
import PropTypes from 'prop-types';

const NeedsPermission = props => {
    if (!props.user)
        return null;
    if (props.user.permissions.includes('ADMIN'))
        return props.children;
    const message = props.showMessage ? <div><p>You have no permission to access this resource.</p></div> : null;
    const fragment = ((!props.ownerId) || (props.ownerId === props.user.id)) && props.user.permissions.some(permission => props.neededPermission.includes(permission)) ? props.children : message;
    return fragment;
};

NeedsPermission.propTypes = {
    user: PropTypes.object,
    ownerId: PropTypes.string,
    neededPermission: PropTypes.array,
};

export default NeedsPermission;
