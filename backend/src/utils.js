function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.some(permissionTheyHave => permissionsNeeded.includes(permissionTheyHave));
    return matchedPermissions;
}

exports.hasPermission = hasPermission;