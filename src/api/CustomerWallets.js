import API from './API';

class CustomerWalletsAPI extends API {
    constructor(parameters = {}) {
        super('/customers/hot-wallets', parameters);
    }

    getWallets() {
        return this.submit('get', this.endpoint);
    }

    createWallet(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }
}

export default CustomerWalletsAPI;
