<template>
    <li
        class="nav-group"
        v-if="(nav.requiredRewards && hasRewards) || !nav.requiredRewards"
    >
        <div :class="'nav-item' + (parentActive ? ' nav-item--active' : '')">
            <router-link
                tag="a"
                class="nav-link"
                :to="{ name: nav.linkName }"
                v-b-toggle="'nav-link-' + nav.linkName"
            >
                <span class="nav-icon">
                    <img :src="nav.icon" alt="" />
                </span>
                <span class="nav-name">
                    {{ nav.name }}
                </span>
                <span class="nav-arrow" v-if="nav.pages && nav.pages.length">
                    <fa-icon
                        :icon="shownCollapse ? 'chevron-up' : 'chevron-down'"
                    />
                </span>
                <span class="nav-arrow" v-if="nav.hasSidenav">
                    <fa-icon icon="chevron-right" />
                </span>
            </router-link>
        </div>
        <b-collapse
            v-if="nav.pages"
            :id="'nav-link-' + nav.linkName"
            @show="toggleCollapse(true)"
            @hide="toggleCollapse(false)"
            :visible="parentActive"
            class="nav-menu"
            tag="ul"
        >
            <li
                v-for="page in nav.pages"
                :key="page.linkName"
                :class="
                    'nav-item' +
                        (routerName.startsWith(page.linkName)
                            ? ' nav-item--active'
                            : '')
                "
            >
                <router-link
                    tag="a"
                    class="nav-link"
                    :to="{ name: page.linkName }"
                    v-b-toggle="'nav-link-' + page.linkName"
                >
                    <span class="nav-icon"> </span>
                    <span class="nav-name">
                        {{ page.name }}
                    </span>
                </router-link>
            </li>
        </b-collapse>
    </li>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'aside-nav-item-component',
    props: ['nav'],
    data() {
        return {
            shownCollapse: false
        };
    },
    created() {
        this.toggleCollapse(this.parentActive);
    },
    computed: {
        ...mapGetters(['hasRewards']),
        parentActive() {
            return (
                this.routerName.startsWith(this.nav.linkName) ||
                (this.nav.pages &&
                    this.nav.pages
                        .map(page => page.linkName)
                        .filter(link => this.routerName.startsWith(link))
                        .length > 0)
            );
        },
        routerName() {
            return this.$route.name;
        }
    },
    methods: {
        toggleCollapse(status) {
            this.shownCollapse = status;
        }
    }
};
</script>
