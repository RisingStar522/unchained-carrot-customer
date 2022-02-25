import Vue from 'vue';

export default {
    SET_REWARDS(state, data) {
        for (let i in data) {
            Vue.set(state.rewards, data[i].id, data[i]);
        }
    },

    ADD_REWARD(state, data) {
        Vue.set(state.rewards, data.reward.id, data.reward);
        state.rewardsList.push(data.listItem);
        state.hasRewards = true;
    },

    UPDATE_REWARD(state, data) {
        Vue.set(state.rewards, data.reward.id, data.reward);
        for (let i in state.rewardsList) {
            if (state.rewardsList[i].id === data.listItem.id) {
                Vue.set(state.rewardsList, i, data.listItem);
                break;
            }
        }
        state.hasRewards = true;
    },

    SET_REWARDS_LIST(state, data) {
        state.rewardsList = data;
    },

    SET_HAS_REWARDS(state, status) {
        state.hasRewards = status;
    }
};
