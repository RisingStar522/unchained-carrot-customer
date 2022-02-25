<template>
    <div class="content fullheight-container">
        <h3 class="page-header">
            Settings
        </h3>

        <b-form
            @submit.prevent=""
            class="fullheight-container__body with-buttons"
        >
            <b-alert variant="danger" v-model="warnings" show>{{
                this.warningsText
            }}</b-alert>
            <b-container class="form_numeric_tab-form hidden-edit" fluid>
                <form-input-element
                    :options="languageOptions"
                    :selected="settings && settings.defaultLocale"
                    placeholder="Choose Language"
                    label="Language *"
                    :value.sync="settings.defaultLocale"
                    :novalidation="true"
                />
                <form-input-element
                    :options="CurrencyOptions"
                    placeholder="Choose Currency"
                    :value.sync="settings.defaultCurrency"
                    :selected="settings && settings.defaultCurrency"
                    label="Currency *"
                    :novalidation="true"
                />
                <form-input-element
                    :options="StartView"
                    placeholder="Choose View"
                    :value.sync="settings.startView"
                    :selected="settings && settings.startView"
                    label="Start View *"
                    :novalidation="true"
                />
                <form-input-element
                    :options="StartMode"
                    placeholder="Choose Mode"
                    :value.sync="settings.startMode"
                    :selected="settings && settings.startMode"
                    label="Start Mode *"
                    :novalidation="true"
                />
                <form-input-element
                    :options="POSSystemOptions"
                    placeholder="Choose POS System"
                    :value.sync="settings.posSystem"
                    label="POS System"
                    :selected="settings && settings.posSystem"
                    :novalidation="true"
                />
                <!-- :value.sync="setting.pos" -->
                <!-- :selected="settings && settings.posSystem" -->
                <form-input-element
                    :options="WebshopSystemOptions"
                    :value.sync="settings.webShopSystem"
                    placeholder="Choose Webshop System"
                    label="Webshop System"
                    :novalidation="true"
                />
            </b-container>
            <br />
            <b-alert v-model="successUpdate" variant="success" show>
                Settings successfully updated!</b-alert
            >
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
import CustomerAPI from '../api/CustomerAPI';

export default {
    name: 'settings-page',
    components: { FormInputElement },
    data() {
        return {
            warnings: false,
            successUpdate: false,
            warningsText: '',
            languageOptions: [
                { value: 'en-US', text: 'English' },
                { value: 'nl-NL', text: 'Dutch' },
                { value: 'it-IT', text: 'Italian' }
            ],
            CurrencyOptions: [{ value: 'EUR', text: 'EUR' }],
            StartView: [
                { value: 'admin', text: 'Admin' },
                { value: 'campaign', text: 'Campaign' }
            ],
            StartMode: [],
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
                allowedModes: [],
                defaultCurrency: '',
                defaultLocale: '',
                posSystem: '',
                startMode: '',
                startView: '',
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
        },
        getApiSettings() {
            new CustomerAPI()
                .getSettings()
                .then(resp => {
                    this.settings = resp;
                    let parsedModes = JSON.parse(this.settings.allowedModes);
                    for (var i = 0; i < parsedModes.length; i++) {
                        this.StartMode.push({
                            value: parsedModes[i],
                            text: parsedModes[i]
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        submitForm() {
            if (!this.settings.defaultLocale) {
                this.warnings = true;
                this.warningsText = 'Please select a Language';
            } else if (!this.settings.defaultCurrency) {
                this.warnings = true;
                this.warningsText = 'Please select a Currency';
            } else if (!this.settings.startView) {
                this.warnings = true;
                this.warningsText = 'Please select a Start View';
            } else if (!this.settings.startMode) {
                this.warnings = true;
                this.warningsText = 'Please select a Start Mode';
            } else {
                this.warnings = false;
                new CustomerAPI()
                    .setSettings(this.settings)
                    .then(resp => {
                        console.log(resp)
                        this.successUpdate = true;
                        localStorage.setItem(
                            'featureMode',
                            this.settings.startMode
                        );
                    })
                    .catch(err => console.log(err));
            }
        }
    },
    async mounted() {
        await this.getCustomerSettings();
        this.getApiSettings();
    }
};
</script>
