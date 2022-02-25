import API from './API';

class LoyaltyProgramsAPI extends API {
    constructor(parameters = {}) {
        super('/loyalty-programs', parameters);
    }

    getPrograms(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getProgram(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    addProgram(data) {
        return this.submit('post', this.endpoint, data);
    }

    getProgramLevels(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    updateProgram({ id, data }) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    deleteProgram(id) {
        return this.submit('delete', `${this.endpoint}/${id}`);
    }

    addMember(programId, data) {
        return this.submit(
            'post',
            `${this.endpoint}/${programId}/members`,
            data
        );
    }

    getMembers(id) {
        return this.submit('get', `${this.endpoint}/${id}/members`);
    }
}

export default LoyaltyProgramsAPI;
