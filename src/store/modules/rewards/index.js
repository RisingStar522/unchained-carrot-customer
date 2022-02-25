/* ============
 * Rewards Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {
        hasRewards: false,
        rewardsList: [],
        rewards: {},
        rewardBlockchains: ['Ethereum'],
        rewardTokenTypes: ['ERC20', 'ERC721'],
        rewardTypes: ['Points']
    },
    actions,
    getters,
    mutations
};
