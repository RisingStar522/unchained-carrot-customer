import API from './API';
class ReviewsAPI extends API {
    constructor(parameters = {}) {
        super('/reviews', parameters);
    }
    getReview(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }
    getReviews(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }
    getIconSets() {
        return this.submit('get', `${this.endpoint}/iconsets`);
    }
    addReview(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }
    updateReview(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }
    deleteReview(id) {
        return this.submit('delete', `${this.endpoint}/${id}`);
    }
}

export default ReviewsAPI;
