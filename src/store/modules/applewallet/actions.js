import Vue from 'vue';
import PassTemplatesAPI from '../../../api/PassTemplatesAPI';
import PassTemplatesTransformer from '../../../transformers/PassTemplatesTransformer';

export default {
    getAllPassTemplates({ commit }) {
        new PassTemplatesAPI().getPassTemplates({}).then(resp => {
            commit('SET_ALL_PASS_TEMPLATES', [
                PassTemplatesTransformer.fetchList(resp.result)
            ]);
        });
    },

    getSinglePassTemplateById({ commit }, id) {
        return new PassTemplatesAPI()
            .getSinglePassTemplateById(id)
            .then(resp => {
                commit('SET_SINGLE_PASS_TEMPLATE', [
                    PassTemplatesTransformer.fetch(resp.result)
                ]);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    savePassTemplate({ commit }, payload) {
        let sendData = PassTemplatesTransformer.send(payload);
        commit('SAVE_PASS_TEMPLATE', {
            singlePassTemplate: sendData
        });
    },

    savePassTemplateSettings({ commit }, payload) {
        let sendData = PassTemplatesTransformer.send(payload);
        commit('SAVE_PASS_TEMPLATE_SETTINGS', {
            singlePassTemplate: sendData
        });
    },

    createPassTemplate({ commit }, data) {
        let sendData = PassTemplatesTransformer.send(data);
        new PassTemplatesAPI()
            .createPassTemplate(sendData)
            .then(resp => {
                Vue.notify({ type: 'info', title: 'Pass Template has been created' });
                commit('ADD_PASS_TEMPLATE', {
                    singlePassTemplate: PassTemplatesTransformer.fetch(resp),
                    listItem: PassTemplatesTransformer.fetchList([
                        {
                            passTemplateId: resp.passTemplateId,
                            customerId: resp.customerId,
                            name: resp.name,
                            passStyle: resp.passStyle,
                            defaultLanguage: resp.defaultLanguage,
                            standardKeys: resp.standardKeys,
                            associatedAppKeys: resp.associatedAppKeys,
                            relevanceKeys: resp.relevanceKeys,
                            visualAppearanceKeys: resp.visualAppearanceKeys,
                            webServiceKeys: resp.webServiceKeys,
                            nfcEnabled: resp.nfcEnabled,
                            images: resp.images,
                            structure: resp.structure
                        }
                    ])[0]
                });
                Vue.router.push({
                    name: 'TemplateImageSettings'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    updatePassTemplate({ commit }, json) {
        let sendData = PassTemplatesTransformer.send(json.data);
        new PassTemplatesAPI()
            .updatePassTemplate(json.id, sendData)
            .then((resp) => {
                Vue.notify({ type: 'info', title: 'Pass Template has been updated successfully' });
                commit('UPDATE_PASS_TEMPLATE', {
                    singlePassTemplate: PassTemplatesTransformer.fetch(resp.result),
                    listItem: PassTemplatesTransformer.fetchList([
                        {
                            passTemplateId: resp.result.passTemplateId,
                            customerId: resp.result.customerId,
                            name: resp.result.name,
                            passStyle: resp.result.passStyle,
                            defaultLanguage: resp.result.defaultLanguage,
                            standardKeys: resp.result.standardKeys,
                            associatedAppKeys: resp.result.associatedAppKeys,
                            relevanceKeys: resp.result.relevanceKeys,
                            visualAppearanceKeys: resp.result.visualAppearanceKeys,
                            webServiceKeys: resp.result.webServiceKeys,
                            nfcEnabled: resp.result.nfcEnabled,
                            images: resp.result.images,
                            structure: resp.result.structure
                        }
                    ])[0]
                });
                Vue.router.push({
                    name: 'AppleWallet'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    deletePassTemplate({ commit }, id) {
        return new Promise((resolve, reject) => {
            new PassTemplatesAPI()
                .deletePassTemplate(id)
                .then(resp => {
                    const singlePassTemplate = PassTemplatesTransformer.fetch(resp);
                    Vue.notify({
                        type: 'info',
                        title: 'Pass Template has been deleted successfully'
                    });
                    commit('REMOVE_PASS_TEMPLATE', id);
                    resolve(singlePassTemplate);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    }
};
