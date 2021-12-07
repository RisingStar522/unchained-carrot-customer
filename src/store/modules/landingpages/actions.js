// import Vue from 'vue';
import LandingPagesAPI from '../../../api/LandingPagesAPI';
// import LeaderboardTransformer from '../../../transformers/LeaderboardTransformer';

export default {
    getAllLandingPages({ commit }) {
        new LandingPagesAPI().getAll({}).then(resp => {
            commit('SET_LANDING_PAGES', resp.result);
        });
    }
};
