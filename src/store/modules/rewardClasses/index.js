/* ============
 * Rewards Classes Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    state: {   
        addClassRequestBody:{
            rewardClassName: "points",
            providerId: "dummyID132",
            providerRewardId: "dummyID123",
            rewardDescription: "dummy description",
            valueProposition: "saving",
            discount: true,
            crossOrganizational: true,
            rewardFaceValue: 0,
            rewardCostPrice: 0,
            limitedTimeOffer: true,
            fomo: true,
            timeToRedemption: "future",
            timeLimitedRedemption: true,
            rewardProbability: 0,
            redemptionProbability: 0,
            redemptionPrerequisite: "none",
            personalizationSettings: {
              key: "percentage",
              valueFunctionUrl: "dummy url"
            },
            images: [
              {
                type: "thumbnail",
                url: "string",
                contentLanguage: "EN",
                megeTags: "FNAME, LNAME, PERCENTAGE,"
              }
            ]
          }
    },
    actions,
    getters,
    mutations
};
