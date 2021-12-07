/* ============
 * Leaderboard Module
 * ============
 */
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        allLeaderboards: [],
        leaderboard: {}
    },
    getters,
    actions,
    mutations
};
