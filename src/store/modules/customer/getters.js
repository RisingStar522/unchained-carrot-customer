export default {
    customerId: state => state.id,
    customerData: state => {
        return {
            id: state.id,
            organizationName: state.organizationName,
            contactPerson: state.contactPerson,
            country: state.country,
            vatNumber: state.vatNumber,
            companyRegistration: state.companyRegistration,
            website: state.website,
            startMode: state.startMode,
            allowedModes: state.allowedModes
        };
    },
    customerSettings: state => state.settings,
    customerPrograms: state => state.programs,
    customerWallets: state => state.wallets,
    customerDeposits: state => state.deposits,
    customerWithdrawals: state => state.withdrawals,
    customerEvents: state => state.events
};
