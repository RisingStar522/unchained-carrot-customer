<template>
    <div class="content fullheight-container">
        <h3 class="page-header">
            Settings
        </h3>

        <b-form
            @submit.prevent=""
            class="fullheight-container__body with-buttons"
        >
            <b-container class="form_numeric_tab-form hidden-edit" fluid>
                <form-input-element
                    :options="languageOptions"
                    :selected="settings && settings.defaultLocale"
                    placeholder="Choose Language"
                    label="Language"
                    :value.sync="setting.language"
                    :novalidation="true"
                />
                <form-input-element
                    :options="CurrencyOptions"
                    placeholder="Choose Currency"
                    :value.sync="setting.currency"
                    :selected="settings && settings.defaultCurrency"
                    label="Currency"
                    :novalidation="true"
                />
                <form-input-element
                    :options="POSSystemOptions"
                    placeholder="Choose POS System"
                    label="POS System"
                    :selected="settings && is === 'COUNTR'"
                    :novalidation="true"
                    v-model="settings.posSystem"
                />
                <!-- :value.sync="setting.pos" -->
                <!-- :selected="settings && settings.posSystem" -->
                <form-input-element
                    :options="WebshopSystemOptions"
                    :value.sync="setting.webshop"
                    placeholder="Choose Webshop System"
                    label="Webshop System"
                    :novalidation="true"
                />
            </b-container>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="outline-primary"
                    class="min-width-button"
                    size="lg"
                    @click="$router.go(-1)"
                >
                    Back
                </b-button>
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    type="submit"
                >
                    Save
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import FormInputElement from '@/components/Forms/FormInputElement.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'settings-page',
    components: { FormInputElement },
    data() {
        return {
            languageOptions: [
                { value: 'en-US', text: 'English' },
                { value: 'nl-NL', text: 'Dutch' },
                { value: 'it-IT', text: 'Italian' }
            ],
            CurrencyOptions: [{ value: 'eur', text: 'EUR' }],
            POSSystemOptions: [
                { value: 'COUNTR', text: 'Countr' },
                { value: 'SCLOBY', text: 'Scloby' },
                { value: 'LIGHTSPEED', text: 'Lightspeed' },
                { value: 'OTHER', text: 'Other' }
                // { value: 'n/a', text: 'N/A' }
            ],
            WebshopSystemOptions: [
                { value: 'WOOCOMMERCE', text: 'WooCommerce' },
                { value: 'SHOPIFY', text: 'Shopify' },
                { value: 'MAGENTO', text: 'Magento' },
                { value: 'OTHER', text: 'Other' }
                // { value: 'n/a', text: 'N/A' }
            ],
            setting: {
                language: 'italian',
                currency: 'eur',
                pos: 'scloby',
                webshop: 'n/a'
            },
            settings: {
                defaultCurrency: '',
                posSystem: '',
                webShopSystem: ''
            },
            is: ''
        };
    },
    computed: {
        ...mapGetters(['customerSettings'])
    },
    methods: {
        // ...mapActions('customer', ['getCustomerSettings'])
        ...mapActions(['getCustomerSettings']),
        async getSettings() {
            // const res = await this.getCustomerSettings();
            const res = await this.$store.dispatch('getCustomerSettings');
            if (!res) return false;
        }
    },
    async mounted() {
        // if (this.getCustomerSettings === null) {
        await this.getCustomerSettings();
        this.settings = this.customerSettings;
        // }
        // this.getSettings();
    }
};
</script>
