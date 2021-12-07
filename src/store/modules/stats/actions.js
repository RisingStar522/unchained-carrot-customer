import StatsAPI from '../../../api/StatsAPI';
import StatsTransformer from '../../../transformers/StatsTransformer';

export default {
    getProgramsStats({ commit }, id) {
        new StatsAPI()
            .getProgramsStats(id)
            .then(resp => {
                commit(
                    'SET_PROGRAMS_STATS',
                    StatsTransformer.fetchPrograms(resp)
                );
            })
            .catch(() => {});
    },

    getSurveyStats({ commit }, id) {
        new StatsAPI()
            .getSurveysStats(id)
            .then(resp => {
                commit(
                    'SET_SURVEYS_STATS',
                    StatsTransformer.fetchSurveys(resp)
                );
            })
            .catch(() => {});
    },

    getQuizzesStats({ commit }, id) {
        new StatsAPI()
            .getQuizzesStats(id)
            .then(resp => {
                commit(
                    'SET_QUIZZES_STATS',
                    StatsTransformer.fetchQuizzes(resp.data, resp.questions)
                );
            })
            .catch(() => {});
    }
};
