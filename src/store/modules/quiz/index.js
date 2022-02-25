/* ============
 * Quiz Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        allQuizzes: [],
        folders: [],
        quizzes: {},
        quizzesList: [],
        selectedFolder: '',
        isCompleting: false,
        quizImages: [],
        questionTemplate: {
            questionText: 'New question',
            isSponsored: null,
            answers: [
                {
                    answerText: null,
                    correct: true,
                    label: 'A'
                },
                {
                    answerText: null,
                    correct: false,
                    label: 'B'
                },
                {
                    answerText: null,
                    correct: false,
                    label: 'C'
                },
                {
                    answerText: null,
                    correct: false,
                    label: 'D'
                }
            ],
            textHint: null,
            correctAnswer: 'A',
            links: {
                imageQuestionUrl: null,
                learnMoreUrl: null
            }
        },
        current: {
            id: null,
            customer: null,
            title: null,
            secondsToComplete: null,
            fiftyFiftyAvailable: null,
            hintAvailable: null,
            answersModel: [],
            answers: [],
            questions: [],
            statistic: {
                usedTime: 0,
                allowedTime: 0,
                answersCount: 0,
                numberOfQuestions: 0
            }
        }
    },
    actions,
    getters,
    mutations
};
