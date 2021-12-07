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
            <h4 class="text-brand">Integrations - WooCommerce</h4>
        </div>

        <h5 class="text-brand">
            Allow Unchained Carrot to interact with your WooCommerce Source
        </h5>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="Base URL"
                        label-for="baseUrl"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="woo.baseUrl"
                            id="baseUrl"
                            v-validate="'required'"
                            name="baseUrl"
                            placeholder="https://mywoocommerce.com"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('baseUrl')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <b-form-group
                        label="Consumer Key"
                        label-for="key"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="woo.key"
                            id="key"
                            v-validate="'required'"
                            name="key"
                            placeholder="cp_"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('key')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <b-form-group
                        label="Consumer Secret"
                        label-for="secret"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="woo.secret"
                            id="secret"
                            v-validate="'required'"
                            name="secret"
                            placeholder="cs_"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('secret')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            @click="addWooIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                (!woo.key && !woo.secret && !woo.baseUrl) ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            {{ wooIsAvailableInStore ? 'Update' : 'Save' }}
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="wooIsAvailableInStore"
                            @click="deleteWooIntegration"
                            class="ml-3"
                            variant="danger"
                        >
                            <fa-icon class="text-white" icon="trash-alt"
                        /></b-btn>
                    </div>
                </b-form>

                <div>
                    <h5>How To Genereate API Keys</h5>
                    <iframe
                        loading="laxy"
                        width="100%"
                        style="height:40em;"
                        src="https://docs.woocommerce.com/document/woocommerce-rest-api/#section-2"
                        frameborder="0"
                    ></iframe>
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
    name: 'integrations-woocommerce-page',
    data: () => ({
        loading: false,
        woo: {
            baseUrl: '',
            key: '',
            secret: ''
        }
    }),
    computed: {
        ...mapGetters(['wooIntegration']),
        wooIsAvailableInStore() {
            return Object.keys(this.wooIntegration).length > 0;
        }
    },
    methods: {
        getWooIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'WOOCOMMERCE')
                .then(resp => {
                    if (this.wooIsAvailableInStore) {
                        const {
                            baseUrl,
                            credentials: { key, secret }
                        } = this.wooIntegration;

                        this.woo = { ...this.woo, ...{ baseUrl, key, secret } };
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_WOOCOMMERCE_INTEGRATION',
                            resp
                        );
                        this.$forceUpdate();
                    }
                })
                .catch(err => {
                });
        },
        deleteWooIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch(
                        'deleteIntegrationByExternalSystem',
                        'WOOCOMMERCE'
                    )
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_WOOCOMMERCE_INTEGRATION',
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
        updateWooIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(({ externalSystem, data }) => {
                            this.$store.commit(
                                'SET_CUSTOMER_WOOCOMMERCE_INTEGRATION',
                                { externalSystem, ...data }
                            );
                            this.getWooIntegration();
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
        addWooIntegration() {
            const payload = {
                externalSystem: 'WOOCOMMERCE',
                baseUrl: this.woo.baseUrl,
                credentials: {
                    key: this.woo.key,
                    secret: this.woo.secret
                }
            };
            if (this.wooIsAvailableInStore) {
                const { externalSystem, ...data } = payload;
                const updatePayload = { externalSystem, data };
                return this.updateWooIntegration(updatePayload);
            }
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getWooIntegration();
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
        this.getWooIntegration();
    },
    mounted() {
        if (!this.wooIsAvailableInStore) {
            this.getWooIntegration();
            if (this.wooIsAvailableInStore) {
                {
                    const {
                        baseUrl,
                        credentials: { key, secret }
                    } = this.wooIntegration;
                    this.woo = { ...this.woo, ...{ baseUrl, key, secret } };
                }
            }
        } else {
            if (this.wooIsAvailableInStore) {
                {
                    const {
                        baseUrl,
                        credentials: { key, secret }
                    } = this.wooIntegration;
                    this.woo = { ...this.woo, ...{ baseUrl, key, secret } };
                }
            }
        }
    }
};
</script>
