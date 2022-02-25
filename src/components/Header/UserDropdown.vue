<template>
    <b-nav-item-dropdown right class="user-dropdown">
        <template slot="button-content">
            {{ customerData.contactPerson | nameFilter }}
        </template>
        <b-dropdown-item
            v-for="item in buttons"
            :key="item.link"
            :to="{ name: item.link }"
        >
            <span class="icon">
                <fa-icon :icon="item.icon" />
            </span>
            <span class="name">
                {{ item.name }}
            </span>
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
            <span class="icon">
                <fa-icon icon="sign-out-alt" />
            </span>
            <span class="name">
                Logout
            </span>
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
import { mapGetters } from 'vuex';
import { submitTrackingEvent } from '../../services/TrackingService';
export default {
    name: 'user-dropdown-component',
    data() {
        return {
            buttons: [
                { name: 'Account', link: 'Account', icon: 'user' },
                { name: 'Settings', link: 'Settings', icon: 'cog' }
            ]
        };
    },
    filters: {
        nameFilter: function(value) {
            if (value.length > 12) return value.substr(0, 12) + '..';
            return value;
        }
    },
    computed: {
        ...mapGetters(['customerData'])
    },
    methods: {
        async logout() {
            // Send Tracking Event With UCC SDK
            await submitTrackingEvent(
                'CUSTOMER_LOGGED_OUT',
                {},
                this.$store.getters['customerData']
            );
            this.$auth.logout();
        }
    }
};
</script>
