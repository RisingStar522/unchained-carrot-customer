/* ============
 * Review Module
 * ============
 */
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        folders: [],
        selectedFolder: '',
        reviewList: [],
        reviews: {},
        isCompleting: false,
        iconSets: []
    },
    getters,
    actions,
    mutations
};
