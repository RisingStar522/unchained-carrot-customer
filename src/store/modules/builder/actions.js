import BuilderAPI from '../../../api/BuilderAPI';

export default {
    getLandingPageTemplates({ commit }) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .getLandingPageTemplates()
                .then(resp => {
                    commit('SET_TEMPLATES', resp.result);
                    return resolve(resp);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    createLandingPageTemplate(_, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .createLandingPageTemplate(payload)
                .then(resp => {
                    return resolve(resp);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    createLandingPage(_, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .createLandingPage(payload)
                .then(resp => {
                    return resolve(resp);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    getLandingPageTemplate(_, templateId) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .getLandingPageTemplate(templateId)
                .then(resp => resolve(resp))
                .catch(error => reject(error));
        });
    },
    getLandingPages({ commit }) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .getLandingPages()
                .then(resp => {
                    commit('SET_PAGES', resp.result);
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    getLandingPage(_, pageId) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .getLandingPage(pageId)
                .then(resp => resolve(resp))
                .catch(e => reject(e));
        });
    },
    deleteLandingPageTemplate({ commit }, templateId) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .deleteLandingPageTemplate(templateId)
                .then(resp => {
                    commit('UPDATE_TEMPLATE_LIST', resp.result);
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    deleteLandingPage({ commit }, pageId) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .deleteLandingPage(pageId)
                .then(resp => {
                    console.log(resp);
                    commit('UPDATE_PAGE_LIST', resp.result);
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    updateLandingPageTemplate({ commit }, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .updateLandingPageTemplate(payload)
                .then(resp => {
                    commit('UPDATE_TEMPLATE', resp.result);
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    updateLandingPage({ commit }, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .updateLandingPage(payload)
                .then(resp => {
                    commit('UPDATE_PAGE', resp.result);
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    publishPage({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .publishPage(payload)
                .then(async resp => {
                    const { landingPageId } = payload;

                    try {
                        const { data } = await dispatch(
                            'getLandingPage',
                            landingPageId
                        );
                        commit('UPDATE_PAGE', data);
                    } catch (error) {}

                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    unpublishPage({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .unpublishPage(payload)
                .then(async resp => {
                    const { landingPageId } = payload;

                    try {
                        const { data } = await dispatch(
                            'getLandingPage',
                            landingPageId
                        );
                        commit('UPDATE_PAGE', data);
                    } catch (error) {}

                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    provisionLandingPage(_, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .provisionLandingPage(payload)
                .then(resp => resolve(resp))
                .catch(e => reject(e));
        });
    },
    getEmailTemplates({ commit }) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .getEmailTemplates()
                .then(({ result }) => {
                    commit('SET_EMAIL_TEMPLATES', result);
                    resolve(result);
                })
                .catch(e => reject(e));
        });
    },
    createEmailTemplate(_, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .createEmailTemplate(payload)
                .then(resp => resolve(resp))
                .catch(e => reject(e));
        });
    },
    deleteEmailTemplate({ commit }, templateId) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .deleteEmailTemplate(templateId)
                .then(resp => {
                    commit('UPDATE_EMAIL_TEMPLATE_LIST', resp.result);
                    return resolve(resp);
                })
                .catch(e => reject(e));
        });
    },
    getEmailTemplate(_, templateId) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .getEmailTemplate(templateId)
                .then(({ result }) => {
                    resolve(result);
                })
                .catch(e => reject(e));
        });
    },
    updateEmailTemplate({ commit }, payload) {
        return new Promise((resolve, reject) => {
            new BuilderAPI()
                .updateEmailTemplate(payload)
                .then(resp => {
                    commit('UPDATE_EMAIL_TEMPLATE', resp.result);
                    resolve(resp);
                })
                .catch(e => reject(e));
        });
    }
};
