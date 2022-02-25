import UserProfilesAPI from '../../../api/UserProfilesAPI';
// import TrafficRoutesTransformer from '../../../transformers/TrafficRoutesTransformer';

export default {
    getUserProfilePersonas({ commit }) {
        return new Promise((resolve, reject) => {
            new UserProfilesAPI()
                .getPersonas()
                .then(resp => {
                    commit(
                        'SET_PERSONAS',
                        resp.result
                        // TrafficRoutesTransformer.fetchList(resp.result)
                    );
                    resolve(resp);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }
};
