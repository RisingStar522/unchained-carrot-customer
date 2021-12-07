import Transformer from './Transformer';

export default class PassTemplatesTransformer extends Transformer {
    static fetch(item) {
        return {
            passTemplateId: item.passTemplateId,
            customerId: item.customerId,
            name: item.name,
            passStyle: item.passStyle,
            defaultLanguage: item.defaultLanguage,
            standardKeys: item.standardKeys,
            associatedAppKeys: item.associatedAppKeys,
            relevanceKeys: item.relevanceKeys,
            visualAppearanceKeys: item.visualAppearanceKeys,
            webServiceKeys: item.webServiceKeys,
            nfcEnabled: item.nfcEnabled,
            images: item.images,
            structure: item.structure
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                passTemplateId: item.passTemplateId,
                customerId: item.customerId,
                name: item.name,
                passStyle: item.passStyle,
                defaultLanguage: item.defaultLanguage,
                standardKeys: item.standardKeys,
                associatedAppKeys: item.associatedAppKeys,
                relevanceKeys: item.relevanceKeys,
                visualAppearanceKeys: item.visualAppearanceKeys,
                webServiceKeys: item.webServiceKeys,
                nfcEnabled: item.nfcEnabled,
                images: item.images,
                structure: item.structure
            };
        });
    }

    static send(item) {
        return {
            name: item.name,
            passStyle: item.passStyle,
            defaultLanguage: item.defaultLanguage,
            standardKeys: item.standardKeys ? item.standardKeys : {},
            associatedAppKeys: item.associatedAppKeys ? item.associatedAppKeys : {},
            relevanceKeys: item.relevanceKeys ? item.relevanceKeys : {},
            visualAppearanceKeys: item.visualAppearanceKeys ? item.visualAppearanceKeys : {},
            webServiceKeys: item.webServiceKeys ? item.webServiceKeys : {},
            nfcEnabled: item.nfcEnabled ? item.nfcEnabled : {},
            images: item.images ? item.images : {},
            structure: item.structure ? item.structure : {}
        };
    }
}
