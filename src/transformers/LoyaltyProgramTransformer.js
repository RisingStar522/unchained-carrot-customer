import Transformer from './Transformer';
export default class LoyaltyProgramTransformer extends Transformer {
    static fetchLevels(response) {
        return response.result.levels;
    }

    static fetchPagination(response) {
        return {
            limit: response.limit,
            total: response.total,
            offset: response.offset
        };
    }
}
