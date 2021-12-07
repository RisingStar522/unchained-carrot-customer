/* ============
 * Traffic Routes Module
 * ============
 */
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        allTrafficRoutes: [],
        trafficRoute: {},
        totalDestinationPercent: 100
    },
    getters,
    actions,
    mutations
};
