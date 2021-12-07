/* ============
 * Webhooks Module
 * ============
 */
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        allIncomingWebhooks: [],
        allOutgoingWebhooks: [],
        incomingWebhook: {},
        outgoingWebhook: {}
    },
    getters,
    actions,
    mutations
};
