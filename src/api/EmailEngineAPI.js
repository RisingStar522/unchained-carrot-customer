import API from './API';

class EmailEngineAPI extends API {
    constructor(parameters = {}) {
        super('/email-engine', parameters);
    }

    getSources() {
        return this.submit('get', `${this.endpoint}/sources`);
    }

    addSource(data) {
        return this.submit('post', `${this.endpoint}/sources`, data);
    }

    getEmailEvents(externalSystem, projectId) {
        return this.submit(
            'get',
            `${this.endpoint}/sources/${externalSystem}/project/${projectId}/events`
        );
    }

    addEmailEvent(externalSystem, projectId, data) {
        return this.submit(
            'post',
            `${this.endpoint}/sources/${externalSystem}/project/${projectId}/events`,
            data
        );
    }
}

export default EmailEngineAPI;
