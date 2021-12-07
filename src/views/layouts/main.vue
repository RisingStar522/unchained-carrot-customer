<template>
    <div class="app" v-if="accountCreated">
        <AsideMain />
        <div class="app-body">
            <AppHeader :withSlidebar="slideBarShown" />
            <main>
                <SlideBarSurvey v-if="showSlideBarSurvey" />
                <SlideBarQuiz v-if="showSlideBarQuiz" />
                <SlideBarRewardPoints v-if="showSlideBarRewardPoints" />
                <SlideBarRewardCoupon v-if="showSlideBarRewardCoupon" />
                <SlideBarReview v-if="showSlideBarReview" />
                <SlideBarRewardRules v-if="showSlideBarRewardRules" />
                <SlideBarLeaderboards v-if="showSlideBarLeaderboard" />
                <SlideBarAppleWallet v-if="showSlideBarAppleWallet" />
                <SlideBarEmail v-if="showSlideBarEmails" />
                <SlideBarEmailRules v-if="showSlideBarEmailsRules" />
                <SlideBarGoals v-if="showSlideBarGoals" />
                <SlideBarLandingPages v-if="showSlideBarLandingPages" />
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
import AppHeader from '../../components/Header/Header';
import AsideMain from '../../components/Aside/Aside';
import SlideBarSurvey from '../../components/SlideBar/SlideBar-Survey';
import SlideBarQuiz from '../../components/SlideBar/SlideBar-Quiz';
import SlideBarRewardPoints from '../../components/SlideBar/SlideBar-Reward-points';
import SlideBarRewardCoupon from '../../components/SlideBar/SlideBar-Reward-Coupon';
import SlideBarReview from '../../components/SlideBar/SlideBar-Review';
import SlideBarRewardRules from '../../components/SlideBar/SlideBar-RewardRules';
import SlideBarLeaderboards from '../../components/SlideBar/SlideBar-Leaderboards';
import SlideBarAppleWallet from '../../components/SlideBar/SlideBar-AppleWallet';
import SlideBarEmail from '../../components/SlideBar/SlideBar-Email';
import SlideBarEmailRules from '../../components/SlideBar/SlideBar-EmailRules';
import SlideBarGoals from '../../components/SlideBar/SlideBar-Goals';
import SlideBarLandingPages from '../../components/SlideBar/SlideBar-LandingPages';

// TODO: Remove fontawesome since feather icons is installed

export default {
    name: 'main-layout',
    components: {
        AppHeader,
        AsideMain,
        SlideBarSurvey,
        SlideBarQuiz,
        // SlideBarReward,
        SlideBarReview,
        SlideBarRewardRules,
        SlideBarLeaderboards,
        SlideBarAppleWallet,
        SlideBarEmail,
        SlideBarEmailRules,
        SlideBarGoals,
        SlideBarLandingPages,
        SlideBarRewardPoints,
        SlideBarRewardCoupon
    },
    data() {
        return {
            slideBarSurvey: [
                'Surveys',
                'SurveysActivate',
                'SurveysNew',
                'SurveysEdit',
                'SurveysStatistics'
            ],
            slideBarQuiz: [
                'Quizzes',
                'QuizzesActivate',
                'QuizzesNew',
                'QuizzesEdit',
                'QuizzesStatistics'
            ],
            // slideBarReward: ['Rewards', 'RewardsNew', 'RewardsEdit'],
            slideBarReview: [
                'ReviewByMe',
                'ReviewsNew',
                'ReviewsEdit',
                'ReviewsFolder'
            ],
            slideBarRewardRules: ['RewardRules'],
            slideBarLeaderboards: [
                'LeaderboardSettings',
                'LeaderboardGeneralSettings',
                'LeaderboardColorsSettings',
                'LeaderboardEmbedSettings',
                'LeaderboardImagesSettings'
            ],
            slideBarAppleWallet: [
                'TemplateSettings',
                'TemplateGeneralSettings',
                'TemplateImageSettings',
                'TemplateColorsSettings',
                'TemplateBarcodeSettings',
                'TemplateHeaderSettings',
                'TemplatePrimarySettings',
                'TemplateSecondarySettings',
                'TemplateAuxiliarySettings',
                'TemplateAppSettings',
                'TemplateNFCSettings'
            ],
            slideBarEmails: [
                'EmailBroadcasts',
                'EmailBroadcastsAddCampaign',
                'EmailBroadcastsStatistics',
                'AudienceSegments',
                'AudienceSegmentsAdd',
                'EmailSenders',
                'EmailSendersAdd'
            ],
            slideBarEmailsRules: ['EmailRules', 'EmailRulesEventAdd'],
            slideBarGoals: [
                'Goals',
                'GoalsTargetAudience',
                'GoalsIncentivizedAction',
                'GoalsEngagementGoal'
            ],
            slideBarLandingPages: [
                'CampaignLandingPages',
                'CampaignLandingPagesTrafficRoutes'
            ],
            rewardClassPoints: [
                'Rewards-Points-General',
                'Rewards-Points-Images',
                'Rewards-Points-Distribution',
                'Rewards-Points-Personalization',
                'Rewards-Points-Data-Science',
                'Rewards-Points-Image-Upload'
            ],
            rewardClassCoupon: [
                'Rewards-Coupon-General',
                'Rewards-Coupon-Images',
                'Rewards-Coupon-Distribution',
                'Rewards-Coupon-Redeem',
                'Rewards-Coupon-Personalization',
                'Rewards-Coupon-Data-Science',
                'Rewards-Coupon-Image-Upload',
                'Rewards-Coupon-Redeem-OmniChannel',
                'Rewards-Coupon-Redeem-Coalition',
                'Rewards-Coupon-Redeem-Value',
                'Rewards-Coupon-Redeem-Categories'
            ]
        };
    },
    computed: {
        accountCreated() {
            return localStorage.getItem('accountCreated') === 'true';
        },
        showSlideBarSurvey() {
            return this.slideBarSurvey.indexOf(this.$route.name) !== -1;
        },
        showSlideBarQuiz() {
            return this.slideBarQuiz.indexOf(this.$route.name) !== -1;
        },
        showSlideBarRewardPoints() {
            return this.rewardClassPoints.indexOf(this.$route.name) !== -1;
        },
        showSlideBarRewardCoupon() {
            return this.rewardClassCoupon.indexOf(this.$route.name) !== -1;
        },
        showSlideBarReview() {
            return this.slideBarReview.includes(this.$route.name);
        },
        showSlideBarRewardRules() {
            return this.slideBarRewardRules.includes(this.$route.name);
        },
        showSlideBarLeaderboard() {
            return this.slideBarLeaderboards.includes(this.$route.name);
        },
        showSlideBarAppleWallet() {
            return this.slideBarAppleWallet.includes(this.$route.name);
        },
        showSlideBarEmails() {
            return this.slideBarEmails.includes(this.$route.name);
        },
        showSlideBarEmailsRules() {
            return this.slideBarEmailsRules.includes(this.$route.name);
        },
        showSlideBarGoals() {
            return this.slideBarGoals.includes(this.$route.name);
        },
        showSlideBarLandingPages() {
            return this.slideBarLandingPages.includes(this.$route.name);
        },
        slideBarShown() {
            return (
                this.showSlideBarSurvey ||
                this.showSlideBarQuiz ||
                this.showSlideBarReview ||
                this.showSlideBarRewardRules ||
                this.showSlideBarLeaderboard ||
                this.showSlideBarEmails ||
                this.showSlideBarAppleWallet ||
                this.showSlideBarLandingPages
            );
        }
    }
};
</script>
