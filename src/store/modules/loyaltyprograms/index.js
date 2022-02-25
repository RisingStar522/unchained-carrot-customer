/* ============
 * Loyalty Programs Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        loyaltyPrograms: [],
        loyaltyProgramsPagination: {
            limit: 3,
            total: 0,
            offset: 0
        },
        loyaltyProgram: {},
        loyaltyProgramLevels: [],
        loyaltyProgramMembers: [],
        loyaltyProgramMembersPagination: {
            limit: 3,
            total: 0,
            offset: 0
        }
    },
    actions,
    getters,
    mutations
};
