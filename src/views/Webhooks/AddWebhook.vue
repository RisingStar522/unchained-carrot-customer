<template>
    <main class="content">
        <div class="container mx-4">
            <h3 class="page-header">
                {{ !webhookId ? 'Add' : 'Edit' }}
                {{ webhookType === 'incoming' ? 'Incoming' : 'Outgoing' }}
                Webhooks
            </h3>
            <div class="webhook-wrapper">
                <b-form @submit.prevent="onSubmit">
                    <b-row v-if="webhookType === 'incoming'" class="my-4">
                        <b-col sm="2">
                            <label for="sourcesystem">Source System</label>
                        </b-col>
                        <b-col sm="2">
                            <b-dropdown
                                :text="selectedSourceSystem"
                                block
                                variant="outline-primary"
                                menu-class="w-100"
                            >
                                <b-dropdown-item
                                    v-for="option in sourceSystems"
                                    :key="option.value"
                                    :value="option.value"
                                    @click="selectedSourceSystem = option.value"
                                    >{{ option.text }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </b-col>
                    </b-row>

                    <b-row class="my-4">
                        <b-col sm="2">
                            <label for="topic">Topic</label>
                        </b-col>
                        <b-col sm="2">
                            <b-dropdown
                                :text="selectedTopic"
                                block
                                variant="outline-primary"
                                menu-class="w-100"
                            >
                                <b-dropdown-item
                                    v-for="option in topicOptions"
                                    :key="option.value"
                                    :value="option.value"
                                    @click="selectedTopic = option.value"
                                    >{{ option.text }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </b-col>
                        <b-col sm="3"> </b-col>
                    </b-row>

                    <b-row v-if="webhookType === 'outgoing'" class="my-4">
                        <b-col sm="2">
                            <label for="desUrl">Destination URL</label>
                        </b-col>
                        <b-col sm="2">
                            <b-form-input
                                id="input-destinationurl"
                                v-model="formData.destinationUrl"
                                type="text"
                                placeholder="https://mysystem.com/callbacks"
                            ></b-form-input>
                        </b-col>
                        <b-col sm="3"> </b-col>
                    </b-row>

                    <div class="my-5">
                        <b-card class="w-100 pl-3 pr-3">
                            <h5>Security Settings</h5>
                            <b-row>
                                <b-col sm="6">
                                    <b-row class="my-4">
                                        <b-col sm="12">
                                            <b-btn
                                                class="mr-3"
                                                size="sm"
                                                variant="brand"
                                            >
                                                <fa-icon
                                                    class="text-white"
                                                    icon="times"
                                            /></b-btn>
                                            <label for="signature"
                                                >Use HMAC Signature</label
                                            >
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="3">
                                            <label for="headerfield"
                                                >Header field</label
                                            >
                                        </b-col>
                                        <b-col sm="9">
                                            <b-form-input
                                                id="input-hmacheaderfield"
                                                v-model="
                                                    formData.hmacHeaderField
                                                "
                                                type="text"
                                                placeholder="X-UCC-HMAC-Signature"
                                            ></b-form-input>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="3">
                                            <label for="secretkey"
                                                >Secret Key</label
                                            >
                                        </b-col>
                                        <b-col sm="9">
                                            <b-form-input
                                                id="input-secretkey"
                                                v-model="formData.hmacSecretKey"
                                                type="text"
                                                placeholder="221321dfyiuojdy2121"
                                            ></b-form-input>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="3">
                                            <label for="secretkey"
                                                >Algorithm</label
                                            >
                                        </b-col>
                                        <b-col sm="9">
                                            <b-dropdown
                                                :text="selectedHMACAlgorithm"
                                                block
                                                variant="outline-primary"
                                                menu-class="w-100"
                                            >
                                                <b-dropdown-item
                                                    v-for="option in hmacAlgorithms"
                                                    :key="option.value"
                                                    :value="option.value"
                                                    @click="
                                                        selectedHMACAlgorithm =
                                                            option.value
                                                    "
                                                    >{{
                                                        option.text
                                                    }}</b-dropdown-item
                                                >
                                            </b-dropdown>
                                        </b-col>
                                    </b-row>
                                    <div class="my-4 text-right">
                                        <b-button
                                            variant="brand"
                                            @click="
                                                formData.hmacSecretKey = $uuid.v4()
                                            "
                                            >Generate</b-button
                                        >
                                    </div>
                                </b-col>
                                <b-col v-if="webhookType === 'incoming'" sm="4">
                                    <b-row class="my-4">
                                        <b-col sm="12">
                                            <b-btn
                                                class="mr-3"
                                                size="sm"
                                                variant="brand"
                                            >
                                                <fa-icon
                                                    class="text-white"
                                                    icon="times"
                                            /></b-btn>
                                            <label for="signature"
                                                >Use IP address whitelist</label
                                            >
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="12">
                                            <b-list-group>
                                                <b-list-group-item
                                                    v-for="(item,
                                                    index) in ipAddressWhitelist"
                                                    :key="index"
                                                    class="flex-column align-items-start"
                                                >
                                                    <div
                                                        class="d-flex w-100 justify-content-between"
                                                    >
                                                        <p class="mb-0">
                                                            {{ item }}
                                                        </p>
                                                        <a
                                                            @click="
                                                                deleteIPAddress(
                                                                    item
                                                                )
                                                            "
                                                        >
                                                            <fa-icon
                                                                class="text-black"
                                                                icon="trash-alt"
                                                        /></a>
                                                    </div>
                                                </b-list-group-item>
                                            </b-list-group>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="9">
                                            <b-form-input
                                                id="input-ipaddress"
                                                v-model="formData.ipaddress"
                                                :state="
                                                    formData.ipaddress
                                                        ? validateIPaddress(
                                                              formData.ipaddress
                                                          )
                                                        : null
                                                "
                                                type="text"
                                                placeholder="213.52.255.200"
                                            ></b-form-input>
                                            <b-form-invalid-feedback>
                                                Enter a valid ip address
                                            </b-form-invalid-feedback>
                                        </b-col>
                                        <b-col sm="3">
                                            <div class="text-right">
                                                <b-button
                                                    variant="brand"
                                                    @click="addIpAddress"
                                                    >Add</b-button
                                                >
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col v-if="webhookType === 'outgoing'" sm="6">
                                    <b-row class="my-4">
                                        <b-col sm="12">
                                            <b-btn
                                                class="mr-3"
                                                size="sm"
                                                variant="brand"
                                            >
                                                <fa-icon
                                                    class="text-white"
                                                    icon="times"
                                            /></b-btn>
                                            <label for="apikey"
                                                >Use API Key</label
                                            >
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="3">
                                            <label for="headerfield"
                                                >Header field</label
                                            >
                                        </b-col>
                                        <b-col sm="9">
                                            <b-form-input
                                                id="input-apiheaderfield"
                                                v-model="
                                                    formData.apiHeaderField
                                                "
                                                type="text"
                                                placeholder="X-API-Key"
                                            ></b-form-input>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-4">
                                        <b-col sm="3">
                                            <label for="secretkey"
                                                >Secret Key</label
                                            >
                                        </b-col>
                                        <b-col sm="9">
                                            <b-form-input
                                                id="input-apisecretkey"
                                                v-model="formData.apiSecretkey"
                                                type="text"
                                                placeholder="zeklj258dcv2157d"
                                            ></b-form-input>
                                        </b-col>
                                    </b-row>
                                    <div class="my-4 text-right">
                                        <b-button
                                            variant="brand"
                                            @click="
                                                formData.apiSecretkey = $uuid.v4()
                                            "
                                            >Generate</b-button
                                        >
                                    </div>
                                </b-col>
                                <b-col v-if="webhookType === 'incoming'" sm="2">
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>

                    <div class="d-flex justify-content-end button-group">
                        <b-button variant="outline-brand" @click="goBack"
                            >Cancel</b-button
                        >
                        <b-button type="submit" class="ml-4" variant="brand">{{
                            !webhookId ? 'Create' : 'Update'
                        }}</b-button>
                    </div>
                </b-form>
            </div>
        </div>

        <ConfigureQueueUrlModal @confirm="closeConfigureQueueUrlModal" />
    </main>
</template>

<script>
import ConfigureQueueUrlModal from './components/ConfigureQueueUrlModal.vue';
export default {
    name: 'add-webhook',
    components: {
        ConfigureQueueUrlModal
    },
    data() {
        return {
            formData: {
                hmacHeaderField: '',
                hmacSecretKey: '',
                apiHeaderField: '',
                apiSecretkey: '',
                destinationUrl: ''
            },
            selectedSourceSystem: 'WooCommerce',
            selectedTopic: 'Voucher.created',
            selectedHMACAlgorithm: 'SHA256',
            queueUrl: 'https://webhooks.unchainedcarrot.com?key=123abc',
            sourceSystems: [
                {
                    value: 'WooCommerce',
                    text: 'WooCommerce'
                },
                {
                    value: 'Tastyigniter',
                    text: 'Tastyigniter'
                },
                {
                    value: 'Placeholder',
                    text: 'Placeholder'
                }
            ],
            topicOptions: [
                {
                    value: 'Voucher.created',
                    text: 'Voucher.created'
                },
                {
                    value: 'Referral.made',
                    text: 'Referral.made'
                },
                {
                    value: 'Points.redeemed',
                    text: 'Points.redeemed'
                }
            ],
            hmacAlgorithms: [
                {
                    value: 'SHA256',
                    text: 'SHA256'
                }
            ],
            ipAddressWhitelist: []
        };
    },
    created() {
        this.loadWebhookData();
    },
    watch: {
        webhookDetail() {
            this.loadWebhookData();
        }
    },
    computed: {
        webhookId() {
            return this.$route.params.id;
        },
        webhookType() {
            return this.$route.params.webhookType
                ? this.$route.params.webhookType
                : 'incoming';
        },
        webhookDetail() {
            return this.webhookType === 'incoming'
                ? this.$store.getters['getIncomingWebhookById']
                : this.$store.getters['getOutgoingWebhookById'];
        }
    },
    methods: {
        loadWebhookData() {
            if (
                this.webhookId &&
                (this.webhookDetail.length === undefined ||
                    this.webhookDetail.length === 0)
            ) {
                if (this.webhookType === 'incoming') {
                    this.$store.dispatch(
                        'getIncomingWebhookById',
                        this.webhookId
                    );
                } else if (this.webhookType === 'outgoing') {
                    this.$store.dispatch(
                        'getOutgoingWebhookById',
                        this.webhookId
                    );
                }
            } else {
                const currentWebhook = JSON.parse(
                    JSON.stringify(this.webhookDetail)
                )[0];

                this.selectedSourceSystem =
                    currentWebhook && currentWebhook.externalSystem
                        ? currentWebhook.externalSystem
                        : '';
                this.selectedTopic =
                    currentWebhook && currentWebhook.topic
                        ? currentWebhook.topic
                        : '';
                this.ipAddressWhitelist =
                    currentWebhook &&
                    currentWebhook.securitySettings.ipWhiteList
                        ? currentWebhook.securitySettings.ipWhiteList
                        : [];

                this.formData.hmacHeaderField =
                    currentWebhook &&
                    currentWebhook.securitySettings.hmacSignatureHeader
                        ? currentWebhook.securitySettings.hmacSignatureHeader
                        : '';
                this.formData.hmacSecretKey =
                    currentWebhook &&
                    currentWebhook.securitySettings.hmacSecretToken
                        ? currentWebhook.securitySettings.hmacSecretToken
                        : '';

                this.formData.destinationUrl =
                    currentWebhook && currentWebhook.endPoint
                        ? currentWebhook.endPoint
                        : '';

                this.formData.apiHeaderField =
                    currentWebhook &&
                    currentWebhook.securitySettings.apiKeyHeader
                        ? currentWebhook.securitySettings.apiKeyHeader
                        : '';
                this.formData.apiSecretkey =
                    currentWebhook && currentWebhook.securitySettings.apiKey
                        ? currentWebhook.securitySettings.apiKey
                        : '';
            }
        },
        onSubmit() {
            this.$validator.validateAll().then(result => {
                if (!result) {
                    return;
                } else {
                    this.$bvModal.show('configure-queue-url');
                }
            });
        },
        closeConfigureQueueUrlModal(value) {
            if (value) {
                if (!this.webhookId) {
                    if (this.webhookType === 'incoming') {
                        this.$store.dispatch('createIncomingWebhook', {
                            externalSystem: this.selectedSourceSystem,
                            topic: this.selectedTopic,
                            queueUrl: this.queueUrl,
                            securitySettings: {
                                ipWhiteList: this.ipAddressWhitelist,
                                hmacSecretToken: this.formData.hmacSecretKey
                            },
                            status: 'unpublished'
                        });
                    } else if (this.webhookType === 'outgoing') {
                        this.$store.dispatch('createOutgoingWebhook', {
                            topic: this.selectedTopic,
                            endPoint: this.formData.destinationUrl,
                            apiKey: this.formData.apiKey,
                            apiKeyHeader: this.formData.apiKeyHeader,
                            hmacKey: this.formData.hmacSecretKey,
                            hmacAlgorithm: this.selectedHMACAlgorithm,
                            hmacSignatureHeader: this.formData.hmacHeaderField,
                            status: 'unpublished'
                        });
                    }
                    this.$validator.reset();
                } else {
                    if (this.webhookType === 'incoming') {
                        this.$store.dispatch('updateIncomingWebhook', {
                            id: this.webhookId,
                            data: {
                                externalSystem: this.selectedSourceSystem,
                                topic: this.selectedTopic,
                                queueUrl: this.queueUrl,
                                securitySettings: {
                                    ipWhiteList: this.ipAddressWhitelist,
                                    hmacSecretToken: this.formData.hmacSecretKey
                                },
                                status: 'unpublished'
                            }
                        });
                    } else if (this.webhookType === 'outgoing') {
                        this.$store.dispatch('updateOutgoingWebhook', {
                            id: this.webhookId,
                            data: {
                                topic: this.selectedTopic,
                                endPoint: '',
                                apiKey: this.formData.apiKey,
                                apiKeyHeader: this.formData.apiKeyHeader,
                                hmacKey: this.formData.hmacSecretKey,
                                hmacAlgorithm: this.selectedHMACAlgorithm,
                                hmacSignatureHeader: this.formData
                                    .hmacHeaderField,
                                status: 'unpublished'
                            }
                        });
                    }
                }
            }
        },
        goBack() {
            this.$router.push({ name: 'Webhooks' });
        },
        addIpAddress() {
            this.ipAddressWhitelist.push(this.formData.ipaddress);
        },
        validateIPaddress(ipaddress) {
            if (
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                    ipaddress
                )
            ) {
                return true;
            } else {
                return false;
            }
        },
        deleteIPAddress(item) {
            const index = this.ipAddressWhitelist.indexOf(item);
            if (index > -1) this.ipAddressWhitelist.splice(index, 1);
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    max-width: 100%;
}
h5 {
    color: #2f3380;
}
label {
    color: #2f3380;
}
::v-deep .webhook-wrapper {
    .button-group {
        margin-top: 128px;
        button {
            width: 185px;
        }
    }
    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }

    .list-group {
        height: 100px;
        overflow-y: scroll;
        border: 1px solid rgba(0, 0, 0, 0.125);

        .list-group-item {
            border: none;
        }

        &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        }
        &::-webkit-scrollbar-thumb {
            background: #f7991e 0% 0% no-repeat padding-box;
            border-radius: 3px;
            transition: all 0.2s ease-out;
        }
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }
}
</style>
