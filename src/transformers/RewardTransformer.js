import Transformer from './Transformer';

export default class RewardTransformer extends Transformer {
    static fetch(item) {
        return {
            id: item._id,
            name: item.rewardName,
            type: item.rewardType,
            blockchain: item.blockchain,
            tokenType: item.tokenType,
            address: item.tokenController.tokenContractAddress,
            iconUrl: item.iconUrl
        };
    }

    static fetchList(array) {
        return array.map(item => {
            return {
                id: item._id,
                link: { name: 'RewardsEdit', params: { id: item._id } },
                name: item.rewardName
            };
        });
    }

    static send(item) {
        return {
            contractAddress: item.address,
            rewardType: item.type,
            rewardName: item.name,
            blockchain: item.blockchain,
            tokenType: item.tokenType,
            iconUrl: item.iconUrl
        };
    }
}
