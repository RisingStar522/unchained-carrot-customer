/* ============
 * Customer Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        id: null,
        organizationName: '',
        contactPerson: '',
        country: '',
        vatNumber: '',
        companyRegistration: '',
        website: '',
        programs: [],
        settings: null,
        startMode: '',
        allowedModes: [],
        wallets: [],
        deposits: [],
        withdrawals: [],
        events: []
    },
    actions,
    getters,
    mutations
};
