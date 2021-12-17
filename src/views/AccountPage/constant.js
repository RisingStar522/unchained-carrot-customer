export const ACCOUNT_TYPE = {
    ORGANIZATION: 0,
    EMPLOYEES: 1,
    DATA_EXPORTS: 2,
    CERTIFICATES: 3,
    DOMAINS: 4,
    SUBSCRIPTIONS: 5,
    BILLING: 6
};

export const BUTTON_GROUP = [
    {
        id: ACCOUNT_TYPE.ORGANIZATION,
        title: 'Organization',
        isActive: true
    },
    { id: ACCOUNT_TYPE.EMPLOYEES, title: 'Employees', isActive: false },
    {
        id: ACCOUNT_TYPE.DATA_EXPORTS,
        title: 'Data Exports',
        isActive: false
    },
    {
        id: ACCOUNT_TYPE.CERTIFICATES,
        title: 'Certificates',
        isActive: false
    },
    { id: ACCOUNT_TYPE.DOMAINS, title: 'Domains', isActive: false },
    { id: ACCOUNT_TYPE.SUBSCRIPTIONS, title: 'Subscriptions', isActive: false },
    { id: ACCOUNT_TYPE.BILLING, title: 'Billing', isActive: false }
];

export const DOMAIN_MENU = {
    TRAFFIC_ROUTE: 0,
    LANDING_PAGE: 1,
    EMAIL: 2,
    REFERRED_BY_ME: 3,
    REVIEW_BY_ME: 4
};

export const ADD_CUSTOM_DOMAIN_STEP = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3
};
