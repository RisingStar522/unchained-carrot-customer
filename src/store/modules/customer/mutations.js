export default {
    SET_CUSTOMER(state, data) {
        state.id = data._id;
        state.organizationName = data.organizationName;
        state.contactPerson = data.contactPerson;
        state.country = data.country;
        state.vatNumber = data.vatNumber;
        state.companyRegistration = data.companyRegistration;
        state.website = data.website;
        state.startMode = data.startMode;
        state.allowedModes = data.allowedModes;
    },

    SET_CUSTOMER_PROGRAMS(state, data) {
        state.programs = data;
    },
    SET_CUSTOMER_SETTINGS(state, data) {
        state.settings = data;
    },
    SET_CUSTOMER_WALLETS(state, data) {
        state.wallets = data
    },
    SET_CUSTOMER_DEPOSITS(state, data) {
        state.deposits = data
    },
    SET_CUSTOMER_WITHDRAWALS(state, data) {
        state.deposits = data
    },
    SET_CUSTOMER_EVENTS(state, data) {
        state.events = data
    }
};
