import Vue from 'vue';
import LeaderboardAPI from '../../../api/LeaderboardAPI';
import LeaderboardTransformer from '../../../transformers/LeaderboardTransformer';

export default {
    getAllLeaderboards({ commit }) {
        new LeaderboardAPI().getLeaderboards({}).then(resp => {
            commit('SET_ALL_LEADERBOARDS', [
                LeaderboardTransformer.fetchList(resp.result.result)
            ]);
        });
    },

    getLeaderboardById({ commit }, id) {
        return new LeaderboardAPI()
            .getLeaderboardById(id)
            .then(resp => {
                commit('SET_LEADERBOARD', [
                    LeaderboardTransformer.fetch(resp.result)
                ]);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    createLeaderboard({ commit }, data) {
        let sendData = LeaderboardTransformer.send(data);
        new LeaderboardAPI()
            .createLeaderboard(sendData)
            .then(resp => {
                Vue.notify({ type: 'info', title: 'Leaderboard created' });
                commit('ADD_LEADERBOARD', {
                    leaderboard: LeaderboardTransformer.fetch(resp),
                    listItem: LeaderboardTransformer.fetchList([
                        {
                            leaderBoardId: resp.leaderBoardId,
                            displayName: resp.displayName,
                            gameType: resp.gameType,
                            loyaltyProgramId: resp.loyaltyProgramId,
                            referralProgramId: resp.referralProgramId,
                            quizId: resp.quizId,
                            primaryScoreType: resp.primaryScoreType,
                            primaryScoreSort: resp.primaryScoreSort,
                            secondaryScoreType: resp.secondaryScoreType,
                            secondaryScoreSort: resp.secondaryScoreSort,
                            periodRankings: resp.periodRankings,
                            showTop3: resp.showTop3,
                            showYou: resp.showYou,
                            showPeriods: resp.showPeriods,
                            showAvatars: resp.showAvatars,
                            showSecondaryScore: resp.showSecondaryScore,
                            cssUrl: resp.cssUrl,
                            desktopBackgroundImageUrl:
                                resp.desktopBackgroundImageUrl,
                            mobileBackgroundImageUrl:
                                resp.mobileBackgroundImageUrl
                        }
                    ])[0]
                });
                Vue.router.push({
                    name: 'Leaderboards'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    updateLeaderboard({ commit }, json) {
        let sendData = LeaderboardTransformer.send(json.data);
        new LeaderboardAPI()
            .updateLeaderboard(json.id, sendData)
            .then(resp => {
                Vue.notify({
                    type: 'info',
                    title: 'Leaderboard has been updated successfully'
                });
                commit('UPDATE_LEADERBOARD', {
                    leaderboard: LeaderboardTransformer.fetch(resp.result),
                    listItem: LeaderboardTransformer.fetchList([
                        {
                          leaderBoardId: resp.leaderBoardId,
                          displayName: resp.displayName,
                          gameType: resp.gameType,
                          loyaltyProgramId: resp.loyaltyProgramId,
                          referralProgramId: resp.referralProgramId,
                          quizId: resp.quizId,
                          primaryScoreType: resp.primaryScoreType,
                          primaryScoreSort: resp.primaryScoreSort,
                          secondaryScoreType: resp.secondaryScoreType,
                          secondaryScoreSort: resp.secondaryScoreSort,
                          periodRankings: resp.periodRankings,
                          showTop3: resp.showTop3,
                          showYou: resp.showYou,
                          showPeriods: resp.showPeriods,
                          showAvatars: resp.showAvatars,
                          showSecondaryScore: resp.showSecondaryScore,
                          cssUrl: resp.cssUrl,
                          desktopBackgroundImageUrl:
                              resp.desktopBackgroundImageUrl,
                          mobileBackgroundImageUrl:
                              resp.mobileBackgroundImageUrl
                        }
                    ])[0]
                });
                Vue.router.push({
                    name: 'Leaderboards'
                });
            })
            .catch(err => {
                Vue.notify({ type: 'error', title: 'Error' });
            });
    },

    deleteLeaderboard({ commit }, id) {
        return new Promise((resolve, reject) => {
            new LeaderboardAPI()
                .deleteLeaderboard(id)
                .then(resp => {
                    const leaderboard = LeaderboardTransformer.fetch(resp);
                    Vue.notify({
                        type: 'info',
                        title: 'Leaderboard has been deleted successfully'
                    });
                    commit('REMOVE_LEADERBOARD', id);
                    resolve(leaderboard);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },
};
