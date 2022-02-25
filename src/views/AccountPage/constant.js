export const ACCOUNT_TYPE = {
    ORGANIZATION: 0,
    EMPLOYEES: 1,
    DATA_EXPORTS: 2,
    WALLET: 3,
    CERTIFICATES: 4,
    DOMAINS: 5,
    RESOURCES: 6,
    API_KEYS: 7,
    SUBSCRIPTIONS: 8,
    BILLING: 9
};

export const FORM_TYPE = {
    [ACCOUNT_TYPE.ORGANIZATION]: 'organization-form',
    [ACCOUNT_TYPE.EMPLOYEES]: 'employees-form',
    [ACCOUNT_TYPE.DATA_EXPORTS]: 'data-exports-form',
    [ACCOUNT_TYPE.CERTIFICATES]: 'certificates-form',
    [ACCOUNT_TYPE.WALLET]: 'wallet-form',
    [ACCOUNT_TYPE.DOMAINS]: 'domain-form',
    [ACCOUNT_TYPE.SUBSCRIPTIONS]: 'subscription-form',
    [ACCOUNT_TYPE.BILLING]: 'billing-form'
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
        id: ACCOUNT_TYPE.WALLET,
        title: 'Wallets',
        isActive: false
    },
    {
        id: ACCOUNT_TYPE.CERTIFICATES,
        title: 'Certificates',
        isActive: false
    },
    { id: ACCOUNT_TYPE.DOMAINS, title: 'Domains', isActive: false },
    { id: ACCOUNT_TYPE.RESOURCES, title: 'Resources', isActive: false },
    { id: ACCOUNT_TYPE.API_KEYS, title: 'API keys', isActive: false },
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

export const DOMAIN_MENU_TEXT = {
    [DOMAIN_MENU.TRAFFIC_ROUTE]: 'Traffic Route',
    [DOMAIN_MENU.LANDING_PAGE]: 'Landing Page',
    [DOMAIN_MENU.EMAIL]: 'Email',
    [DOMAIN_MENU.REFERRED_BY_ME]: 'Refferred By Me',
    [DOMAIN_MENU.REVIEW_BY_ME]: 'Review By Me'
};

export const ADD_CUSTOM_DOMAIN_STEP = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3
};
