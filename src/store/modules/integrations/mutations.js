export default {
    SET_CUSTOMER_QUICKSIGHT_INTEGRATION(state, data) {
        state.QUICKSIGHT = data;
    },
    SET_CUSTOMER_SEGMENT_INTEGRATION(state, data) {
        state.SEGMENT = data;
    },
    SET_CUSTOMER_WOOCOMMERCE_INTEGRATION(state, data) {
        state.WOOCOMMERCE = data;
    },
    SET_CUSTOMER_BRICKLINK_INTEGRATION(state, data) {
        state.BRICKLINK = data;
    },
    SET_CUSTOMER_MAILCHIMP_INTEGRATION(state, data) {
        state.MAILCHIMP = data;
    },
    SET_CUSTOMER_MANDRILL_INTEGRATION(state, data) {
        state.MANDRILL = data;
    },
    SET_CUSTOMER_CALENDLY_INTEGRATION(state, data) {
        state.CALENDLY = data;
    },
    SET_CUSTOMER_ZOOM_INTEGRATION(state, data) {
        state.ZOOM = data;
    },
    SET_CUSTOMER_INTEGRATIONS(state, data) {
        state.all = data;
    },
    SET_CUSTOMER_ACTIVE_INTEGRATIONS(state, data) {
        state.active = data;
    },
    DELETE_CUSTOMER_SEGMENT_INTEGRATION(state) {
        state.SEGMENT = {};
        state = state.active.filter(e => e.externalSystem !== 'SEGMENT');
    },
    DELETE_CUSTOMER_WOOCOMMERCE_INTEGRATION(state) {
        state.WOOCOMMERCE = {};
        state = state.active.filter(e => e.externalSystem !== 'WOOCOMMERCE');
    },
    DELETE_CUSTOMER_BRICKLINK_INTEGRATION(state) {
        state.BRICKLINK = {};
        state = state.active.filter(e => e.externalSystem !== 'BRICKLINK');
    },
    DELETE_CUSTOMER_MAILCHIMP_INTEGRATION(state) {
        state.MAILCHIMP = {};
        state = state.active.filter(e => e.externalSystem !== 'MAILCHIMP');
    },
    DELETE_CUSTOMER_MANDRILL_INTEGRATION(state) {
        state.MANDRILL = {};
        state = state.active.filter(e => e.externalSystem !== 'MANDRILL');
    },
    DELETE_CUSTOMER_CALENDLY_INTEGRATION(state) {
        state.CALENDLY = {};
        state = state.active.filter(e => e.externalSystem !== 'CALENDLY');
    },
    DELETE_CUSTOMER_ZOOM_INTEGRATION(state) {
        state.ZOOM = {};
        state = state.active.filter(e => e.externalSystem !== 'ZOOM');
    },
    DELETE_CUSTOMER_QUICKSIGHT_INTEGRATION(state) {
        state.QUICKSIGHT = {};
        state = state.active.filter(e => e.externalSystem !== 'QUICKSIGHT');
    }
};
