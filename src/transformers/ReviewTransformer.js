import Transformer from './Transformer';
export default class ReviewTransformer extends Transformer {
    static fetchList(array) {
        return array.map(item => {
            return {
                id: item._id,
                link: {
                    name: 'ReviewsEdit',
                    params: { id: item._id }
                },
                name: item.reviewName
            };
        });
    }

    static fetch(item) {
        return {
            id: item._id,
            link: {
                name: 'ReviewsEdit',
                params: { id: item._id }
            },
            name: item.reviewName
        };
    }

    static sendReview({
        reviewName,
        reviewType,
        reviewOption,
        folderId,
        images,
        eventName,
        rewardType,
        surveyIds,
        quizIds,
        redirectUrls,
        rewardAmount
    }) {
        return {
            reviewName,
            reviewType,
            folderId,
            options: reviewOption,
            images,
            eventName,
            redirectUrls,
            surveyIds,
            quizIds,
            rewardName: rewardType,
            rewardAmount
        };
    }
}
