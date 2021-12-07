import Transformer from './Transformer';

export default class CustomerProgramTransformer extends Transformer {
    static fetch(item) {
        return {
            id: item._id,
            title: item.programTitle
        };
    }

    static send(item) {
        return item;
    }
}
