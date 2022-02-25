import Vue from 'vue';

export default {
    ADD_INCOMINGWEBHOOK(state, data) {
        Vue.set(
            state.incomingWebhook,
            data.incomingWebhook.eventTrackerId,
            data.incomingWebhook
        );
        state.allIncomingWebhooks.push(data.listItem);
    },

    ADD_OUTGOINGWEBHOOK(state, data) {
        Vue.set(
            state.outgoingWebhook,
            data.outgoingWebhook.subscriptionKey,
            data.outgoingWebhook
        );
        state.allOutgoingWebhooks.push(data.listItem);
    },

    UPDATE_INCOMINGWEBHOOK(state, data) {
        Vue.set(
            state.incomingWebhook,
            data.incomingWebhook.eventTrackerId,
            data.incomingWebhook
        );
        for (let i in state.allIncomingWebhooks) {
            if (
                state.allIncomingWebhooks[i].eventTrackerId ===
                data.listItem.eventTrackerId
            ) {
                Vue.set(state.allIncomingWebhooks, i, data.listItem);
                break;
            }
        }
    },

    UPDATE_OUTGOINGWEBHOOK(state, data) {
        Vue.set(
            state.outgoingWebhook,
            data.outgoingWebhook.subscriptionKey,
            data.outgoingWebhook
        );
        for (let i in state.allOutgoingWebhooks) {
            if (
                state.allOutgoingWebhooks[i].subscriptionKey ===
                data.listItem.subscriptionKey
            ) {
                Vue.set(state.allOutgoingWebhooks, i, data.listItem);
                break;
            }
        }
    },

    SET_INCOMINGWEBHOOK(state, data) {
        state.incomingWebhook = data;
    },
    SET_ALL_INCOMINGWEBHOOKS(state, data) {
        state.allIncomingWebhooks = data;
    },
    REMOVE_INCOMINGWEBHOOK(state, id) {
        state.allIncomingWebhooks[0] = state.allIncomingWebhooks[0].filter(
            item => item.eventTrackerId !== id
        );
    },

    SET_OUTGOINGWEBHOOK(state, data) {
        state.outgoingWebhook = data;
    },
    SET_ALL_OUTGOINGWEBHOOKS(state, data) {
        state.allOutgoingWebhooks = data;
    },
    REMOVE_OUTGOINGWEBHOOK(state, id) {
        state.allOutgoingWebhooks[0] = state.allOutgoingWebhooks[0].filter(
            item => item.subscriptionKey !== id
        );
    }
};
