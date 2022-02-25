import Transformer from './Transformer';

export default class StatsTransformer extends Transformer {
    static fetch(item) {
        return item;
    }

    static send(item) {
        return item;
    }

    static fetchPrograms(array) {
        return array
            .sort((a, b) => +new Date(a.date) - +new Date(b.date))
            .map(item => {
                return {
                    date: item.date.split('T')[0],
                    referrals: item.count,
                    rewards: item.rewards
                };
            });
    }

    static fetchSurveys(array) {
        return array
            .sort((a, b) => +new Date(a.date) - +new Date(b.date))
            .map(item => {
                return {
                    date: item.date.split('T')[0],
                    completed: item.completed,
                    responses: item.count
                };
            });
    }

    static fetchQuizzes(array, questionsData) {
        let data = {};
        let questions = {};
        array.forEach(item => {
            let date = item.timeStamp.split('T')[0];
            if (!data[date]) data[date] = [];
            let correctAnswers = item.answers.filter(
                answer => answer.answerGiven === answer.answerCorrect
            );
            item.answers.map(answer => {
                if (!questions[answer.questionId]) {
                    questions[answer.questionId] = {
                        title: questionsData.find(
                            obj => obj.questionId === answer.questionId
                        ).questionText,
                        data: []
                    };
                }
                questions[answer.questionId].data.push({
                    hintUsed: answer.hintUsed,
                    fiftyFiftyUsed: answer.fiftyFiftyUsed,
                    answerA: answer.answerGiven.toUpperCase() === 'A',
                    answerB: answer.answerGiven.toUpperCase() === 'B',
                    answerC: answer.answerGiven.toUpperCase() === 'C',
                    answerD: answer.answerGiven.toUpperCase() === 'D'
                });
            });
            data[date].push({
                answers: item.answers.length,
                fullyCorrect: item.answers.length === correctAnswers.length,
                partiallyCorrect: item.answers.length !== correctAnswers.length
            });
        });
        let dates = Object.keys(data).sort(
            (a, b) => +new Date(a) - +new Date(b)
        );
        let questionsIds = Object.keys(questions);
        return {
            dates: dates.map(date => {
                return {
                    date: date,
                    responses: data[date].length,
                    fullyAnswers: data[date].filter(item => item.fullyCorrect)
                        .length,
                    partiallyCorrect: data[date].filter(
                        item => item.partiallyCorrect
                    ).length
                };
            }),
            questions: questionsIds.map(id => {
                return {
                    id: id,
                    title: questions[id].title,
                    hintUsed: questions[id].data.filter(item => item.hintUsed)
                        .length,
                    fiftyFiftyUsed: questions[id].data.filter(
                        item => item.fiftyFiftyUsed
                    ).length,
                    bothUsed: questions[id].data.filter(
                        item => item.hintUsed && item.fiftyFiftyUsed
                    ).length,
                    answerA: questions[id].data.filter(item => item.answerA)
                        .length,
                    answerB: questions[id].data.filter(item => item.answerB)
                        .length,
                    answerC: questions[id].data.filter(item => item.answerC)
                        .length,
                    answerD: questions[id].data.filter(item => item.answerD)
                        .length
                };
            })
        };
    }
}
