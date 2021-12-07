<template>
    <div>
        <aside class="app-aside">
            <div class="header">
                <router-link tag="a" class="brand" :to="{ name: 'Home' }">
                    <img
                        src="@/assets/images/logo.png"
                        class="brand-img"
                        alt="Brand logo"
                    />
                </router-link>
                <a class="menu-btn" @click="toggleAside">
                    <fa-icon :icon="asideHide ? 'indent' : 'outdent'" />
                </a>
            </div>
            <div class="content d-flex flex-column justify-content-between">
                <ul class="nav">
                    <AsideNavItem
                        v-for="(nav, index) in filteredNav"
                        :nav="nav"
                        :key="`${nav.linkName}${index}`"
                        :class="`${nav.linkName}${index}`"
                    />
                </ul>

                <div
                    v-if="asideHide === false && isTestMode"
                    class="d-flex justify-content-center my-4"
                    style="width:100%"
                >
                    <Button
                        @click="switchToCampaign"
                        v-if="isAdmin"
                        style="background:#F79946;"
                        class="btn btn-primary btn-lg"
                        >Switch to Campaign
                    </Button>
                    <Button
                        @click="switchToAdmin"
                        v-else
                        style="background:#F79946;"
                        class="btn btn-primary btn-lg"
                        >Switch to Admin</Button
                    >
                </div>
                <!-- <div v-else class="ml-auto my-4 mr-2">
                    <Button
                        @click="switchToCampaign"
                        v-if="isAdmin"
                        style="background:#F79946;"
                        class="btn btn-primary btn-sm"
                        >STC
                    </Button>
                    <Button
                        @click="switchToAdmin"
                        v-else
                        style="background:#F79946;"
                        class="btn btn-primary btn-sm"
                        >STA</Button
                    >
                </div> -->
            </div>
        </aside>
    </div>
</template>

<script>
import AsideNavItem from './AsideNavItem';
import { mapGetters } from 'vuex';
// import { isEnabled } from 'vue-feature-flipping';
import { submitTrackingEvent } from '../../services/TrackingService';

export default {
    name: 'aside-component',
    components: {
        AsideNavItem
    },
    data() {
        return {
            asideHide: false,
            navigation: [],
            adminNavigation: [
                {
                    name: 'Personas',
                    icon: require('../../assets/icons/Surveys.svg'),
                    hasSidenav: false,
                    linkName: 'Personas'
                },
                {
                    name: 'Loyalty Programs',
                    icon: require('../../assets/icons/Reward Rules.svg'),
                    hasSidenav: true,
                    linkName: 'LoyaltyPrograms'
                },
                {
                    name: 'Loyalty',
                    icon: 'layer-group',
                    requiredRewards: true,
                    pages: [
                        {
                            name: 'Referred By Me',
                            linkName: 'RefByMe'
                        },
                        { name: 'WalletDrop', linkName: 'WalletDrop' },
                        { name: 'Lottery', linkName: 'Lottery' }
                    ]
                },

                // {
                //     name: 'Reward Engine',
                //     icon: require('../../assets/icons/Reward Engine.svg'),
                //     hasSidenav: false,
                //     linkName: 'RewardEngine'
                // },
                {
                    name: 'Reward Rules',
                    icon: require('../../assets/icons/Reward Rules.svg'),
                    hasSidenav: true,
                    linkName: 'RewardRules'
                },
                {
                    name: 'Apple Wallet',
                    icon: require('../../assets/icons/AppleWallet.svg'),
                    hasSidenav: false,
                    linkName: 'AppleWallet'
                },
                {
                    name: 'Email Rules',
                    icon: require('../../assets/icons/Email.svg'),
                    hasSidenav: false,
                    linkName: 'EmailRules'
                },
                {
                    name: 'Email Templates',
                    icon: require('../../assets/icons/Email.svg'),
                    hasSidenav: false,
                    linkName: 'EmailBuilder'
                },
                {
                    name: 'Email Broadcasts',
                    icon: require('../../assets/icons/Email.svg'),
                    hasSidenav: false,
                    linkName: 'EmailBroadcasts'
                },
                {
                    name: 'Landing Pages',
                    icon: require('../../assets/icons/Page Builder.svg'),
                    hasSidenav: false,
                    linkName: 'PageBuilder'
                },
                {
                    name: 'Traffic Routes',
                    icon: require('../../assets/icons/TrafficRoutes.svg'),
                    hasSidenav: true,
                    linkName: 'TrafficRoutes'
                },
                {
                    name: 'ReviewByMe',
                    icon: require('../../assets/icons/Reviews.svg'),
                    hasSidenav: true,
                    linkName: 'ReviewByMe'
                },
                {
                    name: 'Surveys',
                    icon: require('../../assets/icons/Surveys.svg'),
                    requiredRewards: true,
                    linkName: 'Surveys',
                    pages: []
                },
                {
                    name: 'Quizzes',
                    icon: require('../../assets/icons/Quizzes.svg'),
                    linkName: 'Quizzes',
                    requiredRewards: true,
                    pages: []
                },
                {
                    name: 'Leaderboards',
                    icon: require('../../assets/icons/Leaderboard.svg'),
                    hasSidenav: false,
                    linkName: 'Leaderboards'
                },
                {
                    name: 'Integrations',
                    icon: require('../../assets/icons/Integrations.svg'),
                    hasSidenav: false,
                    linkName: 'Integrations'
                },
                {
                    name: 'Webhooks',
                    icon: require('../../assets/icons/Webhooks.svg'),
                    hasSidenav: false,
                    linkName: 'Webhooks'
                },
                {
                    name: 'Social Media',
                    icon: require('../../assets/icons/Surveys.svg'),
                    hasSidenav: false,
                    linkName: 'SocialMedia'
                }
            ],
            campaignNavigation: [
                {
                    name: 'Performance',
                    icon: require('../../assets/icons/performance.svg'),
                    hasSidenav: false,
                    linkName: 'Performance'
                },
                {
                    name: 'Goals',
                    icon: require('../../assets/icons/goals.svg'),
                    hasSidenav: false,
                    linkName: 'Goals'
                },
                {
                    name: 'Promotion',
                    icon: require('../../assets/icons/promotion.svg'),
                    hasSidenav: false,
                    linkName: 'Promotion'
                },
                {
                    name: 'Landing Pages',
                    icon: require('../../assets/icons/Page Builder.svg'),
                    hasSidenav: false,
                    linkName: 'CampaignLandingPages'
                },
                {
                    name: 'Notifications',
                    icon: require('../../assets/icons/notifications.svg'),
                    hasSidenav: false,
                    linkName: 'Notifications'
                },
                {
                    name: 'Data',
                    icon: require('../../assets/icons/data.svg'),
                    hasSidenav: false,
                    linkName: 'Data'
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['isAdmin']),
        pageName() {
            return this.$route.name;
        },
        filteredNav() {
            const nav = this.navigation;

            return nav.filter(element => {
                return element.linkName;
                // return isEnabled(element.linkName);
            });
        },
        isTestMode() {
            const isTestMode = localStorage.getItem('featureMode');
            return isTestMode === 'Test';
        }
    },
    watch: {
        pageName() {
            const pagesToCollapseAsideOn = ['PageBuilder/page'];
            const hideAside = this.collapseAsideOnThesePages(
                pagesToCollapseAsideOn
            );

            if (hideAside) {
                document.body.classList.add('app-aside--hidden');
                this.asideHide = hideAside;
            }
        }
    },
    created() {
        window.onresize = this.checkScreenSize;
        this.checkScreenSize();
        this.navigation = this.adminNavigation;
    },
    methods: {
        switchToCampaign() {
            // Send Tracking Event With UCC SDK
            submitTrackingEvent(
                'CUSTOMER_CHANGED_VIEW',
                { isAdmin: false },
                this.$store.getters['customerData']
            );
            this.$store.commit('SET_IS_ADMIN', false);
            this.navigation = this.campaignNavigation;
        },
        switchToAdmin() {
            // Send Tracking Event With UCC SDK
            submitTrackingEvent(
                'CUSTOMER_CHANGED_VIEW',
                { isAdmin: true },
                this.$store.getters['customerData']
            );
            this.$store.commit('SET_IS_ADMIN', true);
            this.navigation = this.adminNavigation;
        },
        toggleAside() {
            document.body.classList.toggle('app-aside--hidden');
            this.asideHide = !this.asideHide;
        },
        checkScreenSize() {
            if (
                window.innerWidth < 992 &&
                !document.body.classList.contains('app-aside--hidden')
            ) {
                this.toggleAside();
            }
        },
        collapseAsideOnThesePages(pageList) {
            const currentPage = this.$route.name;
            if (pageList.includes(currentPage)) return true;

            return false;
        }
    },
    mounted() {
        // document.body.classList.toggle('app-aside--hidden');
        // this.asideHide = !this.asideHide;
    }
};
</script>
