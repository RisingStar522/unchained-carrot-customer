/* ============
 * Survey Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        folders: [],
        surveys: {},
        surveyList: [],
        selectedFolder: '',
        isCompleting: false,
        current: {
            id: null,
            customer: null,
            model: {}
        },
        allSurveys: []
    },
    actions,
    getters,
    mutations
};
