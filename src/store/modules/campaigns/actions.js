// import Vue from 'vue';
import CampaignsAPI from '../../../api/CampaignsAPI';
// import LeaderboardTransformer from '../../../transformers/LeaderboardTransformer';

export default {
    getCampaigns({ commit }, data) {
        new CampaignsAPI().getAll({}).then(resp => {
            commit('SET_CAMPAIGNS', resp.result);
        });
    },

    createCampaign({ commit }, data) {
        new CampaignsAPI()
            .createCampaign({
                name: 'Test campaign',
                description: 'A campaign for testing'
            })
            .then(resp => {
            });
    }
};
