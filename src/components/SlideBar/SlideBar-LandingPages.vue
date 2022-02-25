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
                        'sidebar-active': active === 'CampaignLandingPages'
                    }"
                >
                    <router-link :to="{ name: 'CampaignLandingPages' }">
                        Pages
                    </router-link>
                </li>
                <li
                    class="nav-item"
                    :class="{
                        'sidebar-active':
                            active === 'CampaignLandingPagesTrafficRoutes'
                    }"
                >
                    <router-link
                        :to="{ name: 'CampaignLandingPagesTrafficRoutes' }"
                    >
                        Traffic Routes
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlideBarLandingPages',
    data() {
        return {
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
            if (routeName.search('CampaignLandingPages') !== -1) {
                this.active = 'CampaignLandingPages';
            }
            if (routeName.search('CampaignLandingPagesTrafficRoutes') !== -1) {
                this.active = 'CampaignLandingPagesTrafficRoutes';
            }
        }
    }
};
</script>
