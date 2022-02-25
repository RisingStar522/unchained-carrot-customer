<template>
    <div class="content">
        <b-row>
            <b-col sm="6">
                <b-row class="mb-4">
                    <b-col
                        class="d-flex justify-content-between align-items-center"
                        sm="12"
                    >
                        <h4 class="text-brand">NFC</h4>
                        <div>
                            <fa-icon class="text-brand" icon="info-circle" />
                            <b-link class="ml-2" @click="openHelpModal">Help</b-link>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col sm="3">
                        <label for="enabled">Enabled</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-checkbox switch size="lg" v-model="formData.enabled"></b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col sm="3">
                        <label for="certification-id">Certificate ID</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input
                            id="input-name"
                            type="text"
                            v-model="formData.certificationId"
                            required
                        ></b-form-input>
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
    name: 'nfc-settings-page',
    components: {
        CouponLayoutHelpModal,
        CouponLayout
    },
    data() {
        return {
            formData: {
                enabled: true,
                certificationId: ''
            }
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
}
::v-deep .custom-control-label::before {
      border-color: #2F3380 !important;
      background-color: #2F3380 !important;
    }
</style>
