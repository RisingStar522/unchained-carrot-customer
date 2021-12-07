import Transformer from './Transformer';

export default class ReviewFoldersTransformer extends Transformer {
    static fetch({ _id, title, customerId }) {
        return {
            id: _id,
            name: title,
            customerId
        };
    }

    static send({ name }) {
        return {
            title: name
        };
    }
}
