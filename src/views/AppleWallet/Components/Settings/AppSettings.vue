<template>
    <div class="content">
        <b-row>
            <b-col sm="6">
                <b-row class="mb-4">
                    <b-col
                        class="d-flex justify-content-between align-items-center"
                        sm="12"
                    >
                        <h4 class="text-brand">App</h4>
                        <div>
                            <fa-icon class="text-brand" icon="info-circle" />
                            <b-link class="ml-2" @click="openHelpModal">Help</b-link>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col sm="12">
                        <label for="store-country">Store Country</label>
                        <b-dropdown
                            :text="selectedCountry"
                            block
                            variant="outline-primary"
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="option in storeCountries"
                                :key="option.value"
                                :value="option.value"
                                @click="selectedCountry = option.value"
                                >{{ option.text }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col sm="12">
                        <b-input-group>
                            <b-form-input
                                class="filter"
                                v-model="formData.filter"
                            >
                            </b-form-input>
                            <b-input-group-append>
                                <b-input-group-text>
                                    <fa-icon
                                        class="text-secondary"
                                        icon="search"
                                    />
                                </b-input-group-text>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="6">
                <b-container class="layout-preview">
                    <CouponLayout />
                </b-container>
            </b-col>
        </b-row>

        <CouponLayoutHelpModal />
    </div>
</template>

<script>
import CouponLayoutHelpModal from '../Modal/CouponLayoutHelpModal.vue';
import CouponLayout from '../CouponLayout.vue';

export default {
    name: 'app-settings-page',
    components: {
        CouponLayoutHelpModal,
        CouponLayout
    },
    data() {
        return {
            formData: {
                enabled: true,
                filter: ''
            },
            selectedCountry: 'Netherlands',
            storeCountries: [
                {
                    value: 'Netherlands',
                    text: 'Netherlands'
                }
            ]
        };
    },
    methods: {
        openHelpModal() {
            this.$bvModal.show('coupon-layout-modal');
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    padding-top: 30px;
    padding-bottom: 30px;
    h4 {
        font-size: 28px;
        line-height: 40px;
    }
    label {
        font: normal normal normal 15px/25px;
        letter-spacing: 0px;
        color: #2f3380;
    }
    .layout-preview {
        height: calc(100vh - 150px);
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: #ffffff;
    }
    .input-group {
        .filter {
            border-right: none;
        }
        .input-group-append {
            .input-group-text {
                background-color: #ffffff;
            }
        }
    }
}
::v-deep .b-dropdown {
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
}
</style>
