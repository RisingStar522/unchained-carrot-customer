<template>
    <div class="app-slidebar email-slidebar">
        <router-link class="header" to="/emailbroadcasts/add">
            Create Email
            <span class="btn-icon btn-outline">
                <fa-icon class="addIcon" icon="plus-circle" />
            </span>
        </router-link>
        <div class="content">
            <ul class="nav">
                <li
                    class="nav-item"
                    :class="{ 'sidebar-active': active === 'EmailBroadcasts' }"
                >
                    <router-link :to="{ name: 'EmailBroadcasts' }">
                        Email Broadcasts
                    </router-link>
                </li>

                <li
                    class="nav-item"
                    :class="{ 'sidebar-active': active === 'AudienceSegments' }"
                >
                    <router-link :to="{ name: 'AudienceSegments' }">
                        Segments
                    </router-link>
                </li>
                <li
                    class="nav-item"
                    :class="{ 'sidebar-active': active === 'EmailSenders' }"
                >
                    <router-link :to="{ name: 'EmailSenders' }">
                        Senders
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slidebar-review-component',
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
            if (routeName.search('EmailBroadcasts') !== -1) {
                this.active = 'EmailBroadcasts';
            }
            if (routeName.search('AudienceSegments') !== -1) {
                this.active = 'AudienceSegments';
            }
            if (routeName.search('EmailSenders') !== -1) {
                this.active = 'EmailSenders';
            }
        }
    }
};
</script>
