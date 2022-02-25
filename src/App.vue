<template>
    <div id="app">
        <router-view />
        <notifications />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { submitTrackingEvent } from './services/TrackingService';
import markerSDK from '@marker.io/browser';
export default {
    data: () => {
        return {
            widget: null,
            destinationId: '61df2931d25d74217d3d8eb8'
        };
    },
    computed: {
        ...mapGetters(['allIntegrations', 'activeIntegrations'])
    },
    methods: {
        async loadMarkerSDK() {
            // Load widget using the Marker.io SDK
            this.widget = await markerSDK.loadWidget({
                destination: this.destinationId
            });

            const events = [
                'load',
                'loaderror',
                'beforeunload',
                'show',
                'hide',
                'capture',
                'feedbackbeforesend',
                'feedbacksent',
                'feedbackerror',
                'feedbackdiscarded'
            ];

            for (const eventName of events) {
                this.widget.on(eventName, () => {
                    this.eventLog += `Event "${eventName}"\n`;
                });
            }
        },

        unloadMarkerSDK() {
            this.widget.unload();
            this.widget = null;
        },
        async handleLoginEvent(data) {
            if (data.loggedIn) {
                let profile = await this.$store.dispatch('getCustomer');
                if (!profile) {
                    localStorage.setItem('accountCreated', 'false');
                    this.$router.push({ name: 'CreateAccount' });
                } else {
                    localStorage.setItem('accountCreated', 'true');
                    this.$store.dispatch('getRewards');
                    if (this.$router.name === 'CreateAccount') {
                        this.$router.push({ name: 'Home' });
                    }
                }
                // Send Tracking Event With UCC SDK
                await submitTrackingEvent(
                    'CUSTOMER_LOGGED_IN',
                    {},
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
        this.loadMarkerSDK();
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
