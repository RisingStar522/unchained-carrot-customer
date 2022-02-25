import { IntegrationsAPI } from '../../../api/IntegrationsAPI';
import { reject } from 'core-js/fn/promise';

export default {
    addIntegration({ commit }, data) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI()
                .addIntegration(data)
                .then(resp => resolve(resp))
                .catch(err => reject(err));
        });
    },
    getIntegrationByExternalSystem({ commit }, externalSystem) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI()
                .getIntegrationByExternalSystem(externalSystem)
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    },
    deleteIntegrationByExternalSystem({ commit }, externalSystem) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI()
                .deleteIntegrationByExternalSystem(externalSystem)
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    },
    updateIntegration({ commit }, payload) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI()
                .updateIntegration(payload)
                .then(() => resolve(payload))
                .catch(err => reject(err));
        });
    },
    getIntegrations({ commit }) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI()
                .getIntegrations()
                .then(resp => {
                    resolve(
                        commit('SET_CUSTOMER_ACTIVE_INTEGRATIONS', resp.data)
                    );
                })
                .catch(err => reject(err));
        });
    },
    getAmazonQuickSightUrl({ commit }, data) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI.getAmazonQuickSightUrl(data)
                .then(resp => resolve(resp))
                .catch(err => reject(err));
        });
    },
    getBeeAuthToken({ commit }, payload) {
        return new Promise((resolve, reject) => {
            new IntegrationsAPI()
                .getBeeAuthToken(payload)
                .then(resp => resolve(resp))
                .catch(err => reject(err));
        });
    }
};
