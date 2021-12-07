<template>
    <div id="app">
        <router-view />
        <notifications />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { submitTrackingEvent } from './services/TrackingService';
export default {
    computed: {
        ...mapGetters(['allIntegrations', 'activeIntegrations'])
    },
    methods: {
        async handleLoginEvent(data) {
            if (data.loggedIn) {
                let profile = await this.$store.dispatch('getCustomer');
                if (!profile) {
                    localStorage.setItem('accountCreated', 'false');
                    this.$router.push({ name: 'CreateAccount' });
                } else {
                    this.$store.dispatch('getRewards');
                    localStorage.setItem('accountCreated', 'true');
                    if (this.$router.name === 'CreateAccount') {
                        this.$router.push({ name: 'Home' });
                    }
                }
                // Send Tracking Event With UCC SDK
                await submitTrackingEvent(
                    'CUSTOMER_LOGGED_IN',
                    {  },
                    this.$store.getters['customerData']
                );
            }
        },
        getActiveIntegrations() {
            this.$store.dispatch('getIntegrations').catch(err => {
                this.$notify({
                    title: err.response.data.name,
                    text: err.response.data.reason,
                    type: 'error'
                });
            });
        }
    },
    mounted() {
        const availableIntegrations =
            Object.keys(this.activeIntegrations).length > 0;
        if (!availableIntegrations) {
            setTimeout(this.getActiveIntegrations, 5000);
        }
    }
};
</script>
<style>
#nprogress .bar {
    background: #2f3380 !important;
}
#nprogress .spinner-icon {
    border-left-color: #2f3380 !important;
    border-top-color: #2f3380 !important;
}
</style>
