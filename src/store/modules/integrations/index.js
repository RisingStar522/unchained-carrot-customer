/* ============
 * Integrations Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        QUICKSIGHT: {},
        SEGMENT: {},
        WOOCOMMERCE: {},
        BRICKLINK: {},
        MAILCHIMP: {},
        MANDRILL: {},
        CALENDLY: {},
        ZOOM: {},
        all: [
            'SEGMENT',
            'COUNTR',
            'LIGHTSPEED',
            'MAILCHIMP',
            'MANDRILL',
            'QUICKSIGHT',
            'WOOCOMMERCE',
            'BRICKLINK',
            'CALENDLY',
            'ZOOM'
        ],
        active: []
    },
    actions,
    getters,
    mutations
};
