import API from './API';

class RewardsAPI extends API {
    constructor(parameters = {}) {
        super('/customers/rewards', parameters);
    }

    getAll() {
        return this.submit('get', `${this.endpoint}`);
    }

    create(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    update(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }
}

export default RewardsAPI;
