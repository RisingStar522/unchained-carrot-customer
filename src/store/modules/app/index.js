/* ============
 * App Module
 * ============
 */
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        isAdmin: true
    },
    getters,
    actions,
    mutations
};
