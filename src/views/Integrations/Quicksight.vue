<template>
    <div class="content">
        <div class="my-2">
            <B-btn
                variant="outline-brand"
                aria-roledescription="go back"
                title="go back"
                @click="$router.back()"
            >
                <fa-icon icon="arrow-left"
            /></B-btn>
        </div>
        <div class="py-4">
            <h4 class="text-brand">Integrations - Quicksight</h4>
        </div>

        <h5 class="text-brand">
            Allow Unchained Carrot to interact with your Quicksight Source
        </h5>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="User Arn"
                        label-for="user-arn"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="quicksight.userArn"
                            id="user-arn"
                            v-validate="'required'"
                            name="user-arn"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('user-arn')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            @click="addQuicksightIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                !quicksight.userArn ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            {{
                                quicksightIsAvailableInStore ? 'Update' : 'Save'
                            }}
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="quicksightIsAvailableInStore"
                            @click="deleteQuicksightIntegration"
                            class="ml-3"
                            variant="danger"
                        >
                            <fa-icon class="text-white" icon="trash-alt"
                        /></b-btn>
                    </div>
                </b-form>
            </div>
            <div class="col-md-4">
                <!-- <b-card>
                    <div>
                        <fa-icon class="text-brand" icon="info-circle" />
                    </div>
                    <div class="text-secondary">
                        You can find this information in the API keys section of
                        the Source Settings
                    </div>
                </b-card> -->
            </div>
        </b-row>
        <b-row v-if="quicksightIsAvailableInStore">
            <div id="dashboardContainer" class="content"></div>
        </b-row>
    </div>
</template>

<script>
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';
import { mapGetters } from 'vuex';

export default {
    name: 'integrations-quicksight-page',
    data: () => ({
        loading: false,
        quicksight: {
            userArn: ''
        }
    }),
    computed: {
        ...mapGetters(['quicksightIntegration']),
        quicksightIsAvailableInStore() {
            return Object.keys(this.quicksightIntegration).length > 0;
        }
    },
    watch: {
        quicksightIsAvailableInStore() {
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
    },
    methods: {
        getQuicksightIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'QUICKSIGHT')
                .then(resp => {
                    if (this.quicksightIsAvailableInStore) {
                        const {
                            userArn
                        } = this.$store.state.integrations.QUICKSIGHT.credentials;
                        this.quicksight.userArn = userArn;
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_QUICKSIGHT_INTEGRATION',
                            resp
                        );
                        this.$forceUpdate();
                    }
                })
                .catch(err => {
                });
        },
        deleteQuicksightIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'QUICKSIGHT')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_QUICKSIGHT_INTEGRATION',
                            resp
                        );
                        this.$notify({
                            title: 'Success',
                            text: 'Integration deleted successfully',
                            type: 'success'
                        });

                        this.$router.push({ name: 'Integrations' });
                    })
                    .catch(err => {
                        this.$notify({
                            title: err.response.data.name,
                            text: err.response.data.reason,
                            type: 'error'
                        });
                        this.loading = false;
                    });
            }
        },
        updateQuicksightIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(resp => {
                            this.$store.commit(
                                'SET_CUSTOMER_QUICKSIGHT_INTEGRATION',
                                resp
                            );
                            this.getQuicksightIntegration();
                            this.$notify({
                                title: 'Success',
                                text: 'Integration updated successfully',
                                type: 'success'
                            });
                            this.loading = false;
                        })
                        .catch(err => {
                            this.$notify({
                                title: err.response.data.name,
                                text: err.response.data.reason,
                                type: 'error'
                            });
                            this.loading = false;
                        });
                }
            });
        },
        addQuicksightIntegration() {
            const payload = {
                externalSystem: 'QUICKSIGHT',
                baseUrl: process.env.VUE_APP_API_HOST,
                credentials: {
                    accountId: process.env.VUE_APP_ACCOUNT_ID,
                    userArn: this.quicksight.userArn
                }
            };
            if (this.quicksightIsAvailableInStore) {
                return this.updateQuicksightIntegration(payload);
            }
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getQuicksightIntegration();
                            this.$notify({
                                title: 'Success',
                                text: 'Integration added successfully',
                                type: 'success'
                            });
                            this.loading = false;
                        })
                        .catch(err => {
                            this.$notify({
                                title: err.response.data.name,
                                text: err.response.data.reason,
                                type: 'error'
                            });
                            this.loading = false;
                        });
                }
            });
        }
    },
    created() {
        this.getQuicksightIntegration();
    },
    mounted() {
        if (!this.quicksightIsAvailableInStore) {
            this.getQuicksightIntegration();
        } else {
            if (this.quicksightIsAvailableInStore) {
                const {
                    userArn
                } = this.$store.state.integrations.QUICKSIGHT.credentials;
                this.quicksight.userArn = userArn;
            }
        }
    }
};
</script>
