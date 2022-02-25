import Transformer from './Transformer';

export default class IncomingWebhooksTransformer extends Transformer {
    static fetch(item) {
        return {
            eventTrackerId: item.eventTrackerId,
            key: item.key,
            externalSystem: item.externalSystem,
            topic: item.topic,
            queueUrl: item.queueUrl,
            securitySettings: item.securitySettings,
            status: item.status
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                eventTrackerId: item.eventTrackerId,
                key: item.key,
                externalSystem: item.externalSystem,
                topic: item.topic,
                queueUrl: item.queueUrl,
                securitySettings: item.securitySettings,
                status: item.status
            };
        });
    }

    static send(item) {
        return {
            externalSystem: item.externalSystem,
            topic: item.topic,
            queueUrl: item.queueUrl,
            securitySettings: item.securitySettings,
            status: item.status
        };
    }
}
