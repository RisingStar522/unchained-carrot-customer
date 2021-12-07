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
            <h4 class="text-brand">Integrations - Mailchimp</h4>
        </div>
        <div>
            <h5 class="text-brand">
                Allow Unchained Carrot to access your Mailchimp account
            </h5>
        </div>

        <b-row class="d-flex">
            <div class="col-md-8">
                <b-form>
                    <b-form-group
                        label="API Key"
                        label-for="apiKey"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="mailchimp.apiKey"
                            id="apiKey"
                            v-validate="'required'"
                            name="apiKey"
                            placeholder="enter Mailchimp API key here"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('apiKey')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <b-form-group
                        label="API URL"
                        label-for="apiUrl"
                        label-cols-md="4"
                    >
                        <b-form-input
                            v-model="mailchimp.apiUrl"
                            id="apiUrl"
                            v-validate="'required'"
                            name="apiUrl"
                            placeholder="https://us4.admin.mailchimp.com/account/api"
                        ></b-form-input>
                        <span
                            class="text-danger"
                            v-for="error in errors.collect('apiUrl')"
                            :key="error"
                            >{{ error }}</span
                        >
                    </b-form-group>

                    <div class="d-flex mb-3">
                        <b-button
                            @click="addMailchimpIntegration"
                            class="ml-auto"
                            variant="brand"
                            :disabled="
                                !mailchimp.apiKey ||
                                    !mailchimp.apiUrl ||
                                    errors.items.length > 0 ||
                                    loading
                            "
                        >
                            {{ mailchimpAvailableInStore ? 'Update' : 'Save' }}
                            <b-spinner v-if="loading" small></b-spinner>
                            <span class="sr-only">Loading...</span>
                        </b-button>
                        <b-btn
                            v-if="mailchimpAvailableInStore"
                            @click="deleteMailchimpIntegration"
                            class="ml-3"
                            variant="danger"
                        >
                            <fa-icon class="text-white" icon="trash-alt"
                        /></b-btn>
                    </div>
                </b-form>
            </div>
            <div class="col-md-4">
                <b-card>
                    <div>
                        <fa-icon
                            style="font-size:2rem"
                            class="text-brand"
                            icon="info-circle"
                        />
                    </div>
                    <div class="text-secondary">
                        You should create a dedicated API key for Unchained
                        Carrot in Mailchimp. Go to Account > Extras > API keys
                        to do this. The data center for the API URL you can find
                        in the address bar of your browser:
                        https://us4.admin.mailchimp.com/account/api/
                    </div>
                </b-card>
            </div>
        </b-row>
        <hr />

        <div>
            <b-row class="d-flex">
                <div class="col-md-8">
                    <div class="py-4">
                        <h5 class="text-brand">
                            To use ReviewByMe you need to synchronize your
                            mailing list
                        </h5>
                    </div>
                    <div class="d-flex justify-content-center">
                        <b-btn class="mr-3" variant="brand" @click="comingSoon"
                            >Sync</b-btn
                        >
                        <b-btn variant="outline-brand" @click="comingSoon"
                            >Details</b-btn
                        >
                    </div>
                    <div class="py-4">
                        <h5 class="text-brand">
                            Setup Webhooks in Mailchimp to send events to
                            Unchained Carrot
                        </h5>
                    </div>
                    <div class="row d-flex">
                        <div class="col-sm-6 col-md-4">
                            <b-card class="d-flex align-items-center">
                                <div class="mb-2">
                                    <img
                                        src="@/assets/images/integrations/mailchimp.png"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <b-button
                                        class="btn-block"
                                        variant="brand"
                                        @click="comingSoon"
                                        >Add</b-button
                                    >
                                </div>
                            </b-card>
                        </div>
                    </div>
                </div>
                <div class="col-md-4"></div>
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'integrations-mailchimp-page',
    data: () => ({
        mailchimp: {
            apiKey: '',
            apiUrl: ''
        },
        loading: false
    }),
    computed: {
        ...mapGetters(['mailchimpIntegration']),
        mailchimpAvailableInStore() {
            return Object.keys(this.mailchimpIntegration).length > 0;
        }
    },
    methods: {
        getMailchimpIntegration() {
            this.$store
                .dispatch('getIntegrationByExternalSystem', 'MAILCHIMP')
                .then(resp => {
                    if (this.mailchimpAvailableInStore) {
                        this.mailchimp = {
                            ...this.mailchimpIntegration.credentials
                        };
                    } else {
                        this.$store.commit(
                            'SET_CUSTOMER_MAILCHIMP_INTEGRATION',
                            resp
                        );
                        this.$forceUpdate();
                    }
                })
                .catch(err => {
                });
        },
        deleteMailchimpIntegration() {
            if (
                window.confirm(
                    'Are you sure you want to delete this integration?'
                )
            ) {
                this.$store
                    .dispatch('deleteIntegrationByExternalSystem', 'MAILCHIMP')
                    .then(resp => {
                        this.$store.commit(
                            'DELETE_CUSTOMER_MAILCHIMP_INTEGRATION',
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
        updateMailchimpIntegration(payload) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('updateIntegration', payload)
                        .then(({ externalSystem, data }) => {
                            this.$store.commit(
                                'SET_CUSTOMER_MAILCHIMP_INTEGRATION',
                                { externalSystem, ...data }
                            );
                            this.getMailchimpIntegration();
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
        addMailchimpIntegration() {
            const payload = {
                externalSystem: 'MAILCHIMP',
                credentials: this.mailchimp
            };
            if (this.mailchimpAvailableInStore) {
                const { externalSystem, ...data } = payload;
                const updatePayload = { externalSystem, data };
                return this.updateMailchimpIntegration(updatePayload);
            }
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('addIntegration', payload)
                        .then(() => {
                            this.getMailchimpIntegration();
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
        },
        comingSoon() {
            window.alert('coming soon');
        }
    },

    created() {
        this.getMailchimpIntegration();
    },
    mounted() {
        if (!this.mailchimpAvailableInStore) {
            this.getMailchimpIntegration();
            if (this.mailchimpAvailableInStore) {
                {
                    const {
                        credentials: { key }
                    } = this.mailchimpIntegration;
                    this.mailchimp = {
                        ...this.mailchimp,
                        ...{ key }
                    };
                }
            }
        } else {
            if (this.mailchimpAvailableInStore) {
                {
                    const {
                        credentials: { key, secret }
                    } = this.mailchimpIntegration;
                    this.mailchimp = {
                        ...this.mailchimp,
                        ...{ key, secret }
                    };
                }
            }
        }
    }
};
</script>
