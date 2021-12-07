import API from './API';

class CustomerAPI extends API {
    constructor(parameters = {}) {
        super('/users', parameters);
    }

    getPersonas() {
        return this.submit('get', `${this.endpoint}`);
    }
}

export default CustomerAPI;
