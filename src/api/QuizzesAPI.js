import API from './API';

class QuizzesAPI extends API {
    constructor(parameters = {}) {
        super('/quizzes', parameters);
    }

    getQuizzes(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getQuizById(id, query = {}) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    createQuiz(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateQuiz(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    getImages(id) {
        this.setParameter('quizId', id);
        return this.submit('get', `${this.endpoint}/listimages`);
    }
}

export default QuizzesAPI;
