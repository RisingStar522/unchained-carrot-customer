import Vue from 'vue';

export default {
    SAVE_PASS_TEMPLATE(state, data) {
        state.singlePassTemplate = {
            ...state.singlePassTemplate,
            ...data.singlePassTemplate
        };
    },

    SAVE_PASS_TEMPLATE_SETTINGS(state, data) {
        state.singlePassTemplate = {
            ...state.singlePassTemplate,
            ...data.singlePassTemplate
        };
    },

    ADD_PASS_TEMPLATE(state, data) {
        Vue.set(state.singlePassTemplate, data.singlePassTemplate.passTemplateId, data.singlePassTemplate);
        state.allPassTemplates.push(data.listItem);
    },

    UPDATE_PASS_TEMPLATE(state, data) {
        Vue.set(state.singlePassTemplate, data.singlePassTemplate.passTemplateId, data.singlePassTemplate);
        for (let i in state.allPassTemplates) {
            if (state.allPassTemplates[i].passTemplateId === data.listItem.passTemplateId) {
                Vue.set(state.allPassTemplates, i, data.listItem);
                break;
            }
        }
    },

    SET_SINGLE_PASS_TEMPLATE(state, data) {
        state.singlePassTemplate = data;
    },
    SET_ALL_PASS_TEMPLATES(state, data) {
        state.allPassTemplates = data;
    },
    REMOVE_PASS_TEMPLATE(state, id) {
        state.allPassTemplates[0] = state.allPassTemplates[0].filter(
            item => item.passTemplateId !== id
        );
    }
};
