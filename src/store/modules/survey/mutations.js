import Vue from 'vue';

export default {
    SET_SURVEY_FOLDERS(state, data) {
        state.folders = data;
    },

    ADD_SURVEY_FOLDERS(state, data) {
        state.folders.push(data);
    },

    SELECT_SURVEY_FOLDER(state, id) {
        state.selectedFolder = id;
    },

    SET_SURVEY_COMPLETING(state, status) {
        state.isCompleting = status;
    },

    CLEAR_SURVEY_LIST(state) {
        state.surveyList = [];
    },

    SET_SURVEYS(state, data) {
        for (let i in data) {
            Vue.set(state.surveys, data[i].id, data[i]);
        }
    },

    SET_SURVEYS_LIST(state, data) {
        state.surveyList = data;
    },

    ADD_SURVEY(state, data) {
        Vue.set(state.surveys, data.survey.id, data.survey);
        state.surveyList.push(data.listItem);
    },

    UPDATE_SURVEY(state, data) {
        Vue.set(state.surveys, data.survey.id, data.survey);
        for (let i in state.surveyList) {
            if (state.surveyList[i].id === data.listItem.id) {
                Vue.set(state.surveyList, i, data.listItem);
                break;
            }
        }
    },

    SET_SURVEY_MODEL(state, data) {
        state.current.model = data;
    },

    SET_SURVEY_METADATA(state, data) {
        state.current.id = data._id;
        state.current.customer = data.customerId;
    },
    SET_ALL_SURVEYS(state, data) {
        state.allSurveys = data;
    }
};
