import API from './API';

class RewardSetsAPI extends API {
    constructor(parameters = {}) {
        super('/reward-engine/reward-sets', parameters);
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

export default RewardSetsAPI;
