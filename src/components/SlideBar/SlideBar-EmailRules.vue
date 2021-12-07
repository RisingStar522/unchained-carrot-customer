<template>
    <div class="app-slidebar email-slidebar">
        <div class="header">
            Add Source
            <span class="btn-icon btn-outline">
                <fa-icon class="addIcon" icon="plus-circle" />
            </span>
        </div>
        <div class="content">
            <ul class="nav">
                <li
                    class="nav-item sidebar-active"
                    :class="{ 'sidebar-active': active === 'EmailBroadcasts' }"
                >
                    <router-link :to="{ name: 'EmailRules' }">
                        Segment
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
            active: ''
        };
    },
    components: {},
    mounted() {
        const routeName = this.$route.name;
        this.changeActive(routeName);
    },
    watch: {
        $route(to, from) {
            this.changeActive(to.name);
        }
    },
    methods: {
        changeActive(routeName) {
            if (routeName.search('EmailRules') !== -1) {
                this.active = 'EmailRules';
            }
        }
    }
};
</script>
