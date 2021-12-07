import Vue from 'vue';
import TrafficRoutesAPI from '../../../api/TrafficRoutesAPI';
import TrafficRoutesTransformer from '../../../transformers/TrafficRoutesTransformer';

export default {
    getAllTrafficRoutes({ commit }, query = {}) {
        return new Promise((resolve, reject) => {
            new TrafficRoutesAPI()
                .getTrafficRoutes(query)
                .then(resp => {
                    commit(
                        'SET_ALL_TRAFFICROUTES',
                        TrafficRoutesTransformer.fetchList(resp.results)
                    );
                    resolve(resp);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    getTrafficRouteById({ commit }, id) {
        return new TrafficRoutesAPI()
            .getTrafficRouteById(id)
            .then(resp => {
                commit(
                    'SET_TRAFFICROUTE',
                    TrafficRoutesTransformer.fetch(resp.result)
                );
            })
            .catch(err => {
                if (err.response.status === 404) {
                    Vue.router.push({ name: 'NotFounded' });
                }
                return err;
            });
    },

    createTrafficRoute({ commit }, data) {
        let sendData = TrafficRoutesTransformer.send(data);
        return new Promise((resolve, reject) => {
            new TrafficRoutesAPI()
                .createTrafficRoute(sendData)
                .then(resp => {
                    Vue.notify({
                        type: 'info',
                        title: 'Traffic route created'
                    });
                    commit('ADD_TRAFFICROUTE', {
                        trafficRoute: TrafficRoutesTransformer.fetch(resp),
                        listItem: TrafficRoutesTransformer.fetchList([
                            {
                                _id: resp._id,
                                title: resp.title,
                                shortenedDomain: resp.shortenedDomain,
                                shortenedCode: resp.shortenedCode,
                                shortenedLink: resp.shortenedLink,
                                destinations: resp.destinations,
                                utmCampaign: resp.utmCampaign,
                                status: resp.status,
                                redirectLimit: resp.redirectLimit,
                                redirectLimitReachedUrl:
                                    resp.redirectLimitReachedUrl,
                                redirectExpiresOn: resp.redirectExpiresOn,
                                redirectExpiredUrl: resp.redirectExpiredUrl
                            }
                        ])[0]
                    });
                    resolve(resp);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    updateTrafficRoute({ commit }, json) {
        let sendData = TrafficRoutesTransformer.send(json.data);
        return new Promise((resolve, reject) => {
            new TrafficRoutesAPI()
                .updateTrafficRoute(json.id, sendData)
                .then(resp => {
                    Vue.notify({
                        type: 'info',
                        title: 'Traffic route has been updated successfully'
                    });
                    commit('UPDATE_TRAFFICROUTE', {
                        trafficRoute: TrafficRoutesTransformer.fetch(
                            resp.result
                        ),
                        listItem: TrafficRoutesTransformer.fetchList([
                            {
                                _id: resp.result._id,
                                title: resp.result.title,
                                shortenedDomain: resp.result.shortenedDomain,
                                shortenedCode: resp.result.shortenedCode,
                                shortenedLink: resp.result.shortenedLink,
                                destinations: resp.result.destinations,
                                utmCampaign: resp.result.utmCampaign,
                                utmSource: resp.result.utmSource,
                                utmMedium: resp.result.utmMedium,
                                utmTerm: resp.result.utmTerm,
                                utmContent: resp.result.utmContent,
                                qr: resp.result.qr,
                                status: resp.result.status,
                                redirectLimit: resp.result.redirectLimit,
                                redirectLimitReachedUrl:
                                    resp.result.redirectLimitReachedUrl,
                                redirectExpiresOn:
                                    resp.result.redirectExpiresOn,
                                redirectExpiredUrl:
                                    resp.result.redirectExpiredUrl
                            }
                        ])[0]
                    });
                    resolve(resp);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    deleteTrafficRoute({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            new TrafficRoutesAPI()
                .deleteTrafficRoute(id)
                .then(resp => {
                    const trafficRoute = TrafficRoutesTransformer.fetch(resp);
                    Vue.notify({
                        type: 'info',
                        title: 'Traffic route has been deleted successfully'
                    });
                    // commit('REMOVE_TRAFFICROUTE', id);
                    dispatch('getAllTrafficRoutes');
                    resolve(trafficRoute);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    publishTrafficRoute({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            new TrafficRoutesAPI()
                .publishTrafficRoute(id)
                .then(response => {
                    Vue.notify({
                        type: 'info',
                        title: 'Traffic Route has been published successfully'
                    });
                    resolve(response);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    },

    unpublishTrafficRoute({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            new TrafficRoutesAPI()
                .unpublishTrafficRoute(id)
                .then(response => {
                    Vue.notify({
                        type: 'info',
                        title: 'Traffic Route has been unpublished successfully'
                    });
                    resolve(response);
                })
                .catch(err => {
                    Vue.notify({ type: 'error', title: 'Error' });
                    reject(err);
                });
        });
    }
};
