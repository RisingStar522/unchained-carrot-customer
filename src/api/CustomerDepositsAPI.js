import API from './API';

class CustomerDepositsAPI extends API {
    constructor(parameters = {}) {
        super('/customers/crypto-deposits', parameters);
    }

    getDeposits(query) {
        this.setParameters(query);
        return this.submit('get', this.endpoint);
    }
}

export default CustomerDepositsAPI;
