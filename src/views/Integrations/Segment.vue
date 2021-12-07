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
            <h4 class="text-brand">Integrations - Segment</h4>
        </div>
        <div>
            <h5 class="text-brand">
                Allow Unchained Carrot to interact with your Segment Source
            </h5>
        </div>
        <div>
            <b-row class="d-flex">
                <div class="col-md-8">
                    <b-form>
                        <b-form-group
                            label="Segment Write Key"
                            label-for="segment-write-key"
                            label-cols-md="4"
                        >
                            <b-form-input
                                v-model="segment.writeKey"
                                id="segment-write-key"
                                v-validate="'required|alpha_dash'"
                                name="segment-write-key"
                            ></b-form-input>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect(
                                    'segment-write-key'
                                )"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>

                        <b-form-group
                            label="Segment Source ID"
                            label-for="segment-source-id"
                            label-cols-md="4"
                        >
                            <b-form-input
                                v-model="segment.sourceId"
                                id="segment-source-id"
                                v-validate="'required|alpha_dash'"
                                name="segment-source-id"
                            ></b-form-input>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect(
                                    'segment-source-id'
                                )"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>

                        <div class="d-flex mb-3">
                            <b-button
                                @click="addSegmentIntegration"
                                class="ml-auto"
                                variant="brand"
                                :disabled="
                                    !(segment.writeKey && segment.sourceId) ||
                                        errors.items.length > 0 ||
                                        loading
                                "
                            >
                                {{
                                    segmentIsAvailableInStore
                                        ? 'Update'
                                        : 'Save'
                                }}
                                <b-spinner v-if="loading" small></b-spinner>
                                <span class="sr-only">Loading...</span>
                            </b-button>
                            <b-btn
                                v-if="segmentIsAvailableInStore"
                                @click="deleteSegmentIntegration"
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
                            You can find this information in the API keys
                            section of the Source Settings
                        </div>
                    </b-card> -->
                </div>
            </b-row>
        </div>

        <hr />
        <div v-if="segmentIsAvailableInStore">
            <div>
                <h5 class="text-brand">
                    Configure Unchained Carrot as a Destination in Segment
                </h5>
            </div>
            <div>
                <h6 class="text-brand">
                    Add Amazon Kinesis as a new destination for your source
                </h6>
            </div>

            <div class="row d-flex">
                <div class="col-sm-6 col-md-4">
                    <b-card class="d-flex align-items-center">
                        <div class="mb-2">
                            <img
                                src="@/assets/images/integrations/Amazon-Kinesis.png"
                                alt
                            />
                        </div>
                        <div>
                            <b-button class="btn-block" variant="brand"
                                >Add</b-button
                            >
                        </div>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'integrations-segment-page',
    data() {
        return {
            loading: false,
            segment: {
                writeKey: '',
                sourceId: ''
            },
            segmentInStore: {}
        };
    },
    computed: {
        ...mapGetters(['segmentIntegration']),
        segmentIsAvailableInStore() {
            return Object.keys(this.segmentIntegration).length > 0;
        }
    },
    methods: {
        getSegmentIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'SEGMENT')
                .then(resp => {
                    if (this.segmentIsAvailableInStore) {
                        const {
                            writeKey,
                            sourceId
                        } = this.segmentIntegration.credentials;
                        this.segment.writeKey = writeKey;
                        this.segment.sourceId = sourceId;
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_SEGMENT_INTEGRATION',
                            resp
                        );

                        const { writeKey, sourceId } = resp.credentials;
                        this.segment.writeKey = writeKey;
                        this.segment.sourceId = sourceId;
                    }
                })
                .catch(err => {
                });
        },
        deleteSegmentIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'SEGMENT')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_SEGMENT_INTEGRATION',
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
        updateSegmentIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(resp => {
                            this.$store.commit(
                                'SET_CUSTOMER_SEGMENT_INTEGRATION',
                                resp
                            );
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
        addSegmentIntegration() {
            const payload = {
                externalSystem: 'SEGMENT',
                baseUrl: '',
                credentials: {
                    writeKey: this.segment.writeKey,
                    sourceId: this.segment.sourceId
                }
            };
            if (this.segmentIsAvailableInStore) {
                const { externalSystem, credentials } = payload;
                return this.updateSegmentIntegration({
                    externalSystem,
                    data: {
                        credentials
                    }
                });
            }
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getSegmentIntegration();

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
        this.getSegmentIntegration();
    },
    mounted() {
        if (!this.segmentIsAvailableInStore) {
            this.getSegmentIntegration();
        } else {
            if (this.segmentIsAvailableInStore) {
                if ('data' in this.segmentIntegration) {
                    const { credentials } = this.segmentIntegration.data;
                    const { writeKey, sourceId } = credentials;
                    this.segment.writeKey = writeKey;
                    this.segment.sourceId = sourceId;
                } else {
                    const {
                        writeKey,
                        sourceId
                    } = this.segmentIntegration.credentials;
                    this.segment.writeKey = writeKey;
                    this.segment.sourceId = sourceId;
                }
            }
        }
    }
};
</script>
