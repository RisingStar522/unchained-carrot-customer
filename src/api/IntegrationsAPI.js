const { default: Axios } = require('axios');
import API from './API';

export class IntegrationsAPI extends API {
    constructor(parameters = {}) {
        super('/customers', parameters);
    }

    addIntegration(data) {
        return this.submit('post', `${this.endpoint}/integrations`, data);
    }
    getIntegrationByExternalSystem(externalSystem) {
        return this.submit(
            'get',
            `${this.endpoint}/integrations/${externalSystem}`
        );
    }
    updateIntegration({ externalSystem, data }) {
        return this.submit(
            'patch',
            `${this.endpoint}/integrations/${externalSystem}`,
            data
        );
    }
    getIntegrations() {
        return this.submit('get', `${this.endpoint}/integrations`);
    }
    deleteIntegrationByExternalSystem(externalSystem) {
        return this.submit(
            'delete',
            `${this.endpoint}/integrations/${externalSystem}`
        );
    }
    static getAmazonQuickSightUrl({ endpoint, data }) {
        delete Axios.defaults.headers.common['Authorization'];
        return Axios.get(endpoint, data);
    }

    getBeeAuthToken(payload) {
        const endpoint = 'https://auth.getbee.io/apiauth';

        return this.submit('post', endpoint, payload);
    }
}
