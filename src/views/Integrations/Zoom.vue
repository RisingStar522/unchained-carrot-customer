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
            <h4 class="text-brand">Integrations - Zoom</h4>
        </div>

        <h5 class="text-brand">
            Allow Unchained Carrot to interact with your Zoom Source
        </h5>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="Configured On"
                        label-for="configured-on"
                        label-cols-md="4"
                    >
                        <b-form-input
                            disabled
                            v-model="zoom.configuredOn"
                            id="configured-on"
                            v-validate="'required'"
                            name="configured-on"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('configured-on')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            v-if="!zoomAvailableInStore"
                            @click="addZoomIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                !zoom.configuredOn ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            <!-- {{ !zoomAvailableInStore ? 'Update' : 'Activate' }} -->
                            Activate
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="zoomAvailableInStore"
                            @click="deleteZoomIntegration"
                            class="ml-auto"
                            variant="danger"
                        >
                            <fa-icon class="text-white" icon="trash-alt"
                        /></b-btn>
                    </div>
                </b-form>

                <div>
                    <h5>How To Add Zoom</h5>

                    <div class="container">
                        <h6>Step 1</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/1.png"
                                alt="Zoom step 1"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 2</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/2.png"
                                alt="Zoom step 2"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 3</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/3.png"
                                alt="Zoom step 3"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 4</h6>

                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/4.png"
                                alt="Zoom step 4"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 5</h6>
                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/5.png"
                                alt="Zoom step 5"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 6</h6>

                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/6.png"
                                alt="Zoom step 6"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 7</h6>

                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/7.png"
                                alt="Zoom step 7"
                            />
                        </div>
                    </div>
                    <div class="container">
                        <h6>Step 8</h6>

                        <div class="my-3">
                            <img
                                src="@/assets/images/integrations/zoomHelp/8.png"
                                alt="Zoom step 8"
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
        <b-row v-if="zoomAvailableInStore">
            <div id="dashboardContainer" class="content"></div>
        </b-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'integrations-zoom-page',
    data: () => ({
        loading: false,
        zoom: {
            configuredOn: new Date(Date.now()).toISOString()
        }
    }),
    computed: {
        ...mapGetters(['zoomIntegration']),
        zoomAvailableInStore() {
            return Object.keys(this.zoomIntegration).length > 0;
        }
    },
    methods: {
        getZoomIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'ZOOM')
                .then(resp => {
                    if (this.zoomAvailableInStore) {
                        const {
                            configuredOn
                        } = this.zoomIntegration.credentials;
                        this.zoom = { ...this.zoom, configuredOn };
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_ZOOM_INTEGRATION',
                            resp
                        );
                        const { configuredOn } = resp.credentials;
                        this.zoom = { ...this.zoom, configuredOn };
                    }
                })
                .catch(err => {
                });
        },
        deleteZoomIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'ZOOM')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_ZOOM_INTEGRATION',
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
        updateZoomIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(resp => {
                            this.$store.commit(
                                'SET_CUSTOMER_ZOOM_INTEGRATION',
                                resp
                            );
                            this.getZoomIntegration();
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
        addZoomIntegration() {
            const payload = {
                externalSystem: 'ZOOM',
                credentials: {
                    configuredOn: this.zoom.configuredOn
                }
            };

            if (this.zoomAvailableInStore) {
                const { externalSystem, ...data } = payload;
                return this.updateZoomIntegration({ externalSystem, data });
            }

            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getZoomIntegration();
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
        this.getZoomIntegration();
    },
    mounted() {
        if (!this.zoomAvailableInStore) {
            this.getZoomIntegration();
        } else {
            if ('data' in this.zoomIntegration) {
                const { configuredOn } = this.zoomIntegration.data.credentials;
                this.zoom = { ...this.zoom, configuredOn };
            } else {
                const { configuredOn } = this.zoomIntegration.credentials;
                this.zoom = { ...this.zoom, configuredOn };
            }
        }
    }
};
</script>
