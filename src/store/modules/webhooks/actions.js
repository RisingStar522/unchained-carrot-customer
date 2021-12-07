import Vue from 'vue';
import IncomingWebhooksAPI from '../../../api/IncomingWebhooksAPI';
import OutgoingWebhooksAPI from '../../../api/OutgoingWebhooksAPI';
import IncomingWebhooksTransformer from '../../../transformers/IncomingWebhooksTransformer';
import OutgoingWebhooksTransformer from '../../../transformers/OutgoingWebhooksTransformer';

export default {
    getIncomingWebhooks({ commit }) {
        new IncomingWebhooksAPI().getIncomingWebhooks({}).then(response => {
            commit('SET_ALL_INCOMINGWEBHOOKS', [
                IncomingWebhooksTransformer.fetchList(response.result)
            ]);
        });
    },

    getIncomingWebhookById({ commit }, id) {
        return new IncomingWebhooksAPI()
            .getIncomingWebhookById(id)
            .then(response => {
                commit('SET_INCOMINGWEBHOOK', [
                    IncomingWebhooksTransformer.fetch(response.result)
                ]);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    createIncomingWebhook({ commit }, data) {
        let sendData = IncomingWebhooksTransformer.send(data);
        new IncomingWebhooksAPI()
            .createIncomingWebhook(sendData)
            .then(response => {
                Vue.notify({ type: 'info', title: 'Incoming webhook has been created' });
                commit('ADD_INCOMINGWEBHOOK', {
                    incomingWebhook: IncomingWebhooksTransformer.fetch(response),
                    listItem: IncomingWebhooksTransformer.fetchList([{
                        eventTrackerId: response.eventTrackerId,
                        key: response.key,
                        externalSystem: response.externalSystem,
                        topic: response.topic,
                        queueUrl: response.queueUrl,
                        securitySettings: response.securitySettings,
                        status: response.status
                    }])[0]
                });
                Vue.router.push({
                    name: 'Webhooks'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    updateIncomingWebhook({ commit }, json) {
        let sendData = IncomingWebhooksTransformer.send(json.data);
        new IncomingWebhooksAPI()
            .updateIncomingWebhook(json.id, sendData)
            .then((response) => {
                Vue.notify({ type: 'info', title: 'The incoming webhook has been updated successfully' });
                commit('UPDATE_INCOMINGWEBHOOK', {
                    incomingWebhook: IncomingWebhooksTransformer.fetch(response.result),
                    listItem: IncomingWebhooksTransformer.fetchList([{
                        eventTrackerId: response.eventTrackerId,
                        key: response.key,
                        externalSystem: response.externalSystem,
                        topic: response.topic,
                        queueUrl: response.queueUrl,
                        securitySettings: response.securitySettings,
                        status: response.status
                    }])[0]
                });
                Vue.router.push({
                    name: 'Webhooks'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    deleteIncomingWebhook({ commit }, id) {
        return new Promise((resolve, reject) => {
            new IncomingWebhooksAPI()
                .deleteIncomingWebhook(id)
                .then(response => {
                    const incomingWebhook = IncomingWebhooksTransformer.fetch(response);
                    Vue.notify({
                        type: 'info',
                        title: 'The incoming webhook has been deleted successfully'
                    });
                    commit('REMOVE_INCOMINGWEBHOOK', id);
                    resolve(incomingWebhook);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    getOutgoingWebhooks({ commit }) {
        new OutgoingWebhooksAPI().getOutgoingWebhooks({}).then(response => {
            commit('SET_ALL_OUTGOINGWEBHOOKS', [
                OutgoingWebhooksTransformer.fetchList(response.result)
            ]);
        });
    },

    getOutgoingWebhookById({ commit }, id) {
        return new OutgoingWebhooksAPI()
            .getOutgoingWebhookById(id)
            .then(response => {
                commit('SET_OUTGOINGWEBHOOK', [
                    OutgoingWebhooksTransformer.fetch(response.result)
                ]);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    createOutgoingWebhook({ commit }, data) {
        let sendData = OutgoingWebhooksTransformer.send(data);
        new OutgoingWebhooksAPI()
            .createOutgoingWebhook(sendData)
            .then(response => {
                Vue.notify({ type: 'info', title: 'Outgoing webhook has been created' });
                commit('ADD_OUTGOINGWEBHOOK', {
                    outgoingWebhook: OutgoingWebhooksTransformer.fetch(response),
                    listItem: OutgoingWebhooksTransformer.fetchList([{
                        subscriptionKey: response.subscriptionKey,
                        topic: response.topic,
                        endPoint: response.endPoint,
                        apiKey: response.apiKey,
                        apiKeyHeader: response.apiKeyHeader,
                        hmacKey: response.hmacKey,
                        hmacAlgorithm: response.hmacAlgorithm,
                        hmacSignatureHeader: response.hmacSignatureHeader,
                        status: response.status
                    }])[0]
                });
                Vue.router.push({
                    name: 'Webhooks'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    updateOutgoingWebhook({ commit }, json) {
        let sendData = OutgoingWebhooksTransformer.send(json.data);
        new OutgoingWebhooksAPI()
            .updateOutgoingWebhook(json.id, sendData)
            .then((response) => {
                Vue.notify({ type: 'info', title: 'The incoming webhook has been updated successfully' });
                commit('UPDATE_OUTGOINGWEBHOOK', {
                    outgoingWebhook: OutgoingWebhooksTransformer.fetch(response.result),
                    listItem: OutgoingWebhooksTransformer.fetchList([{
                        subscriptionKey: response.subscriptionKey,
                        topic: response.topic,
                        endPoint: response.endPoint,
                        apiKey: response.apiKey,
                        apiKeyHeader: response.apiKeyHeader,
                        hmacKey: response.hmacKey,
                        hmacAlgorithm: response.hmacAlgorithm,
                        hmacSignatureHeader: response.hmacSignatureHeader,
                        status: response.status
                    }])[0]
                });
                Vue.router.push({
                    name: 'Webhooks'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    deleteOutgoingWebhook({ commit }, id) {
        return new Promise((resolve, reject) => {
            new OutgoingWebhooksAPI()
                .deleteOutgoingWebhook(id)
                .then(response => {
                    const outgoingWebhook = OutgoingWebhooksTransformer.fetch(response);
                    Vue.notify({
                        type: 'info',
                        title: 'The outgoing webhook has been deleted successfully'
                    });
                    commit('REMOVE_OUTGOINGWEBHOOK', id);
                    resolve(outgoingWebhook);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    publishIncomingWebhook({ commit }, id) {
        return new Promise((resolve, reject) => {
            new IncomingWebhooksAPI()
                .publishIncomingWebhook(id)
                .then(response => {
                    Vue.notify({
                        type: 'info',
                        title: 'Incoming webhook has been published successfully'
                    });
                    resolve(response);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    publishOutgoingWebhook({ commit }, id) {
        return new Promise((resolve, reject) => {
            new OutgoingWebhooksAPI()
                .publishOutgoingWebhook(id)
                .then(response => {
                    Vue.notify({
                        type: 'info',
                        title: 'Outgoing webhook has been published successfully'
                    });
                    resolve(response);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    unpublishIncomingWebhook({ commit }, id) {
        return new Promise((resolve, reject) => {
            new IncomingWebhooksAPI()
                .unpublishIncomingWebhook(id)
                .then(response => {
                    Vue.notify({
                        type: 'info',
                        title: 'Incoming webhook has been unpublished successfully'
                    });
                    resolve(response);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    unpublishOutgoingWebhook({ commit }, id) {
        return new Promise((resolve, reject) => {
            new OutgoingWebhooksAPI()
                .unpublishOutgoingWebhook(id)
                .then(response => {
                    Vue.notify({
                        type: 'info',
                        title: 'Outgoing webhook has been unpublished successfully'
                    });
                    resolve(response);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    }
};