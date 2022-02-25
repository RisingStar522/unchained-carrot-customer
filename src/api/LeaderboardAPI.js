import API from './API';

class LeaderboardAPI extends API {
    constructor(parameters = {}) {
        super('/leaderboard', parameters);
    }

    getLeaderboards(query) {
        this.setParameters(query);
        return this.submit('get', `${this.endpoint}`);
    }

    getLeaderboardById(id) {
        return this.submit('get', `${this.endpoint}/${id}`);
    }

    createLeaderboard(data) {
        return this.submit('post', `${this.endpoint}`, data);
    }

    updateLeaderboard(id, data) {
        return this.submit('patch', `${this.endpoint}/${id}`, data);
    }

    deleteLeaderboard(id) {
        return this.submit('delete', `${this.endpoint}/${id}`);
    }
}

export default LeaderboardAPI;
