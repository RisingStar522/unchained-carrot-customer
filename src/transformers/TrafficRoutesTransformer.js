import Transformer from './Transformer';

export default class TrafficRoutesTransformer extends Transformer {
    static fetch(item) {
        return {
            _id: item._id,
            title: item.title,
            shortenedDomain: item.shortenedDomain,
            shortenedCode: item.shortenedCode,
            destinations: item.destinations,
            utmSource: item.utmSource,
            utmMedium: item.utmMedium,
            utmCampaign: item.utmCampaign,
            utmTerm: item.utmTerm,
            utmContent: item.utmContent,
            qr: item.qr,
            createdAt: item.createdAt,
            redirectLimit: item.redirectLimit,
            redirectLimitReachedUrl: item.redirectLimitReachedUrl,
            redirectExpiresOn: item.redirectExpiresOn,
            redirectExpiredUrl: item.redirectExpiredUrl,
            redirects: item.redirects
        };
    }

    static fetchList(array) {
        return array.map(item => {
            const shortendLink =
                item.shortenedDomain + '/' + item.shortenedCode;
            return {
                _id: item._id,
                title: item.title,
                shortenedDomain: item.shortenedDomain,
                shortenedCode: item.shortenedCode,
                shortenedLink: shortendLink,
                redirects: item.redirects,
                destinations: item.destinations,
                utmCampaign: item.utmCampaign,
                utmSource: item.utmSource,
                utmMedium: item.utmMedium,
                utmTerm: item.utmTerm,
                utmContent: item.utmContent,
                qr: item.qr,
                status: item.status,
                createdAt: item.createdAt,
                redirectLimit: item.redirectLimit,
                redirectLimitReachedUrl: item.redirectLimitReachedUrl,
                redirectExpiresOn: item.redirectExpiresOn,
                redirectExpiredUrl: item.redirectExpiredUrl
            };
        });
    }

    static send(item) {
        return {
            title: item.title,
            shortenedDomain: item.shortenedDomain,
            shortenedCode: item.shortenedCode,
            destinations: item.destinations,
            utmSource: item.utmSource,
            utmMedium: item.utmMedium,
            utmCampaign: item.utmCampaign,
            utmTerm: item.utmTerm,
            utmContent: item.utmContent,
            qr: item.qr,
            redirectLimit: item.redirectLimit,
            redirectLimitReachedUrl: item.redirectLimitReachedUrl,
            redirectExpiresOn: item.redirectExpiresOn,
            redirectExpiredUrl: item.redirectExpiredUrl
        };
    }
}
