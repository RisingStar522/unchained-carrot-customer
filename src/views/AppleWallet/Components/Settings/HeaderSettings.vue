<template>
    <div class="content">
        <b-row>
            <b-col sm="6">
                <b-row class="mb-4">
                    <b-col
                        class="d-flex justify-content-between align-items-center"
                        sm="12"
                    >
                        <h4 class="text-brand">Header</h4>
                        <div>
                            <fa-icon class="text-brand" icon="info-circle" />
                            <b-link class="ml-2" @click="openHelpModal">Help</b-link>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col sm="12">
                        <p>
                            The header can contain up to 3 horizontal fields.
                            Each field can be configured to display text, url,
                            email, phone number, number, date or currency
                            information.
                        </p>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col sm="12" class="accordion">
                        <b-card
                            no-body
                            class="mb-2"
                            v-for="(field, i) in fields"
                            :key="i"
                        >
                            <b-button
                                block
                                v-b-toggle="`accordion-${i + 1}`"
                                variant="outline-brand"
                                class="text-brand d-flex align-items-center justify-content-between"
                            >
                                <span>{{ field.name }}</span>
                                <div>
                                    <span @click="removeField(i)">
                                        <fa-icon
                                            class="text-secondary"
                                            icon="trash-alt"
                                        />
                                    </span>
                                    <span class="ml-3">
                                        <fa-icon
                                            class="text-secondary"
                                            icon="chevron-down"
                                        />
                                    </span>
                                </div>
                            </b-button>
                            <b-collapse :id="`accordion-${i + 1}`">
                                <FieldContent :field="field"/>
                            </b-collapse>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col class="d-flex justify-content-end" sm="12">
                        <b-button variant="brand" @click="openFieldsModal"
                            >Add field</b-button
                        >
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="6">
                <b-container class="layout-preview">
                    <CouponLayout />
                </b-container>
            </b-col>
        </b-row>

        <RecommendFieldsModal @confirm="addHeaderFields" />
        <CouponLayoutHelpModal />
    </div>
</template>

<script>
import RecommendFieldsModal from '../Modal/RecommendFieldsModal.vue';
import FieldContent from '../FieldContent.vue';
import CouponLayoutHelpModal from '../Modal/CouponLayoutHelpModal.vue';
import CouponLayout from '../CouponLayout.vue';
export default {
    name: 'header-settings-page',
    components: {
        RecommendFieldsModal,
        FieldContent,
        CouponLayoutHelpModal,
        CouponLayout
    },
    data() {
        return {
            fields: [],

        };
    },
    methods: {
        openFieldsModal() {
            this.$bvModal.show('fields-modal');
        },
        openHelpModal() {
            this.$bvModal.show('coupon-layout-modal');
        },
        addHeaderFields(value) {
            this.fields.push(JSON.parse(JSON.stringify(value)));
        },
        removeField(index) {
            this.fields.splice(index, 1);
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
    p {
        font-size: 16px;
        line-height: 18px;
        color: #707070;
    }
    button {
        box-shadow: none;
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
}
::v-deep {
    .button-group {
        margin-top: 50px;
        a {
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
}
</style>
