import Transformer from './Transformer';

export default class QuizFoldersTransformer extends Transformer {
    static fetch(item) {
        return {
            id: item._id,
            name: item.title,
            children: []
        };
    }

    static send(item) {
        return {
            customerId: item.customer,
            title: item.name
        };
    }
}
