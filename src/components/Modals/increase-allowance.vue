<template>
    <b-modal
        id="increase-allowance"
        ref="modal"
        title="Increase rewards allowance"
        header-class="border-0 text-capitalize text-brand"
        body-class="pt-0"
        hide-footer
    >
        <p class="text-center text-brand small">
            To be able to pay out rewards to customers you should grant
            ReferredBy Me access to your tokens. The address of Referred By Me
            is:
        </p>
        <b-row>
            <b-col cols="12" sm="8">
                <div class="text-center">
                    <b-img
                        v-bind="{ height: 140, width: 140 }"
                        :src="
                            require('../../assets/images/rewards/qr-address.png')
                        "
                        alt="QR address"
                    ></b-img>
                </div>
                <p class="mt-2 text-brand small text-center">
                    {{ address }}
                    <a @click="copyAddress" class="ml-2">
                        <fa-icon icon="copy" />
                    </a>
                    <input id="address" :value="address" />
                </p>
            </b-col>
            <b-col cols="12" sm="4">
                <p>Or sign with:</p>
                <p>
                    <a :href="metamaskUrl" target="_blank">
                        <img
                            src="@/assets/images/rewards/metamask.png"
                            alt="Metamask"
                        />
                    </a>
                </p>
                <p>
                    <a :href="ledgerUrl" target="_blank">
                        <img
                            src="@/assets/images/rewards/ledger.png"
                            alt="Ledger"
                        />
                    </a>
                </p>
            </b-col>
        </b-row>
        <b-collapse id="details-modal" class="mb-3">
            Some details text
        </b-collapse>
        <div>
            <b-btn
                variant="outline-brand"
                size="lg"
                class="mb-3"
                v-b-toggle.details-modal
            >
                Detailed instructions
            </b-btn>
            <b-btn
                variant="brand"
                size="lg"
                class="px-5 float-right mb-3"
                @click="verifyAction"
            >
                Verify
            </b-btn>
        </div>
    </b-modal>
</template>
<script>
export default {
    name: 'increase-allowance-modal',
    data() {
        return {};
    },
    computed: {
        metamaskUrl() {
            return 'https://metamask.io/';
        },
        ledgerUrl() {
            return 'https://www.ledger.com/';
        },
        address() {
            return '0x1214654541s4f4d4df8d6f43f1d4fdf4dede';
        }
    },
    methods: {
        copyAddress() {
            let copyText = document.getElementById('address');
            copyText.select();
            document.execCommand('copy');
            this.$notify({
                type: 'info',
                title: 'Copied'
            });
        },
        verifyAction() {
        }
    }
};
</script>
<style lang="scss">
#address {
    position: absolute;
    top: -9999px;
    left: -9999px;
    height: 0;
}
</style>
