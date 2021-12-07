import Transformer from './Transformer';

export default class OutgoingWebhooksTransformer extends Transformer {
    static fetch(item) {
        return {
            subscriptionKey: item.subscriptionKey,
            topic: item.topic,
            endPoint: item.endPoint,
            apiKey: item.apiKey,
            apiKeyHeader: item.apiKeyHeader,
            hmacKey: item.hmacKey,
            hmacAlgorithm: item.hmacAlgorithm,
            hmacSignatureHeader: item.hmacSignatureHeader,
            status: item.status
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                subscriptionKey: item.subscriptionKey,
                topic: item.topic,
                endPoint: item.endPoint,
                apiKey: item.apiKey,
                apiKeyHeader: item.apiKeyHeader,
                hmacKey: item.hmacKey,
                hmacAlgorithm: item.hmacAlgorithm,
                hmacSignatureHeader: item.hmacSignatureHeader,
                status: item.status
            };
        });
    }

    static send(item) {
        return {
            topic: item.topic,
            endPoint: item.endPoint,
            apiKey: item.apiKey,
            apiKeyHeader: item.apiKeyHeader,
            hmacKey: item.hmacKey,
            hmacAlgorithm: item.hmacAlgorithm,
            hmacSignatureHeader: item.hmacSignatureHeader,
            status: item.status
        };
    }
}
