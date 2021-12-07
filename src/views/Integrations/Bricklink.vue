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
            <h4 class="text-brand">Integrations - Bricklink</h4>
        </div>

        <h5 class="text-brand">
            Allow Unchained Carrot to interact with your Bricklink Source
        </h5>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="Seller name"
                        label-for="sellerName"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.sellerName"
                            id="sellerName"
                            v-validate="'required'"
                            name="sellerName"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('sellerName')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>
                    <b-form-group
                        label="Store name"
                        label-for="storeName"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.storeName"
                            id="storeName"
                            v-validate="'required'"
                            name="storeName"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('storeName')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>
                    <b-form-group
                        label="Base URL"
                        label-for="baseUrl"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.baseUrl"
                            id="baseUrl"
                            v-validate="'required'"
                            name="baseUrl"
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
                        label-for="consumerKey"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.consumerKey"
                            id="consumerKey"
                            v-validate="'required'"
                            name="consumerKey"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('consumerKey')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <b-form-group
                        label="Consumer Secret"
                        label-for="consumerSecret"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.consumerSecret"
                            id="consumerSecret"
                            v-validate="'required'"
                            name="consumerSecret"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('consumerSecret')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <b-form-group
                        label="Token value"
                        label-for="tokenValue"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.tokenValue"
                            id="tokenValue"
                            v-validate="'required'"
                            name="tokenValue"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('tokenValue')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <b-form-group
                        label="Token secret"
                        label-for="tokenSecret"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="bricklink.tokenSecret"
                            id="tokenSecret"
                            v-validate="'required'"
                            name="tokenSecret"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('tokenSecret')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            @click="addBricklinkIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                (!bricklink.sellerName &&
                                    !bricklink.storeName &&
                                    !bricklink.baseUrl &&
                                    !bricklink.consumerKey &&
                                    !bricklink.consumerSecret &&
                                    !bricklink.tokenValue &&
                                    !bricklink.tokenSecret) ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            {{
                                bricklinkIsAvailableInStore ? 'Update' : 'Save'
                            }}
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="bricklinkIsAvailableInStore"
                            @click="deleteBricklinkIntegration"
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'integrations-bricklink-page',
    data: () => ({
        loading: false,
        bricklink: {
            sellerName: '',
            storeName: '',
            baseUrl: '',
            consumerKey: '',
            consumerSecret: '',
            tokenValue: '',
            tokenSecret: ''
        }
    }),
    computed: {
        ...mapGetters(['bricklinkIntegration']),
        bricklinkIsAvailableInStore() {
            return Object.keys(this.bricklinkIntegration).length > 0;
        }
    },
    methods: {
        getBricklinkIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'BRICKLINK')
                .then(resp => {
                    if (this.bricklinkIsAvailableInStore) {
                        const {
                            baseUrl,
                            credentials
                        } = this.bricklinkIntegration;

                        this.bricklink = {
                            ...this.bricklink,
                            ...{
                                baseUrl,
                                ...credentials
                            }
                        };
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_BRICKLINK_INTEGRATION',
                            resp
                        );
                        this.$forceUpdate();
                    }
                })
                .catch(err => {
                });
        },
        deleteBricklinkIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'BRICKLINK')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_BRICKLINK_INTEGRATION',
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
        updateBricklinkIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(({ externalSystem, data }) => {
                            this.$store.commit(
                                'SET_CUSTOMER_BRICKLINK_INTEGRATION',
                                { externalSystem, ...data }
                            );
                            this.getBricklinkIntegration();
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
        addBricklinkIntegration() {
            const { baseUrl, ...data } = this.bricklink;

            const payload = {
                externalSystem: 'BRICKLINK',
                baseUrl,
                credentials: { ...data }
            };

            if (this.bricklinkIsAvailableInStore) {
                const { externalSystem, ...data } = payload;
                const updatePayload = { externalSystem, data };
                return this.updateBricklinkIntegration(updatePayload);
            }
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getBricklinkIntegration();
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
        this.getBricklinkIntegration();
    },
    mounted() {
        if (!this.bricklinkIsAvailableInStore) {
            this.getBricklinkIntegration();
            if (this.bricklinkIsAvailableInStore) {
                {
                    const { baseUrl, credentials } = this.bricklinkIntegration;
                    this.bricklink = {
                        ...this.bricklink,
                        ...{
                            baseUrl,
                            ...credentials
                        }
                    };
                }
            }
        } else {
            if (this.bricklinkIsAvailableInStore) {
                const { baseUrl, credentials } = this.bricklinkIntegration;
                this.bricklink = {
                    ...this.bricklink,
                    ...{
                        baseUrl,
                        ...credentials
                    }
                };
            }
        }
    }
};
</script>
