import API from './API';

class ReviewFoldersAPI extends API {
    constructor(parameters = {}) {
        super('/review-folders', parameters);
    }
    getAllReviewFolders() {
        return this.submit('get', `${this.endpoint}`);
    }

    createFolder(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }
    deleteFolder(reviewFodlerId) {
        return this.submit('delete', `${this.endpoint}/${reviewFodlerId}`);
    }
}

export default ReviewFoldersAPI;
