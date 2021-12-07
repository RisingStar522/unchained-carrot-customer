<template>
    <div class="content">
        <b-row>
            <b-col sm="6">
                <b-row class="mb-4">
                    <b-col
                        class="d-flex justify-content-between align-items-center"
                        sm="12"
                    >
                        <h4 class="text-brand">Barcode</h4>
                    </b-col>
                </b-row>
                <b-row class="mb-4">
                    <b-col sm="12">
                        <h5 class="text-brand">Choose a barcode type</h5>
                    </b-col>
                    <b-col sm="12" class="d-flex justify-content-between align-items-center my-4">
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="../../../../assets/images/qr-code.gif"
                                alt=""
                                width= "63"
                                height="63"
                            />
                            <label class="barcode-label">QR Code</label>
                            <b-form-checkbox
                                id="qr-checkbox"
                                v-model="isCheckedQRCode"
                                name="qr-checkbox"
                            >
                            </b-form-checkbox>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="../../../../assets/images/aztec.gif"
                                alt=""
                                width= "63"
                                height="63"
                            />
                            <label class="barcode-label">AZTEC</label>
                            <b-form-checkbox
                                id="qr-checkbox"
                                v-model="isCheckedAZTEC"
                                name="qr-checkbox"
                            >
                            </b-form-checkbox>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <div style="width: 63px; height: 63px; background-color: #FFFFFF">
                            </div>
                            <label class="barcode-label">None</label>
                            <b-form-checkbox
                                id="qr-checkbox"
                                v-model="isCheckedNone"
                                name="qr-checkbox"
                            >
                            </b-form-checkbox>
                        </div>
                    </b-col>
                    <b-col sm="12" class="d-flex justify-content-between align-items-center my-4">
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="../../../../assets/images/pdf-417.gif"
                                alt=""
                                width= "112"
                                height="29"
                            />
                            <label class="barcode-label">PDF 417</label>
                            <b-form-checkbox
                                id="qr-checkbox"
                                v-model="isCheckedPDF417"
                                name="qr-checkbox"
                            >
                            </b-form-checkbox>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="../../../../assets/images/code-128.gif"
                                alt=""
                                width= "112"
                                height="29"
                            />
                            <label class="barcode-label">Code 128</label>
                            <b-form-checkbox
                                id="qr-checkbox"
                                v-model="isCheckedCode128"
                                name="qr-checkbox"
                            >
                            </b-form-checkbox>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col
                        class="d-flex align-items-center"
                        sm="4"
                    >
                        <label for="content">Barcode content</label>
                    </b-col>
                    <b-col sm="8">
                        <b-form-input
                            id="input-name"
                            type="text"
                            v-model="formData.content"
                            required
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-4">
                    <b-col
                        class="d-flex align-items-center"
                        sm="4"
                    >
                        <label for="alt-text">Barcode Alt Text</label>
                    </b-col>
                    <b-col sm="8">
                        <b-form-input
                            id="input-name"
                            type="text"
                            v-model="formData.altText"
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
    </div>
</template>

<script>
import CouponLayout from '../CouponLayout.vue';
export default {
    name: 'barcode-settings-page',
    components: {
        CouponLayout
    },
    data() {
        return {
            formData: {
                content: '',
                altText: ''
            },
            isCheckedQRCode: false,
            isCheckedAZTEC: false,
            isCheckedNone: false,
            isCheckedPDF417: false,
            isCheckedCode128: false
        }
    }
};
</script>
<style lang="scss" scoped>
.content {
    padding-top: 30px;
    padding-bottom: 30px;
    .layout-preview {
        height: calc(100vh - 150px);
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: #ffffff;
    }
    label {
        font: normal normal normal 15px/25px;
        letter-spacing: 0px;
        color: #2f3380;
        margin-bottom: 0px;
    }
    .barcode-label {
        font-size: 15px;
        line-height: 25px;
        color: #4D4F5C;
    }
    h4 {
        font-size: 28px;
        line-height: 40px;
    }
    h5 {
        font-size: 20px;
        line-height: 40px;
    }
}
::v-deep .custom-control-label {
    font: normal normal normal 15px/25px;
    letter-spacing: 0px;
    color: #2f3380;
}
</style>