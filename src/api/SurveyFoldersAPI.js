import API from './API';

class SurveyFoldersAPI extends API {
    constructor(parameters = {}) {
        super('/survey-folders', parameters);
    }

    getAllFolders() {
        return this.submit('get', `${this.endpoint}`);
    }

    createFolder(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateFolder() {
        return this.submit('patch', `${this.endpoint}`);
    }
}

export default SurveyFoldersAPI;
