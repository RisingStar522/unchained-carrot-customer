import API from './API';

class ExportAPI extends API {
    constructor(parameters = {}) {
        super('/exports', parameters);
    }

    getExports() {
        return this.submit('get', this.endpoint);
    }
}

export default ExportAPI;
