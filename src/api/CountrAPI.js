import API from './API';

export default class CountrAPI extends API {
    constructor(parameters = {}) {
        super('/integrations/countr', parameters);
    }

    getAuthorization(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}/token`);
    }
}
