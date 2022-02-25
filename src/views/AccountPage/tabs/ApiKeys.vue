<template>
    <div class="api-keys">
        <b-card>
            <b-row class="d-flex">
                <b-col>
                    <div class="d-flex align-items-center mb-2">
                        <h6 class="text-primary mb-0" style="font-weight: bold">
                            You can use the below API key with the UCC SDK
                        </h6>
                        <a href="#">
                            <img
                                class="ml-3"
                                src="@/assets/icons/noun_Info.svg"
                            />
                        </a>
                    </div>
                    <div>
                        <div class="d-flex align-items-center mb-3">
                            <b-form-input
                                id="input-code"
                                type="text"
                                :value="secretKey"
                                placeholder="<<secret key>>"
                                readonly
                                style="max-width: 467px"
                            ></b-form-input>
                            <a
                                class="ml-3"
                                v-clipboard:copy="secretKey"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                data-toggle="tooltip"
                                variant="primary"
                                size="sm"
                                style="cursor: pointer"
                            >
                                <img src="@/assets/icons/circle_copy.svg" />
                            </a>
                        </div>
                        <b-button
                            class="py-2 px-3"
                            variant="primary"
                            size="sm"
                            @click="generateSecretKey"
                        >
                            Generate new key
                        </b-button>
                    </div>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-center">
                    <div class="get-started">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-center
                                mb-3
                            "
                        >
                            <h4
                                class="text-primary mb-0"
                                style="font-weight: bold"
                            >
                                The Unchained Carrot SDK
                            </h4>
                            <a href="#">
                                <img
                                    class="ml-3"
                                    src="@/assets/icons/noun_Info.svg"
                                />
                            </a>
                        </div>
                        <p class="mb-5">
                            The Unchained Carrot SDK is currently only available
                            for javascript. It can be used in any browser and in
                            NodeJS projects.
                        </p>
                        <p class="mb-3">
                            The SDK makes it easy to create tracking events, to
                            create user and members for your referral and
                            loyalty programs.
                        </p>
                        <div style="position: relative">
                            <img
                                :src="
                                    require('@/assets/icons/account/sdk_icon.svg')
                                        .default
                                "
                                style="position: absolute; left: 40px;"
                            />
                            <b-button
                                class="py-3 px-5"
                                variant="success"
                                size="sm"
                            >
                                Get Started
                            </b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { submitTrackingEvent } from '@/services/TrackingService';
export default {
    name: 'api-keys-tab',
    data: () => ({
        secretKey: ''
    }),
    methods: {
        async getCustomer() {
            try {
                const response = await this.$store.dispatch('getCustomer');
                console.log('response =>', response);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        onCopy() {
            // Send Tracking Event With UCC SDK
            submitTrackingEvent(
                'SECRET-KEY-COPIED',
                {},
                this.$store.getters['customerData']
            );
            this.$notify({
                title: 'Copied!',
                type: 'success'
            });
        },
        onError() {
            alert('Failed to copy text');
        },
        generateSecretKey() {
            let result = '';
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 32; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            this.secretKey = result;
        }
    },
    async mounted() {
        try {
            const response = await this.getCustomer();
            this.secretKey = response.apiKey;
        } catch (error) {}
    }
};
</script>

<style lang="scss" scoped>
.api-keys {
    .get-started {
        max-width: 600px;
        text-align: center;
        border: 1px solid #cecfd0;
        padding: 20px;
    }
}
</style>
