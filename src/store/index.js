import Vue from 'vue';
import Vuex from 'vuex';

// Import modules
import customer from './modules/customer';
import survey from './modules/survey';
import quiz from './modules/quiz';
import rewards from './modules/rewards';
import RewardClasses from './modules/rewardClasses';
import RewardSets from './modules/rewardSets';
import stats from './modules/stats';
import reviews from './modules/reviews';
import countr from './modules/countr';
import integrations from './modules/integrations';
import builder from './modules/builder';
import trafficroutes from './modules/trafficroutes';
import webhooks from './modules/webhooks';
import leaderboard from './modules/leaderboard';
import applewallet from './modules/applewallet';
import app from './modules/app';
import loyaltyprograms from './modules/loyaltyprograms';
import landingpages from './modules/landingpages';
import campaigns from './modules/campaigns';
import userProfiles from './modules/userProfiles';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        app,
        customer,
        survey,
        quiz,
        rewards,
        RewardClasses,
        RewardSets,
        stats,
        reviews,
        countr,
        integrations,
        builder,
        trafficroutes,
        webhooks,
        leaderboard,
        applewallet,
        loyaltyprograms,
        landingpages,
        campaigns,
        userProfiles
    },
    state: {
        countries: require('../assets/countries.json'),
        locales: [
            { id: 'en-US', label: 'English' },
            { id: 'nl-NL', label: 'Dutch' },
            { id: 'it-IT', label: 'Italiana' },
            { id: 'ru-RU', label: 'Русский' }
        ],
        allFeatureFlags: {
            Test: [
                'Loyalty',
                'Surveys',
                'Quizzes',
                'Rewards',
                'ReviewByMe',
                'Integrations',
                'Quicksight',
                'EmailBuilder',
                'EmailRules',
                'PageBuilder',
                'RewardEngine',
                'RewardClasses',
                'RewardRules',
                'Leaderboards',
                'TrafficRoutes',
                'Webhooks',
                'AppleWallet',
                'EmailBroadcasts',
                'LoyaltyPrograms',
                'Performance',
                'Goals',
                'Promotion',
                'Notifications',
                'CampaignLandingPages',
                'Personas',
                'SocialMedia'
            ],
            Beta: [
                'Loyalty',
                'Surveys',
                'Quizzes',
                'RewardClasses',
                'Rewards',
                'ReviewByMe',
                'Integrations'
            ],
            Prod: [
                // 'Surveys',
                // 'Quizzes',
                // 'ReviewByMe',
                // 'Integrations',
                // 'RewardClasses',
                'TrafficRoutes',
                'SocialMedia'
            ]
        }
    }
});

export default store;
