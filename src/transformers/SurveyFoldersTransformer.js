import Transformer from './Transformer';

export default class SurveyFoldersTransformer extends Transformer {
    static fetch(item) {
        return {
            id: item._id,
            name: item.title
        };
    }

    static send(item) {
        return {
            customerId: item.customer,
            title: item.name
        };
    }
}
