import API from './API';

class SurveysAPI extends API {
    constructor(parameters = {}) {
        super('/surveys', parameters);
    }

    getSurveys(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getSurveyById(id) {
        return this.submit('get', `${this.endpoint}/` + id);
    }

    createSurvey(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateSurvey(id, data) {
        return this.submit('patch', `${this.endpoint}/` + id, data);
    }
}

export default SurveysAPI;
