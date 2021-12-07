import CountrAPI from '../../../api/CountrAPI';

export default {
    getAuthorization({ commit }, { customerId, authorizationCode }) {
        return new Promise((resolve, reject) => {
            new CountrAPI()
                .getAuthorization({ customerId, authorizationCode })
                .then(resp => resolve(resp))
                .catch(err => reject(err));
        });
    }
};
