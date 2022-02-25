/**==============================
 * AppleWallet Module
 * ==============================
 */

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state: {
        allPassTemplates: [
            {
                passTemplateId: '',
                customerId: '',
                name: '',
                passStyle: '',
                defaultLanguage: '',
                standardKeys: {},
                associatedAppKeys: {},
                relevanceKeys: {},
                visualAppearanceKeys: {},
                webServiceKeys: {},
                nfcEnabled: {},
                images: {},
                structure: {}
            }
        ],
        singlePassTemplate: {
            passTemplateId: '',
            customerId: '',
            name: '',
            passStyle: '',
            defaultLanguage: '',
            standardKeys: {},
            associatedAppKeys: {},
            relevanceKeys: {},
            visualAppearanceKeys: {},
            webServiceKeys: {},
            nfcEnabled: {},
            images: {},
            structure: {}
        }
    },
    actions,
    mutations,
    getters
};
