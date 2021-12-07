import RewardsAPI from '../../../api/RewardsAPI';
import RewardTransformer from '../../../transformers/RewardTransformer';

export default {
    getRewards({ commit }) {
        new RewardsAPI()
            .getAll()
            .then(resp => {
                commit(
                    'SET_REWARDS',
                    RewardTransformer.fetchCollections(resp.rewards)
                );
                commit(
                    'SET_REWARDS_LIST',
                    RewardTransformer.fetchList(resp.rewards)
                );
                commit('SET_HAS_REWARDS', true);
            })
            .catch(() => {
                commit('SET_HAS_REWARDS', false);
            });
    },

    createReward({ commit }, payload) {
        new RewardsAPI()
            .create(RewardTransformer.send(payload))
            .then(resp => {
                commit('ADD_REWARD', {
                    reward: RewardTransformer.fetch(resp),
                    listItem: RewardTransformer.fetchList([resp])[0]
                });
            })
            .catch(err => {
                console.error(err);
            });
    },

    updateReward({ commit }, payload) {
        new RewardsAPI()
            .update(payload.id, RewardTransformer.send(payload.data))
            .then(resp => {
                commit('UPDATE_REWARD', {
                    reward: RewardTransformer.fetch(resp),
                    listItem: RewardTransformer.fetchList([resp])[0]
                });
            })
            .catch(err => {
                console.error(err);
            });
    }
};
