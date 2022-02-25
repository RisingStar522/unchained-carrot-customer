import Transformer from './Transformer';

export default class CustomerSettingTransformer extends Transformer {
    static fetch(item) {
        return {
            id: item._id,
            defaultCurrency: item.defaultCurrency,
            posSystem: item.posSystem,
            webShopSystem: item.webShopSystem,
            defaultLocale: item.defaultLocale
        };
    }

    static send(item) {
        return item;
    }
}
