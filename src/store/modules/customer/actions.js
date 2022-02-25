import Vue from 'vue';
import CustomerAPI from '../../../api/CustomerAPI';
import CustomerWalletsAPI from '../../../api/CustomerWallets';
import CustomerDepositsAPI from '../../../api/CustomerDepositsAPI';
import CustomerEventsAPI from '../../../api/CustomerEventsAPI';
import CustomerProgramTransformer from '../../../transformers/CustomerProgramTransformer';

export default {
    async getCustomer({ commit }) {
        try {
            const resp = await new CustomerAPI().getCustomer();
            commit('SET_CUSTOMER', resp);
            return resp;
        } catch (error) {
            return error;
        }
    },

    createCustomer({ commit }, data) {
        return new CustomerAPI()
            .createCustomer(data)
            .then(resp => {
                data._id = resp.id;
                commit('SET_CUSTOMER', data);
                localStorage.setItem('accountCreated', 'true');
                return Vue.router.push({ name: 'Home' });
            })
            .catch(err => {
                console.error(err);
            });
    },

    getCustomerPrograms({ commit }) {
        new CustomerAPI()
            .getPrograms()
            .then(resp => {
                commit(
                    'SET_CUSTOMER_PROGRAMS',
                    CustomerProgramTransformer.fetchCollections(resp)
                );
            })
            .catch(err => {
                console.error(err);
            });
    },

    getCustomerSettings({ commit }) {
        new CustomerAPI()
            .getSettings()
            .then(resp => {
                commit('SET_CUSTOMER_SETTINGS', resp[0]);
            })
            .catch(err => {
                console.error(err);
            });
    },

    getCustomerWallets({ commit }) {
        new CustomerWalletsAPI()
            .getWallets()
            .then(resp => {
                commit('SET_CUSTOMER_WALLETS', resp.result);
            })
            .catch(err => {
                console.error(err);
            });
    },

    createCustomerWallet({ dispatch }, data) {
        return new Promise((resolve, reject) => {
            new CustomerWalletsAPI()
                .createWallet(data)
                .then(resp => {
                    dispatch('getCustomerWallets');
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    getCustomerDeposits({ commit }, query = {}) {
        return new Promise((resolve, reject) => {
            new CustomerDepositsAPI()
                .getDeposits(query)
                .then(resp => {
                    commit('SET_CUSTOMER_DEPOSITS', resp.result);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    getCustomerWithdrawals({ commit }, query = {}) {
        return new Promise((resolve, reject) => {
            new CustomerDepositsAPI()
                .getDeposits(query)
                .then(resp => {
                    commit('SET_CUSTOMER_WITHDRAWALS', resp.result);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    getCustomerEvents({ commit }) {
        return new Promise((resolve, reject) => {
            new CustomerEventsAPI()
                .getCustomerEvents()
                .then(resp => {
                    commit('SET_CUSTOMER_EVENTS', resp.result);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};
