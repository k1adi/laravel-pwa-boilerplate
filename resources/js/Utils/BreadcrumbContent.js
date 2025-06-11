const dynamicBreadcrumb = (routeName, pageName) => {
    return [
        { link: route('dashboard'), text: 'Dashboard' },
        { link: route(routeName), text: pageName },
    ]
};

const dashboardBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' }
];

const databaseBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: '#', text: 'Database' },
];

const businessUnitBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: route('bus.index'), text: 'Business Unit' },
];

const authorizationBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: '#', text: 'Authorization' },
];

const userBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: route('users.index'), text: 'User' },
];

const roleBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: route('roles.index'), text: 'Role' },
];

const permissionBreadcrumb = [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: route('permissions.index'), text: 'Permission' },
];

export {
    dynamicBreadcrumb,
    dashboardBreadcrumb,
    databaseBreadcrumb,
    businessUnitBreadcrumb,
    authorizationBreadcrumb,
    userBreadcrumb,
    roleBreadcrumb,
    permissionBreadcrumb,
}