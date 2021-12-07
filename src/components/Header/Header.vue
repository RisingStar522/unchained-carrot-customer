<template>
    <header class="app-header" :class="{ 'with-slidebar': withSlidebar }">
        <div class="logo-block" v-if="pageName === 'RefByMe'">
            <img
                src="@/assets/images/ReferredByMe.svg"
                alt="ReferredByMe"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'WalletDrop'">
            <img
                src="@/assets/images/WalletDrop.png"
                alt="ReferredByMe"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'ReviewByMe'">
            <img
                src="@/assets/images/review_by_me_logo-15.png"
                alt="ReviewByMe"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Segment'">
            <img
                src="@/assets/images/integrations/segment.png"
                alt="Segment"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Countr'">
            <img
                src="@/assets/images/integrations/countr.png"
                alt="Countr"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Mailchimp'">
            <img
                src="@/assets/images/integrations/mailchimp.png"
                alt="Mailchimp"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Quicksight'">
            <img
                src="@/assets/images/integrations/quicksight.png"
                alt="Quicksight"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Woocommerce'">
            <img
                src="@/assets/images/integrations/woocommerce.png"
                alt="Woocommerce"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Bricklink'">
            <img
                src="@/assets/images/integrations/bricklink.png"
                alt="Bricklink"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Mandrill'">
            <img
                src="@/assets/images/integrations/mandrill.png"
                alt="Mandrill"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Calendly'">
            <img
                src="@/assets/images/integrations/calendly.png"
                alt="Calendly"
                class="logo-img"
            />
        </div>
        <div class="logo-block" v-else-if="pageName === 'Zoom'">
            <img
                src="@/assets/images/integrations/zoom.png"
                alt="Calendly"
                class="logo-img"
            />
        </div>

        <div v-else-if="withSlidebar === true" class="nav nav-slide-bar">
            <b-nav-item @click="toggleSlideBar">
                <fa-icon icon="bars" />
            </b-nav-item>
        </div>

        <div v-if="!isAdmin" class="d-flex p-3" style="width: 500px;">
            <!-- <b-form-input
                class="mr-1"
                v-model="text"
                placeholder="...March Campaign"
            ></b-form-input> -->
            <b-form-input
                list="input-list"
                class="mr-1"
                v-model="campaignSearchText"
                id="input-with-list"
                @change="campaignTextChanged"
            ></b-form-input>
            <b-form-datalist
                id="input-list"
                :options="campaignList"
            ></b-form-datalist>
            <b-button variant="brand">Search</b-button>
        </div>

        <b-navbar-nav class="nav">
            <FeatureToggleDropdown />
            <!-- <LanguageDropdown />
            <AlertDropdown /> -->
            <UserDropdown />
        </b-navbar-nav>
    </header>
</template>
<script>
import UserDropdown from './UserDropdown.vue';
// import AlertDropdown from './AlertDropdown.vue';
// import LanguageDropdown from './LanguageDropdown.vue';
import FeatureToggleDropdown from './FeatureToggleDropdown';
import { mapGetters } from 'vuex';

export default {
    name: 'header-component',
    components: {
        UserDropdown,
        // AlertDropdown,
        // LanguageDropdown,
        FeatureToggleDropdown
    },
    props: {
        withSlidebar: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            campaignSearchText: '',
            campaignList: ['Campaign 1', 'March Campaign', 'Join Referral'],
            slideBarPages: [
                'Surveys',
                'SurveysActivate',
                'SurveysNew',
                'SurveysEdit',
                'Quizzes',
                'QuizzesActivate',
                'QuizzesNew',
                'QuizzesEdit',
                'Rewards',
                'Rewards-Points-General',
                'Rewards-Points-Images',
                'Rewards-Points-Distribution',
                'Rewards-Points-Personalization',
                'Rewards-Points-Data-Science',
                'Rewards-Coupon-General',
                'Rewards-Coupon-Images',
                'Rewards-Coupon-Distribution',
                'Rewards-Coupon-Personalization',
                'Rewards-Coupon-Data-Science',
                'Rewards-Coupon-Redeem-OmniChannel',
                'Rewards-Coupon-Redeem-Coalition',
                'Rewards-Coupon-Redeem-Value',
                'Rewards-Coupon-Redeem-Categories',
                'RewardsNew',
                'RewardsEdit',
                'SurveysStatistics',
                'QuizzesStatistics',
                'ReviewByMe',
                'ReviewsFolder',
                'ReviewsEdit',
                'ReviewsNew',
                'Segment',
                'Countr',
                'Mailchimp',
                'Quicksight',
                'Woocommerce',
                'Bricklink',
                'Mandrill',
                'Calendly',
                'Zoom',
                'RewardEngine',
                'RewardRules',
                'LeaderboardSettings',
                'LeaderboardGeneralSettings',
                'LeaderboardColorsSettings',
                'LeaderboardEmbedSettings',
                'LeaderboardImagesSettings',
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
            ]
        };
    },
    computed: {
        ...mapGetters(['isAdmin']),
        pageName() {
            return this.$route.name;
        }
    },
    watch: {
        pageName() {
            this.toggleSlideBar(true);
            if (this.pageName == 'SurveysNew') this.toggleSlideBar(false);
        }
    },
    methods: {
        /**
         * Check whether the campaign text is one of the campaign names
         * If not, set it to blank on change. Fires on input @change event
         *
         * @param {String} value - input value
         */
        campaignTextChanged(value) {
            if (value !== '') {
                const cList = this.campaignList;
                if (!cList.includes(value)) {
                    this.campaignSearchText = '';
                }
            }
        },
        toggleSlideBar(pageChanged) {
            if (this.withSlidebar === true) {
                if (pageChanged === true) {
                    document.body.classList.remove('app-slidebar--hidden');
                } else {
                    document.body.classList.toggle('app-slidebar--hidden');
                    document
                        .querySelector('#bee-container')
                        .classList.toggle('bee-container__slidebar-open');
                    document
                        .querySelector('#bee-container')
                        .classList.toggle('bee-container__slidebar-closed');
                }
            } else {
                document.body.classList.add('app-slidebar--hidden');
            }
        }
    }
};
</script>
