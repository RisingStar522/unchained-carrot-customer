import RewardSetsAPI from '../../../api/RewardSetsAPI';
export default {
    getRewardSets() {
        new RewardSetsAPI()
            .getAll()
            .then(resp => {
            })
            .catch((err) => {
            });
    },
    deleteRewardSets(setId)
    {
        new RewardSetsAPI()
        .delete(setId)
        .then(resp => {
        })
        .catch((err) => {
        });

    }
};
