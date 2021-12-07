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
            website: state.website
        };
    },
    customerSettings: state => state.settings,
    customerPrograms: state => state.programs
};
