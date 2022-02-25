<template>
    <div class="content">
        <loading :isLoading="loading" />
        <div class="" v-if="!loading">
            <div class="d-flex align-item-center justify-content-between mt-4">
                <div>
                    <div class="d-flex align-items-center">
                        <h4 class="text-brand mr-3 mb-0">Account Page</h4>
                        <img
                            :src="
                                require('@/assets/images/user@2x.png').default
                            "
                            width="40px"
                            height="40px"
                        />
                    </div>
                </div>
                <div>
                    <b-button variant="outline-primary">Cancel</b-button>
                    <b-button
                        variant="primary ml-4"
                        type="submit"
                        :form="FORM_TYPE[selectedButton]"
                        >Save</b-button
                    >
                </div>
            </div>

            <div class="content__contentDetail">
                <b-button-group class="content__contentDetail-buttonGroup mt-4">
                    <b-button
                        v-for="button in buttonGroup"
                        :key="button.id"
                        squared
                        class="content__contentDetail-buttonGroup-button px-4 py-3"
                        variant="outline"
                        :class="{ active: button.isActive }"
                        @click="handleChangeTab(button.id)"
                        >{{ button.title }}</b-button
                    >
                </b-button-group>

                <b-form id="organization-form">
                    <organization
                        v-if="selectedButton === ACCOUNT_TYPE.ORGANIZATION"
                    />
                </b-form>
                <employee v-if="selectedButton === ACCOUNT_TYPE.EMPLOYEES" />
                <data-export
                    v-if="selectedButton === ACCOUNT_TYPE.DATA_EXPORTS"
                />
                <certificate
                    v-if="selectedButton === ACCOUNT_TYPE.CERTIFICATES"
                />
                <wallet v-if="selectedButton === ACCOUNT_TYPE.WALLET" />
                <domain v-if="selectedButton === ACCOUNT_TYPE.DOMAINS" />
                <resources v-if="selectedButton === ACCOUNT_TYPE.RESOURCES" />
                <api-keys v-if="selectedButton === ACCOUNT_TYPE.API_KEYS" />
                <subscription
                    v-if="selectedButton === ACCOUNT_TYPE.SUBSCRIPTIONS"
                />
                <billing v-if="selectedButton === ACCOUNT_TYPE.BILLING" />
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import Loading from '../../components/Loading.vue';
import { BUTTON_GROUP, ACCOUNT_TYPE, FORM_TYPE } from './constant';
import Organization from './tabs/Organization.vue';
import Employee from './tabs/Employee.vue';
import DataExport from './tabs/DataExport.vue';
import Certificate from './tabs/Certificate.vue';
import Domain from './tabs/Domain.vue';
import Subscription from './tabs/Subscription.vue';
import Billing from './tabs/Billing.vue';
import Wallet from './tabs/Wallet.vue';
import Resources from './tabs/Resources.vue';
import ApiKeys from './tabs/ApiKeys.vue';

export default {
    name: 'organization-home',
    data: () => ({
        loading: false,
        buttonGroup: BUTTON_GROUP,
        selectedButton: ACCOUNT_TYPE.ORGANIZATION,
        ACCOUNT_TYPE,
        FORM_TYPE
    }),
    components: {
        Loading,
        Organization,
        Employee,
        DataExport,
        Certificate,
        Subscription,
        Billing,
        Domain,
        Wallet,
        Resources,
        ApiKeys
    },
    computed: {},
    methods: {
        handleChangeTab(id) {
            this.selectedButton = id;
            this.buttonGroup = this.buttonGroup.map(item => {
                if (item.id === id) {
                    item.isActive = true;
                } else item.isActive = false;

                return item;
            });
        }
    },
    mounted() {},
    filters: {
        formatDate: function(value) {
            return moment(value).format('DD/MM/YYYY');
        },
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
};
</script>

<style scoped lang="scss">
.content {
    &__contentDetail {
        &-buttonGroup {
            &-button {
                &.active {
                    background-color: #ffffff;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
