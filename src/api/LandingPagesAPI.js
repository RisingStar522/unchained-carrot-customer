import API from './API';

class LandingPagesAPI extends API {
    constructor(parameters = {}) {
        super('/landing-pages', parameters);
    }

    getAll() {
        return this.submit('get', this.endpoint);
    }
}

export default LandingPagesAPI;
