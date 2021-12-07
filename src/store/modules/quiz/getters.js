export default {
    quizFolders: state => state.folders,
    allQuizzes: state => state.allQuizzes,
    selectedQuizFolder: state => state.selectedFolder,
    quizCompleting: state => state.isCompleting,
    quizById: state => id => state.quizzes[id] || null,
    quizzesList: state => state.quizzesList,
    quizQuestionTemplate: state => Object.assign({}, state.questionTemplate),
    quizImages: state => state.quizImages,
    quizMeta: state => {
        return {
            id: state.current.id,
            title: state.current.title,
            secondsToComplete: state.current.secondsToComplete,
            fiftyFiftyAvailable: state.current.fiftyFiftyAvailable,
            hintAvailable: state.current.hintAvailable
        };
    },
    quizAnswers: state => state.current.answers,
    quizQuestions: state => state.current.questions,
    quizStatistic: state => state.current.statistic,
    quizCorrectCount: state =>
        state.current.answers.filter(
            item => item.answerGiven === item.answerCorrect
        ).length
};
