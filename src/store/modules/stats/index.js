/* ============
 * Customer Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        programs: [],
        surveys: [],
        quizzes: []
    },
    actions,
    getters,
    mutations
};
