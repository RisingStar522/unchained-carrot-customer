import LoyaltyProgramsAPI from '../../../api/LoyaltyProgramsAPI';
import LoyaltyProgramTransformer from '../../../transformers/LoyaltyProgramTransformer';

export default {
    getLoyaltyPrograms(
        { commit },
        { limit, offset } = { limit: 3, offset: 0 }
    ) {
        return new Promise((resolve, reject) => {
            new LoyaltyProgramsAPI()
                .getPrograms({ limit, offset })
                .then(resp => {
                    commit(
                        'SET_PROGRAMS_PAGINATION',
                        LoyaltyProgramTransformer.fetchPagination(resp)
                    );
                    commit('SET_PROGRAMS', resp.result);
                    resolve(resp);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        commit('SET_PROGRAMS', []);
                    }
                    reject(err);
                });
        });
    },

    getLoyaltyProgram({ commit }, programId) {
        new LoyaltyProgramsAPI().getProgram(programId).then(resp => {
            commit('SET_SINGLE_PROGRAM', resp.result);
        });
    },

    getLoyaltyProgramLevels({ commit }, programId) {
        new LoyaltyProgramsAPI().getProgramLevels(programId).then(resp => {
            commit('SET_LEVELS', LoyaltyProgramTransformer.fetchLevels(resp));
        });
    },

    addLoyaltyProgram(_, data) {
        return new Promise((resolve, reject) => {
            new LoyaltyProgramsAPI()
                .addProgram(data)
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    },

    updateLoyaltyProgram(_, { programId, data }) {
        return new Promise((resolve, reject) => {
            new LoyaltyProgramsAPI()
                .updateProgram({ id: programId, data })
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    },

    deleteLoyaltyProgram({ commit, dispatch }, programId) {
        return new Promise((resolve, reject) => {
            new LoyaltyProgramsAPI()
                .deleteProgram(programId)
                .then(resp => {
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },

    getMembers({ commit }, programId) {
        return new Promise((resolve, reject) => {
            new LoyaltyProgramsAPI()
                .getMembers(programId)
                .then(resp => {
                    commit('SET_MEMBERS', resp.result);
                    commit(
                        'SET_PROGRAM_MEMBERS_PAGINATION',
                        LoyaltyProgramTransformer.fetchPagination(resp)
                    );
                    return resolve(resp);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        commit('SET_MEMBERS', []);
                    }
                    reject(err);
                });
        });
    },

    createLoyaltyProgramMember(_, { programId, loyaltyProgramMember }) {
        return new Promise((resolve, reject) => {
            new LoyaltyProgramsAPI()
                .addMember(programId, loyaltyProgramMember)
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    }
};
