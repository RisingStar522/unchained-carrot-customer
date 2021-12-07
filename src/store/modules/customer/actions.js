import Vue from 'vue';
import CustomerAPI from '../../../api/CustomerAPI';
import CustomerProgramTransformer from '../../../transformers/CustomerProgramTransformer';

export default {
    getCustomer({ commit }) {
        return new CustomerAPI()
            .getCustomer()
            .then(resp => {
                commit('SET_CUSTOMER', resp);
                return true;
            })
            .catch(() => {
                return false;
            });
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
                commit(
                    'SET_CUSTOMER_SETTINGS',
                    resp[0]
                );
            })
            .catch(err => {
                console.error(err);
            });
    }
};
