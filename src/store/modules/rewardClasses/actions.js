import RewardClassesAPI from '../../../api/RewardClassesAPI';
export default {
    addRewardClassPoints(context) {
        new RewardClassesAPI()
            .create(context.getters.getPointsRequestBody)
            .then(resp => {
            })
            .catch((err) => {
            });
    },
    getRewardClasses() {
        new RewardClassesAPI()
            .getAll()
            .then(resp => {
            })
            .catch((err) => {
            });
    },
    deleteRewardClass(classId)
    {
        new RewardClassesAPI()
        .delete(classId)
        .then(resp => {
        })
        .catch((err) => {
        });

    }
};
