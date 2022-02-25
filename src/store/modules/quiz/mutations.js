import Vue from 'vue';
import QuizTransformer from '../../../transformers/QuizTransformer';

export default {
    SET_QUIZ_FOLDERS(state, data) {
        state.folders = data;
    },

    SET_ALL_QUIZZES(state, data) {
        state.allQuizzes = data;
    },

    ADD_QUIZ_FOLDERS(state, data) {
        state.folders.push(data);
    },

    SELECT_QUIZ_FOLDER(state, id) {
        state.selectedFolder = id;
    },

    SET_QUIZZES(state, data) {
        for (let i in data) {
            Vue.set(state.quizzes, data[i].id, data[i]);
        }
    },

    SET_QUIZ_COMPLETING(state, status) {
        state.isCompleting = status;
    },

    SET_QUIZZES_LIST(state, data) {
        state.quizzesList = data;
    },

    CLEAR_QUIZZES_LIST(state) {
        state.surveyList = [];
    },

    ADD_QUIZ(state, data) {
        Vue.set(state.quizzes, data.quiz.id, data.quiz);
        state.quizzesList.push(data.listItem);
    },

    UPDATE_QUIZ(state, data) {
        Vue.set(state.quizzes, data.quiz.id, data.quiz);
        for (let i in state.quizzesList) {
            if (state.quizzesList[i].id === data.listItem.id) {
                Vue.set(state.quizzesList, i, data.listItem);
                break;
            }
        }
    },

    SET_QUIZ_IMAGES(state, data) {
        state.quizImages = data;
    },

    ADD_QUIZ_IMAGES(state, url) {
        state.quizImages.push(url);
    },

    SET_QUIZ_METADATA(state, data) {
        state.current.id = data.id;
        state.current.customer = data.customer;
        state.current.title = data.title;
        state.current.secondsToComplete = data.secondsToComplete;
        state.current.fiftyFiftyAvailable = data.fiftyFiftyAvailable;
        state.current.hintAvailable = data.hintAvailable;
    },

    SET_QUIZ_QUESTIONS(state, data) {
        state.current.questions = data;
    },

    SET_QUIZ_ANSWERS(state, data) {
        state.current.answersModel = data;
        state.current.answers = [].concat(data);
    },

    SET_STATISTIC(state, data) {
        state.current.statistic = data;
    },

    CLEAR_QUIZ_ANSWERS(state) {
        state.current.answers = [].concat(state.current.answersModel);
    },

    SET_QUIZ_ANSWER(state, data) {
        for (let i in state.current.answers) {
            if (state.current.answers[i].questionId === data.questionId) {
                Vue.set(
                    state.current.answers,
                    i,
                    QuizTransformer.setAnswer(state.current.answers[i], data)
                );
            }
        }
        state.current.statistic.answersCount++;
    }
};
