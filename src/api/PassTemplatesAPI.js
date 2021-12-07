import API from './API';

class PassTemplatesAPI extends API {
    constructor(parameters = {}) {
        super('/pass-templates', parameters);
    }

    getPassTemplates(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getSinglePassTemplateById(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    createPassTemplate(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updatePassTemplate(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    deletePassTemplate(id) {
        return this.submit('delete', `${this.endpoint}/${id}`);
    }
}

export default PassTemplatesAPI;
