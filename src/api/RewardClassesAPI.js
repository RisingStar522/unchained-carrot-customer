import API from './API';

class RewardClassesAPI extends API {
    constructor(parameters = {}) {
        super('/reward-engine/reward-classes', parameters);
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
    delete(id){
        return this.submit('delete', `${this.endpoint}/${id}`);
    }
}

export default RewardClassesAPI;
