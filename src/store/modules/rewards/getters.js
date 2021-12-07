export default {
    hasRewards: () => true, //state.hasRewards,
    rewardsList: state => state.rewardsList,
    rewardBlockchains: state => state.rewardBlockchains,
    rewardTokenTypes: state => state.rewardTokenTypes,
    rewardTypes: state => state.rewardTypes,
    rewardById: state => id => state.rewards[id] || null
};
