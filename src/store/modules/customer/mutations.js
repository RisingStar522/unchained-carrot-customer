export default {
    SET_CUSTOMER(state, data) {
        state.id = data._id;
        state.organizationName = data.organizationName;
        state.contactPerson = data.contactPerson;
        state.country = data.country;
        state.vatNumber = data.vatNumber;
        state.companyRegistration = data.companyRegistration;
        state.website = data.website;
    },

    SET_CUSTOMER_PROGRAMS(state, data) {
        state.programs = data;
    },
    SET_CUSTOMER_SETTINGS(state, data) {
        state.settings = data;
    }
};
