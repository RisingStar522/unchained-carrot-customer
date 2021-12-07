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
            <h4 class="text-brand">Integrations - Mandrill</h4>
        </div>

        <h5 class="text-brand">
            Allow Unchained Carrot to interact with your Mandrill Source
        </h5>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="API Key"
                        label-for="key"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="mandrill.key"
                            id="key"
                            v-validate="'required'"
                            name="key"
                            placeholder=""
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('key')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            @click="addMandrillIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                !mandrill.key ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            {{ mandrillAvailableInStore ? 'Update' : 'Save' }}
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="mandrillAvailableInStore"
                            @click="deleteMandrillIntegration"
                            class="ml-3"
                            variant="danger"
                        >
                            <fa-icon class="text-white" icon="trash-alt"
                        /></b-btn>
                    </div>
                </b-form>

                <div>
                    <h5>How To Genereate API Keys</h5>
                    <div class="my-3">
                        <h6>Step 1</h6>
                        <img
                            src="@/assets/images/integrations/Picture1.png"
                            alt="Step 1"
                        />
                    </div>
                    <div class="my-3">
                        <h6>Step 2</h6>
                        <img
                            src="@/assets/images/integrations/Picture2.png"
                            alt="Step 2"
                        />
                    </div>
                    <div class="my-3">
                        <h6>Step 3</h6>
                        <img
                            src="@/assets/images/integrations/Picture3.png"
                            alt="Step 3"
                        />
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'integrations-mandrill-page',
    data: () => ({
        loading: false,
        mandrill: {
            key: ''
        }
    }),
    computed: {
        ...mapGetters(['mandrillIntegration']),
        mandrillAvailableInStore() {
            return Object.keys(this.mandrillIntegration).length > 0;
        }
    },
    methods: {
        getMandrillIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'MANDRILL')
                .then(resp => {
                    if (this.mandrillAvailableInStore) {
                        const { key } = this.mandrillIntegration.credentials;

                        this.mandrill = { ...this.mandrill, ...{ key } };
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_MANDRILL_INTEGRATION',
                            resp
                        );
                        this.$forceUpdate();
                    }
                })
                .catch(err => {
                });
        },
        deleteMandrillIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'MANDRILL')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_MANDRILL_INTEGRATION',
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
        updateMandrillIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(({ externalSystem, data }) => {
                            this.$store.commit(
                                'SET_CUSTOMER_MANDRILL_INTEGRATION',
                                { externalSystem, ...data }
                            );
                            this.getMandrillIntegration();
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
        addMandrillIntegration() {
            const payload = {
                externalSystem: 'MANDRILL',
                credentials: {
                    key: this.mandrill.key
                }
            };
            if (this.mandrillAvailableInStore) {
                const { externalSystem, ...data } = payload;
                const updatePayload = { externalSystem, data };
                return this.updateMandrillIntegration(updatePayload);
            }
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getMandrillIntegration();
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
        this.getMandrillIntegration();
    },
    mounted() {
        if (!this.mandrillAvailableInStore) {
            this.getMandrillIntegration();
            if (this.mandrillAvailableInStore) {
                {
                    const {
                        credentials: { key }
                    } = this.mandrillIntegration;
                    this.mandrill = {
                        ...this.mandrill,
                        ...{ key }
                    };
                }
            }
        } else {
            if (this.mandrillAvailableInStore) {
                {
                    const {
                        credentials: { key, secret }
                    } = this.mandrillIntegration;
                    this.mandrill = {
                        ...this.mandrill,
                        ...{ key, secret }
                    };
                }
            }
        }
    }
};
</script>
