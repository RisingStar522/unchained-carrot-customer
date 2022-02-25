import API from './API';

class CampaignsAPI extends API {
    constructor(parameters = {}) {
        super('/campaigns', parameters);
    }

    getAll() {
        return this.submit('get', this.endpoint);
    }

    createCampaign(data) {
        return this.submit('post', this.endpoint, data);
    }
}

export default CampaignsAPI;
