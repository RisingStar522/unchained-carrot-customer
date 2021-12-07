export default {
    segmentIntegration: state => state.SEGMENT,
    quicksightIntegration: state => state.QUICKSIGHT,
    wooIntegration: state => state.WOOCOMMERCE,
    bricklinkIntegration: state => state.BRICKLINK,
    mailchimpIntegration: state => state.MAILCHIMP,
    mandrillIntegration: state => state.MANDRILL,
    calendlyIntegration: state => state.CALENDLY,
    zoomIntegration: state => state.ZOOM,
    allIntegrations: state => state.all,
    activeIntegrations: state => state.active
};
