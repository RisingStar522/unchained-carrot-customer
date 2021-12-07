/**==============================
 * Builder Module (Email + Page)
 * ==============================
 */

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state: {
        pages: [],
        templates: [],
        emailTemplates: []
    },
    actions,
    mutations,
    getters
};
