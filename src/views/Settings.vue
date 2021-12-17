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
                    :options="StartView"
                    placeholder="Choose Currency"
                    :value.sync="setting.startView"
                    :selected="settings && settings.startView"
                    label="Start View"
                    :novalidation="true"
                />
                <form-input-element
                    :options="StartMode"
                    placeholder="Choose Currency"
                    :value.sync="setting.startMode"
                    :selected="settings && settings.startMode"
                    label="Start Mode"
                    :novalidation="true"
                />
                <form-input-element
                    :options="POSSystemOptions"
                    placeholder="Choose POS System"
                    :value.sync="setting.posSystem"
                    label="POS System"
                    :selected="settings && settings.posSystem"
                    :novalidation="true"
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
                    @click="submitForm()"
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
            StartView: [
                { value: 'admin', text: 'Admin' },
                { value: 'campaign', text: 'Campaign' }
            ],
            StartMode: [{ value: 'test',text: 'Test' }],
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
                language: 'en-US',
                currency: 'eur',
                startView: this.$store.getters['isAdmin']
                    ? 'admin'
                    : 'campaign',
                startMode: 'test',
                pos: 'COUNTR',
                webshop: 'n/a'
            },
            settings: {
                defaultCurrency: '',
                startView: '',
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
        ...mapActions(['getCustomerSettings']),
        async getSettings() {
            const res = await this.$store.dispatch('getCustomerSettings');
            if (!res) return false;
        }
    },
    async mounted() {
        await this.getCustomerSettings();
        this.settings = this.customerSettings;
    }
};
</script>
