import API from './API';

class CustomerEventsAPI extends API {
    constructor(parameters = {}) {
        super('/customerEvents', parameters);
    }

    getCustomerEvents() {
        return this.submit('get', this.endpoint);
    }
}

export default CustomerEventsAPI;
