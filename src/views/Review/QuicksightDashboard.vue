<template>
    <div id="dashboardContainer" class="content"></div>
</template>
<script>
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';
import { mapGetters } from 'vuex';

export default {
    name: 'amazon-quicksight-dashboard-page',
    computed: {
        ...mapGetters(['quicksightIntegration']),
        quicksightIsAvailableInStore() {
            return Object.keys(this.quicksightIntegration).length > 0;
        }
    },

    methods: {
        getQuicksightIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'QUICKSIGHT')
                .then(resp => {
                    this.$store.commit(
                        'SET_CUSTOMER_QUICKSIGHT_INTEGRATION',
                        resp
                    );
                })
                .catch(err => {
                    return this.$notify({
                        title: 'QUCIKSIGHT INTEGRATION UNAVAILABLE',
                        text: 'Please add a Quicksight integration',
                        type: 'error'
                    });
                });
        }
    },
    created() {
        this.getQuicksightIntegration();
    },
    mounted() {
        this.getQuicksightIntegration();

        if (this.quicksightIsAvailableInStore) {
            this.$store
                .dispatch('getAmazonQuickSightUrl', {
                    endpoint: `${process.env.VUE_APP_API_HOST}/default/quicksight-get-dashboard-url`,
                    data: {
                        params: {
                            accountId: process.env.VUE_APP_ACCOUNT_ID,
                            userArn: this.quicksightIntegration.credentials
                                .userArn,
                            dashboardId: process.env.VUE_APP_DASHBOARD_ID,
                            resetDisabled: false,
                            undoRedoDisabled: true
                        }
                    }
                })
                .then(resp => {

                    var options = {
                        url: resp.data.EmbedUrl,
                        container: '#dashboardContainer',
                        // parameters: {
                        //     country: 'United States',
                        //     states: ['California', 'Washington']
                        // },
                        scrolling: 'no',
                        height: '100vh',
                        locale: 'en-US',
                        footerPaddingEnabled: true
                    };

                    embedDashboard(options);
                })
                .catch(err => {
                });
        }
    }
};
</script>
