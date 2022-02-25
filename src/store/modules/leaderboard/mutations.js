import Vue from 'vue';

export default {
  ADD_LEADERBOARD(state, data) {
        Vue.set(state.leaderboard, data.leaderboard.leaderBoardId, data.leaderboard);
        state.allLeaderboards.push(data.listItem);
    },

    UPDATE_LEADERBOARD(state, data) {
        Vue.set(state.leaderboard, data.leaderboard.leaderBoardId, data.leaderboard);
        for (let i in state.allLeaderboards) {
            if (state.allLeaderboards[i].leaderBoardId === data.listItem.leaderBoardId) {
                Vue.set(state.leaderboard, i, data.listItem);
                break;
            }
        }
    },

    SET_LEADERBOARD(state, data) {
        state.leaderboard = data;
    },
    SET_ALL_LEADERBOARDS(state, data) {
        state.allLeaderboards = data;
    },
    REMOVE_LEADERBOARD(state, id) {   
        state.allLeaderboards[0] = state.allLeaderboards[0].filter(
            item => item.leaderBoardId !== id
        );
    },
};
