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
            <h4 class="text-brand">Integrations - Calendly</h4>
        </div>

        <h5 class="text-brand">
            Allow Unchained Carrot to interact with your Calendly Source
        </h5>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="Access Token"
                        label-for="access-token"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="calendly.accessToken"
                            id="access-token"
                            v-validate="'required'"
                            name="access-token"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('access-token')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            @click="addCalendlyIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                !calendly.accessToken ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            {{ calendlyAvailableInStore ? 'Update' : 'Save' }}
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="calendlyAvailableInStore"
                            @click="deleteCalendlyIntegration"
                            class="ml-3"
                            variant="danger"
                        >
                            <fa-icon class="text-white" icon="trash-alt"
                        /></b-btn>
                    </div>
                </b-form>

                <div>
                    <h5>How To Get Access Token</h5>

                    <div class="container">
                        <h6>Step 1</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/calendlyHelp/1.png"
                                alt="Calendly"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 2</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/calendlyHelp/2.png"
                                alt="Calendly"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 3</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/calendlyHelp/3.png"
                                alt="Calendly"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 4</h6>

                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/calendlyHelp/4.png"
                                alt="Calendly"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 5</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/calendlyHelp/5.png"
                                alt="Calendly"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 6</h6>

                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/calendlyHelp/6.png"
                                alt="Calendly"
                            />
                        </div>
                    </div>
                </div>
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
        <b-row v-if="calendlyAvailableInStore">
            <div id="dashboardContainer" class="content"></div>
        </b-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'integrations-calendly-page',
    data: () => ({
        loading: false,
        calendly: {
            accessToken: ''
        }
    }),
    computed: {
        ...mapGetters(['calendlyIntegration']),
        calendlyAvailableInStore() {
            return Object.keys(this.calendlyIntegration).length > 0;
        }
    },
    methods: {
        getCalendlyIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'CALENDLY')
                .then(resp => {
                    if (this.calendlyAvailableInStore) {
                        const {
                            accessToken
                        } = this.calendlyIntegration.credentials;
                        this.calendly.accessToken = accessToken;
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_CALENDLY_INTEGRATION',
                            resp
                        );
                        const { accessToken } = resp.credentials;
                        this.calendly = { ...this.calendly, accessToken };
                    }
                })
                .catch(err => {
                });
        },
        deleteCalendlyIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'CALENDLY')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_CALENDLY_INTEGRATION',
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
        updateCalendlyIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(resp => {
                            this.$store.commit(
                                'SET_CUSTOMER_CALENDLY_INTEGRATION',
                                resp
                            );
                            this.getCalendlyIntegration();
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
        addCalendlyIntegration() {
            const payload = {
                externalSystem: 'CALENDLY',
                credentials: {
                    accessToken: this.calendly.accessToken
                }
            };

            if (this.calendlyAvailableInStore) {
                const { externalSystem, ...data } = payload;
                return this.updateCalendlyIntegration({ externalSystem, data });
            }

            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getCalendlyIntegration();
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
        this.getCalendlyIntegration();
    },
    mounted() {
        if (!this.calendlyAvailableInStore) {
            this.getCalendlyIntegration();
        } else {
            if ('data' in this.calendlyIntegration) {
                const {
                    accessToken
                } = this.calendlyIntegration.data.credentials;
                this.calendly = { ...this.calendly, accessToken };
            } else {
                const { accessToken } = this.calendlyIntegration.credentials;
                this.calendly = { ...this.calendly, accessToken };
            }
        }
    }
};
</script>
