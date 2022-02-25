import Transformer from './Transformer';
import store from '../store';

const getAnswersArray = answers => {
    let arr = answers.filter(val => !val.correct).map(val => val._id);
    let count = parseInt(arr.length / 2);
    while (count !== 0) {
        arr.sort(() => Math.random() - 0.5);
        arr.pop();
        count--;
    }
    return answers.map(val => {
        return {
            text: val.answerText,
            value: val.label,
            hide: arr.indexOf(val._id) !== -1
        };
    });
};

export default class QuizTransformer extends Transformer {
    static fetch(item) {
        let questions = store.state.locales.reduce((acc, cur) => {
            acc[cur.id] = [];
            return acc;
        }, {});
        for (let i in item.quiz.questions) {
            let quest = item.quiz.questions[i];
            if (quest.language && questions[quest.language])
                questions[quest.language] = quest.listOfQuestions;
        }
        return {
            id: item._id,
            name: item.title,
            timeLimit: item.quiz.secondsToComplete,
            useFiftyFifty: item.quiz.fiftyFiftyAvailable,
            useHint: item.quiz.hintAvailable,
            questions: questions,
            rewards: item.quiz.rewards || {},
            lifeCycle: item.lifeCycle || {},
            folder: item.folderId,
            customer: item.customerId
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                id: item._id,
                link: { name: 'QuizzesActivate', params: { id: item._id } },
                name: item.title
            };
        });
    }

    static send(item) {
        let questions = [];
        Object.keys(item.questions).map(lang => {
            questions.push({
                language: lang,
                listOfQuestions: item.questions[lang]
            });
        });
        return {
            folderId: item.folder,
            quiz: {
                title: item.name,
                secondsToComplete: parseInt(item.timeLimit),
                fiftyFiftyAvailable: item.useFiftyFifty || false,
                hintAvailable: item.useHint || false,
                questions: questions,
                rewards: item.rewards || {}
            },
            lifeCycle: item.lifeCycle || {}
        };
    }

    static fetchMetaData(data) {
        return {
            id: data._id,
            customer: data.customerId,
            secondsToComplete: data.quiz.secondsToComplete,
            fiftyFiftyAvailable: data.quiz.fiftyFiftyAvailable,
            hintAvailable: data.quiz.hintAvailable,
            title:
                data.quiz.questions.find(
                    item => item.language === data.quiz.requestLang
                ).title || ''
        };
    }

    static fetchQuestions(data) {
        let question =
            data.questions.find(item => item.language === data.requestLang) ||
            {};
        return question.listOfQuestions.map(item => {
            return {
                questionId: item._id,
                questionText: item.questionText,
                sponsored: item.isSponsored,
                correctAnswer: item.correctAnswer,
                textHint: item.textHint,
                imageQuestionUrl: item.links.imageQuestionUrl,
                learnMoreUrl: item.links.learnMoreUrl,
                answers: getAnswersArray(item.answers)
            };
        });
    }

    static fetchAnswers(data) {
        let question =
            data.questions.find(item => item.language === data.requestLang) ||
            {};
        return question.listOfQuestions.map(item => {
            return {
                questionId: item._id,
                answerGiven: null,
                answerCorrect: item.correctAnswer,
                timeStamp: null,
                fiftyFiftyUsed: false,
                hintUsed: false
            };
        });
    }

    static fetchStatistic(data) {
        let question =
            data.questions.find(item => item.language === data.requestLang) ||
            {};
        return {
            usedTime: 0,
            allowedTime: data.secondsToComplete,
            answersCount: 0,
            numberOfQuestions: question.listOfQuestions.length
        };
    }

    static setAnswer(item, data) {
        return {
            questionId: item.questionId,
            answerGiven: data.answer || null,
            answerCorrect: item.answerCorrect,
            timeStamp: new Date(),
            fiftyFiftyUsed: data.fiftyFiftyUsed || false,
            hintUsed: data.hintUsed || false
        };
    }
}
