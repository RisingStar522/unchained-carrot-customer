<template>
    <div class="app-slidebar email-slidebar">
        <div class="header">
            Add Campaign
            <span class="btn-icon btn-outline">
                <fa-icon class="addIcon" icon="plus-circle" />
            </span>
        </div>
        <div class="content">
            <ul class="nav">
                <li
                    class="nav-item"
                    :class="{
                        'sidebar-active': active === 'GoalsTargetAudience'
                    }"
                >
                    <router-link :to="{ name: 'GoalsTargetAudience' }">
                        Target Audience
                    </router-link>
                </li>
                <li
                    class="nav-item"
                    :class="{
                        'sidebar-active': active === 'GoalsIncentivizedAction'
                    }"
                >
                    <router-link :to="{ name: 'GoalsIncentivizedAction' }">
                        Incentivized Action
                    </router-link>
                </li>
                <li
                    class="nav-item"
                    :class="{
                        'sidebar-active': active === 'GoalsEngagementGoal'
                    }"
                >
                    <router-link :to="{ name: 'GoalsEngagementGoal' }">
                        Engagement Goal
                    </router-link>
                </li>
                <!--<li
                    class="nav-item"
                    :class="{ 'sidebar-active': active === 'EmailSenders' }"
                >
                    <router-link :to="{ name: 'EmailSenders' }">
                        Budgets
                    </router-link>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlideBarGoals',
    data() {
        return {
            broadcasts: ['EmailBroadcasts', 'EmailBroadcastsAddCampaign'],
            active: ''
        };
    },
    components: {},
    mounted() {
        const routeName = this.$route.name;
        this.changeActive(routeName);
    },
    watch: {
        $route(to) {
            this.changeActive(to.name);
        }
    },
    methods: {
        changeActive(routeName) {
            if (routeName.search('GoalsTargetAudience') !== -1) {
                this.active = 'GoalsTargetAudience';
            }
            if (routeName.search('GoalsIncentivizedAction') !== -1) {
                this.active = 'GoalsIncentivizedAction';
            }
            if (routeName.search('GoalsEngagementGoal') !== -1) {
                this.active = 'GoalsEngagementGoal';
            }
        }
    }
};
</script>
