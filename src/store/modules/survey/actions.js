import Vue from 'vue';
import SurveyFoldersAPI from '../../../api/SurveyFoldersAPI';
import SurveysAPI from '../../../api/SurveysAPI';
import SurveyFoldersTransformer from '../../../transformers/SurveyFoldersTransformer';
import SurveyTransformer from '../../../transformers/SurveyTransformer';

export default {
    getAllSurveyFolders({ commit }) {
        commit('CLEAR_SURVEY_LIST');
        new SurveyFoldersAPI()
            .getAllFolders()
            .then(resp => {
                commit(
                    'SET_SURVEY_FOLDERS',
                    SurveyFoldersTransformer.fetchCollections(resp.result)
                );
                if (resp.result[0] && resp.result[0]._id) {
                    commit('SELECT_SURVEY_FOLDER', resp.result[0]._id);
                }
            })
            .catch(() => {});
    },
    getAllSurveys({ commit }) {
        new SurveysAPI().getSurveys({}).then(resp => {
            commit('SET_ALL_SURVEYS', resp.result);
        });
    },

    createSurveyFolder({ commit }, data) {
        data = SurveyFoldersTransformer.send(data);
        new SurveyFoldersAPI()
            .createFolder(data)
            .then(resp => {
                data._id = resp.id;
                commit(
                    'ADD_SURVEY_FOLDERS',
                    SurveyFoldersTransformer.fetch(data)
                );
            })
            .catch(err => {
            });
    },

    getSurveyFromFolder({ commit }, folder) {
        commit('CLEAR_SURVEY_LIST');
        new SurveysAPI()
            .getSurveys({ folderId: folder })
            .then(resp => {
                commit(
                    'SET_SURVEYS',
                    SurveyTransformer.fetchCollections(resp.result)
                );
                commit(
                    'SET_SURVEYS_LIST',
                    SurveyTransformer.fetchList(resp.result)
                );
            })
            .catch(err => {
            });
    },

    getSurvey({ commit }, id) {
        return new SurveysAPI()
            .getSurveyById(id)
            .then(resp => {
                commit('SET_SURVEYS', [SurveyTransformer.fetch(resp.result)]);
                return resp;
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    createSurvey({ commit }, data) {
        let sendData = SurveyTransformer.send(data);
        new SurveysAPI()
            .createSurvey(sendData)
            .then(resp => {
                Vue.notify({ type: 'info', title: 'Survey created' });
                sendData._id = resp.id;
                sendData.customerId = data.customer;
                commit('ADD_SURVEY', {
                    survey: SurveyTransformer.fetch(sendData),
                    listItem: SurveyTransformer.fetchList([
                        { _id: resp.id, title: data.name }
                    ])[0]
                });
                Vue.router.push({
                    name: 'SurveysActivate',
                    params: { id: resp.id },
                    query: { language: sendData.language }
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    updateSurvey({ commit }, json) {
        let sendData = SurveyTransformer.send(json.data);
        new SurveysAPI()
            .updateSurvey(json.id, sendData)
            .then(() => {
                Vue.notify({ type: 'info', title: 'Survey Update' });
                sendData._id = json.id;
                sendData.customerId = json.data.customer;
                commit('UPDATE_SURVEY', {
                    survey: SurveyTransformer.fetch(sendData),
                    listItem: SurveyTransformer.fetchList([
                        { _id: json.id, title: json.data.name }
                    ])[0]
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    // Action for preview
    getSurveyById({ commit }, id) {
        new SurveysAPI()
            .getSurveyById(id)
            .then(response => {
                commit('SET_SURVEY_METADATA', response.result);
                commit(
                    'SET_SURVEY_MODEL',
                    SurveyTransformer.fetchModel(response.result)
                );
            })
            .catch(error => {
                if (error.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
            });
    }
};
