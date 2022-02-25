import API from './API';

class StatsAPI extends API {
    constructor(parameters = {}) {
        super('/stats', parameters);
    }

    getProgramsStats(id) {
        return this.submit('get', `${this.endpoint}/programs/${id}`);
    }

    getSurveysStats(id) {
        return this.submit('get', `${this.endpoint}/surveys/${id}`);
    }

    getQuizzesStats(id) {
        return this.submit('get', `${this.endpoint}/quizzes/${id}`);
    }
}

export default StatsAPI;
