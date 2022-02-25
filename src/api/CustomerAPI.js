import API from './API';
import Axios from 'axios';

class CustomerAPI extends API {
    billingEndpoint = `${process.env.VUE_APP_LAMDA_AP}/ecurring-subscriptions`;

    constructor(parameters = {}) {
        super('/customers', parameters);
    }

    getCustomer() {
        return this.submit('get', `${this.endpoint}`);
    }

    createCustomer(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    getPrograms() {
        return this.submit('get', `${this.endpoint}/programs`);
    }

    getSettings() {
        return this.submit('get', `${this.endpoint}/settings`);
    }

    setSettings(data) {
        return this.submit('patch', `${this.endpoint}/settings`, data);
    }

    getBillingData(customerId) {
        const apiUrl = this.billingEndpoint;
        delete Axios.defaults.headers.common['Authorization'];
        return Axios.post(apiUrl, {
            uccCustomerId: customerId
        });
    }
}

export default CustomerAPI;
