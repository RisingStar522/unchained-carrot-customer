export const walletField = [
    {
        key: 'usage',
        sortable: false,
        label: 'USAGE'
    },
    {
        key: 'KeyId',
        sortable: false,
        label: 'KEY'
    },
    {
        key: 'address',
        sortable: false,
        label: 'ADDRESS'
    },
    {
        key: 'nonces.onChain',
        sortable: false,
        label: 'ON CHAIN NONCE'
    },
    {
        key: 'nonces.inCache',
        sortable: false,
        label: 'IN CACHE NONCE'
    },
    {
        key: 'action',
        sortable: false,
        label: ''
    }
];

export const depositField = [
    {
        key: 'to',
        sortable: false,
        label: 'TO'
    },
    {
        key: 'currency',
        sortable: false,
        label: 'USD'
    },
    {
        key: 'amount',
        sortable: false,
        label: 'AMOUNT'
    },
    {
        key: 'token',
        sortable: false,
        label: 'TOKEN'
    },
    {
        key: 'amount2',
        sortable: false,
        label: 'AMOUNT'
    },
    {
        key: 'status',
        sortable: false,
        label: 'STATUS'
    },
    {
        key: 'updatedOn',
        sortable: false,
        label: 'UPDATED ON'
    },
    {
        key: 'action',
        sortable: false,
        label: ''
    }
];

export const withdrawalField = [
    {
        key: 'from',
        sortable: false,
        label: 'FROM'
    },
    {
        key: 'currency',
        sortable: false,
        label: 'USD'
    },
    {
        key: 'amount',
        sortable: false,
        label: 'AMOUNT'
    },
    {
        key: 'token',
        sortable: false,
        label: 'TOKEN'
    },
    {
        key: 'amount2',
        sortable: false,
        label: 'AMOUNT 2'
    },
    {
        key: 'status',
        sortable: false,
        label: 'STATUS'
    },
    {
        key: 'updatedOn',
        sortable: false,
        label: 'UPDATED ON'
    },
    {
        key: 'action',
        sortable: false,
        label: ''
    }
];

export const eventField = [
    {
        key: 'key',
        sortable: false,
        label: 'KEY'
    },
    {
        key: 'value',
        sortable: false,
        label: 'VALUE'
    }
];

export const EVENT_TYPE = {
    CONFIRMED: 0,
    EXPIRED: 1,
    CANCELED: 2,
    FAILED: 3
};

export const EVENT_MENU = [
    {
        id: EVENT_TYPE.CONFIRMED,
        title: 'Confirmed',
        isActive: true
    },
    {
        id: EVENT_TYPE.EXPIRED,
        title: 'Expired',
        isActive: false
    },
    {
        id: EVENT_TYPE.CANCELED,
        title: 'Canceled',
        isActive: false
    },
    {
        id: EVENT_TYPE.FAILED,
        title: 'Failed',
        isActive: false
    }
];

export const orderByPaymentToOptions = [
    {
        value: 'to',
        text: 'TO'
    },
    {
        value: 'currency',
        text: 'CURRENCY'
    },
    {
        value: 'amount',
        text: 'AMOUNT'
    },
    {
        value: 'token',
        text: 'TOKEN'
    },
    {
        value: 'amount2',
        text: 'AMOUNT2'
    },
    {
        value: 'status',
        text: 'STATUS'
    },
    {
        value: 'updatedOn',
        text: 'UPDATED ON'
    }
];

export const filterByPaymentToOptions = [
    {
        value: 'to',
        text: 'TO'
    },
    {
        value: 'currency',
        text: 'CURRENCY'
    },
    {
        value: 'amount',
        text: 'AMOUNT'
    },
    {
        value: 'token',
        text: 'TOKEN'
    },
    {
        value: 'amount2',
        text: 'AMOUNT2'
    },
    {
        value: 'status',
        text: 'STATUS'
    },
    {
        value: 'updatedOn',
        text: 'UPDATED ON'
    }
];

export const orderByPaymentFromOptions = [
    {
        value: 'from',
        text: 'FROM'
    },
    {
        value: 'currency',
        text: 'CURRENCY'
    },
    {
        value: 'amount',
        text: 'AMOUNT'
    },
    {
        value: 'token',
        text: 'TOKEN'
    },
    {
        value: 'amount2',
        text: 'AMOUNT2'
    },
    {
        value: 'status',
        text: 'STATUS'
    },
    {
        value: 'updatedOn',
        text: 'UPDATED ON'
    }
];

export const filterByPaymentFromOptions = [
    {
        value: 'from',
        text: 'FROM'
    },
    {
        value: 'currency',
        text: 'CURRENCY'
    },
    {
        value: 'amount',
        text: 'AMOUNT'
    },
    {
        value: 'token',
        text: 'TOKEN'
    },
    {
        value: 'amount2',
        text: 'AMOUNT2'
    },
    {
        value: 'status',
        text: 'STATUS'
    },
    {
        value: 'updatedOn',
        text: 'UPDATED ON'
    }
];

export const orderByOptions = [
    {
        value: 'dataSource',
        text: 'Data Source'
    },
    {
        value: 'dataSet',
        text: 'Data Set'
    },
    {
        value: 'fileType',
        text: 'File Type'
    },
    {
        value: 'ipAddress',
        text: 'IP Address'
    },
    {
        value: 'emailAddress',
        text: 'Email Address'
    },
    {
        value: 'requestDate',
        text: 'Request Date'
    },
    {
        value: 'status',
        text: 'Status'
    }
];

export const optionsBoxPayment = [
    { text: 'notSeen', value: 'Not Seen' },
    { text: 'pending', value: 'Pending' },
    { text: 'confirmed', value: 'Confirmed' },
    { text: 'cancelled', value: 'Cancelled' },
    { text: 'expired', value: 'Expired' }
];
