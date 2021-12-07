/* ============
 * Leaderboard Module
 * ============
 */
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    namespaced: true,
    state: {
        campaigns: []
    },
    getters,
    actions,
    mutations
};
