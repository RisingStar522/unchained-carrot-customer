import Vue from 'vue';
import QuizFoldersAPI from '../../../api/QuizFoldersAPI';
import QuizzesAPI from '../../../api/QuizzesAPI';
import QuizFoldersTransformer from '../../../transformers/QuizFoldersTransformer';
import QuizTransformer from '../../../transformers/QuizTransformer';

export default {
    getAllQuizFolders({ commit }) {
        commit('CLEAR_QUIZZES_LIST');
        new QuizFoldersAPI()
            .getAllFolders()
            .then(resp => {
                commit(
                    'SET_QUIZ_FOLDERS',
                    QuizFoldersTransformer.fetchCollections(resp.result)
                );
                if (resp.result[0] && resp.result[0]._id) {
                    commit('SELECT_QUIZ_FOLDER', resp.result[0]._id);
                }
            })
            .catch(() => {});
    },

    getAllQuizzes({ commit }) {
        new QuizzesAPI().getQuizzes({}).then(resp => {
            commit('SET_ALL_QUIZZES', resp.result);
        });
    },

    createQuizFolder({ commit }, data) {
        data = QuizFoldersTransformer.send(data);
        new QuizFoldersAPI()
            .createFolder(data)
            .then(resp => {
                data._id = resp.id;
                commit('ADD_QUIZ_FOLDERS', QuizFoldersTransformer.fetch(data));
            })
            .catch(err => {
                console.error(err);
            });
    },

    getQuizFromFolder({ commit }, folder) {
        commit('CLEAR_QUIZZES_LIST');
        new QuizzesAPI()
            .getQuizzes({ folderId: folder })
            .then(resp => {
                commit(
                    'SET_QUIZZES',
                    QuizTransformer.fetchCollections(resp.result)
                );
                commit(
                    'SET_QUIZZES_LIST',
                    QuizTransformer.fetchList(resp.result)
                );
            })
            .catch(err => {
            });
    },

    getQuiz({ commit }, id) {
        return new QuizzesAPI()
            .getQuizById(id)
            .then(resp => {
                commit('SET_QUIZZES', [QuizTransformer.fetch(resp.result)]);
                return resp;
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    createQuiz({ commit }, data) {
        let sendData = QuizTransformer.send(data);
        new QuizzesAPI()
            .createQuiz(sendData)
            .then(resp => {
                Vue.notify({ type: 'info', title: 'Quiz created' });
                commit('ADD_QUIZ', {
                    quiz: QuizTransformer.fetch(
                        Object.assign(
                            {
                                _id: resp.id,
                                title: data.name
                            },
                            sendData
                        )
                    ),
                    listItem: QuizTransformer.fetchList([
                        { _id: resp.id, title: data.name }
                    ])[0]
                });
                Vue.router.push({
                    name: 'QuizzesEdit',
                    params: { id: resp.id }
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    updateQuiz({ commit }, json) {
        let sendData = QuizTransformer.send(json.data);
        new QuizzesAPI()
            .updateQuiz(json.id, sendData)
            .then(() => {
                Vue.notify({ type: 'info', title: 'Quiz updated' });
                commit('UPDATE_QUIZ', {
                    quiz: QuizTransformer.fetch(
                        Object.assign(
                            {
                                _id: json.id,
                                title: json.data.name
                            },
                            sendData
                        )
                    ),
                    listItem: QuizTransformer.fetchList([
                        { _id: json.id, title: json.data.name }
                    ])[0]
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    getQuizImages({ commit }, id) {
        new QuizzesAPI()
            .getImages(id)
            .then(resp => {
                commit('SET_QUIZ_IMAGES', resp);
            })
            .catch(err => {
                console.error(err);
            });
    },

    getQuizById({ commit }, json) {
        new QuizzesAPI()
            .getQuizById(json.id, json.query)
            .then(response => {
                response.result.quiz.requestLang = json.query.language;
                commit(
                    'SET_QUIZ_METADATA',
                    QuizTransformer.fetchMetaData(response.result)
                );
                commit(
                    'SET_QUIZ_QUESTIONS',
                    QuizTransformer.fetchQuestions(response.result.quiz)
                );
                commit(
                    'SET_QUIZ_ANSWERS',
                    QuizTransformer.fetchAnswers(response.result.quiz)
                );
                commit(
                    'SET_STATISTIC',
                    QuizTransformer.fetchStatistic(response.result.quiz)
                );
            })
            .catch(error => {
                if (error.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
            });
    }
};
