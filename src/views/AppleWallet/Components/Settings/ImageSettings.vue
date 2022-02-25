<template>
    <div class="content">
        <b-row>
            <b-col sm="6">
                <b-row class="mb-4">
                    <b-col
                        class="d-flex justify-content-between align-items-center"
                        sm="12"
                    >
                        <h4 class="text-brand">Images</h4>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <h5 class="text-brand">Lockscreen Icon</h5>
                        <div>
                            <p>
                                The lockscreen icon is mandatory and must be 1:1
                                ratio (square). The minimum required size is 87
                                x 87 pixels.
                            </p>
                            <p>
                                Your lockscreen icon is shared across all Offers
                                in this Campaign.
                            </p>
                        </div>

                        <b-row class="my-5">
                            <b-col sm="4">
                                <div class="lockscreen-icon-upload">
                                    <div class="upload-wrapper">
                                        <file-upload
                                            input-id="lockscreen-file"
                                            class="btn"
                                            name="lockscreenFile"
                                            ref="lockScreenUpload"
                                            :extensions="extensions"
                                            :headers="headers"
                                            :accept="acceptTypes"
                                            :post-action="uploadUrl"
                                            :multiple="false"
                                            :drop="true"
                                            :drop-directory="false"
                                            @input-filter="lockscreenInputFilter"
                                            @input-file="lockscreenInputFile"
                                            v-model="lockscreenFiles"
                                        >
                                            <div v-if="lockscreenFiles.length">
                                                <img :src="lockscreenFiles[0].url" />
                                            </div>

                                            <div v-if="lockscreenFiles.length === 0">
                                                <fa-icon class="icon" icon="cloud-upload-alt" />
                                            </div>
                                            <span v-if="lockscreenFiles.length === 0">Drag and drop a file here</span>
                                        </file-upload>
                                        <div v-show="lockscreenFiles.length > 0 && lockscreenEdit">
                                            <b-modal
                                                id="lockscreen-crop-modal"
                                                ref="modal"
                                                title="Configure your image below"
                                                centered
                                                header-class="custom-header"
                                                :hide-footer="true"
                                            >
                                                <form
                                                    ref="form"
                                                    @submit.prevent="editSaveLockscreen"
                                                >
                                                    <cropper
                                                        ref="editLockscreenImage"
                                                        class="cropper"
                                                        :src="lockscreenFiles[0] ? lockscreenFiles[0].url : ''"
                                                        :stencil-props="{aspectRatio: 10/12}"
                                                        @change="lockscreenImageChange"
                                                    ></cropper>

                                                    <div class="button-group d-flex justify-content-between">
                                                        <b-button
                                                            class="btn"
                                                            variant="outline-brand"
                                                            @click.prevent="$refs.lockScreenUpload.clear"
                                                        >
                                                            Back
                                                        </b-button>
                                                        <b-button
                                                            type="submit"
                                                            variant="brand"
                                                        >
                                                            Set Image
                                                        </b-button>
                                                    </div>
                                                </form>
                                            </b-modal>
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                            <b-col sm="8">
                                <b-row class="mb-3">
                                    <b-col sm="12">
                                        <b-form-checkbox
                                            id="checkbox-1"
                                            v-model="isUploadSquareLogo"
                                            name="checkbox-1"
                                        >
                                            Upload square logo
                                        </b-form-checkbox>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col
                                        class="d-flex align-items-center"
                                        sm="4"
                                    >
                                        <label for="logo-text">Logo text</label>
                                    </b-col>
                                    <b-col sm="8">
                                        <b-form-input
                                            id="input-name"
                                            type="text"
                                            v-model="formData.logoText"
                                            required
                                        ></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <h5 class="text-brand">Logo Image</h5>
                        <div>
                            <p>
                                Logos are a strict requirement for a wallet
                                pass. You can upload a square or rectangular
                                logo. The recommended dimensions for a
                                rectangular logo are 480 pixels wide by 150
                                pixels high. A square logo should be 150 pixels
                                wide by 150 pixels high.
                            </p>
                        </div>
                        <b-row v-if="isUploadSquareLogo" class="my-5">
                            <b-col sm="12">
                                <div class="logo-image-upload">
                                    <div class="upload-wrapper">
                                        <file-upload
                                            input-id="logo-file"
                                            class="btn"
                                            name="logoFile"
                                            ref="logoUpload"
                                            :extensions="extensions"
                                            :headers="headers"
                                            :accept="acceptTypes"
                                            :multiple="false"
                                            :drop="true"
                                            :drop-directory="false"
                                            @input-filter="logoInputFilter"
                                            @input-file="logoInputFile"
                                            v-model="logoFiles"
                                        >
                                            <div v-if="logoFiles.length">
                                                <img :src="logoFiles[0].url" />
                                            </div>

                                            <div v-if="logoFiles.length === 0">
                                                <fa-icon class="icon" icon="cloud-upload-alt" />
                                            </div>
                                            <span v-if="logoFiles.length === 0">Drag and drop a file here</span>
                                        </file-upload>
                                        <div v-show="logoFiles.length > 0 && logoEdit">
                                            <b-modal
                                                id="logo-crop-modal"
                                                ref="modal"
                                                title="Configure your image below"
                                                centered
                                                header-class="custom-header"
                                                :hide-footer="true"
                                            >
                                                <form
                                                    ref="form"
                                                    @submit.prevent="editSaveLogo"
                                                >
                                                    <cropper
                                                        ref="editLogoImage"
                                                        class="cropper"
                                                        :src="logoFiles[0] ? logoFiles[0].url : ''"
                                                        :stencil-props="{aspectRatio: 10/12}"
                                                        @change="logoImageChange"
                                                    ></cropper>

                                                    <div class="button-group d-flex justify-content-between">
                                                        <b-button
                                                            class="btn"
                                                            variant="outline-brand"
                                                            @click.prevent="$refs.logoUpload.clear"
                                                        >
                                                            Back
                                                        </b-button>
                                                        <b-button
                                                            type="submit"
                                                            variant="brand"
                                                        >
                                                            Set Image
                                                        </b-button>
                                                    </div>
                                                </form>
                                            </b-modal>
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <h5 class="text-brand">Strip Image</h5>
                        <p>
                            Add a hero image to give customers an idea of what
                            they’d be purchasing. This recommended dimensions of
                            1125 by 432 pixels.
                        </p>
                        <div class="strip-image-upload">
                            <div class="upload-wrapper">
                                <file-upload
                                    input-id="strip-file"
                                    class="btn"
                                    name="stripFile"
                                    ref="stripUpload"
                                    :extensions="extensions"
                                    :headers="headers"
                                    :accept="acceptTypes"
                                    :multiple="false"
                                    :drop="true"
                                    :drop-directory="false"
                                    @input-filter="stripInputFilter"
                                    @input-file="stripInputFile"
                                    v-model="stripFiles"
                                >
                                    <div v-if="stripFiles.length">
                                        <img :src="stripFiles[0].url" />
                                    </div>

                                    <div v-if="stripFiles.length === 0">
                                        <fa-icon class="icon" icon="cloud-upload-alt" />
                                    </div>
                                    <span v-if="stripFiles.length === 0">Drag and drop a file here</span>
                                </file-upload>
                                <div v-show="stripFiles.length > 0 && stripEdit">
                                    <b-modal
                                        id="strip-crop-modal"
                                        ref="modal"
                                        title="Configure your image below"
                                        centered
                                        header-class="custom-header"
                                        :hide-footer="true"
                                    >
                                        <form
                                            ref="form"
                                            @submit.prevent="editSaveStrip"
                                        >
                                            <cropper
                                                ref="editStripImage"
                                                class="cropper"
                                                :src="stripFiles[0] ? stripFiles[0].url : ''"
                                                :stencil-props="{aspectRatio: 10/12}"
                                                @change="stripImageChange"
                                            ></cropper>

                                            <div class="button-group d-flex justify-content-between">
                                                <b-button
                                                    class="btn"
                                                    variant="outline-brand"
                                                    @click.prevent="$refs.stripUpload.clear"
                                                >
                                                    Back
                                                </b-button>
                                                <b-button
                                                    type="submit"
                                                    variant="brand"
                                                >
                                                    Set Image
                                                </b-button>
                                            </div>
                                        </form>
                                    </b-modal>
                                </div>
                            </div>
                        </div>
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

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

import { mapGetters } from 'vuex';
export default {
    name: 'image-settings-page',
    props: ['urlPath'],
    components: {
        CouponLayout,
        Cropper
    },
    data() {
        return {
            formData: {
                logoText: ''
            },
            isUploadSquareLogo: true,
            headers: {},
            extensions: 'gif,jpg,jpeg,png',
            acceptTypes: 'image/png,image/gif,image/jpeg,image/jpg',
            lockscreenFiles: [],
            stripFiles: [],
            logoFiles: [],
            lockscreenEdit: false,
            stripEdit: false,
            logoEdit: false,
            cropper: false,
            croppedLockscreenImage: null,
            croppedStripImage: null,
            croppedLogoImage: null,
            apiEndPoint: 'https://pmxfwkh2ka.execute-api.eu-central-1.amazonaws.com/default/ucc-upload-image',
            bucketName: 'pass-templates-images',
            fileHashedName: '',
            fileExtension: '',
            contentType: ''
        };
    },
    computed: {
        ...mapGetters(['customerId']),
        uploadUrl() {
            let oldFile = this.lockscreenFiles[0];
            return this.apiEndPoint + '?bucketName=' + this.bucketName + '&fileName=' + this.fileHashedName + this.fileExtension + '&contentType=' + this.contentType + '&customerId=' + this.customerId;
        }
    },
    methods: {
        editSaveLockscreen() {
            this.lockscreenEdit = false;
            let oldFile = this.lockscreenFiles[0];
            let binStr = atob(
                this.croppedLockscreenImage
                    .toDataURL(oldFile.type)
                    .split(',')[1]
            );
            let arr = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            let file = new File([arr], oldFile.name, { type: oldFile.type });
            this.$refs.lockScreenUpload.update(oldFile.id, {
                file,
                type: file.type,
                size: file.size,
                active: true
            });

            this.$bvModal.hide('lockscreen-crop-modal');
        },
        editSaveStrip() {
            this.stripEdit = false;
            let oldFile = this.stripFiles[0];
            let binStr = atob(
                this.croppedStripImage
                    .toDataURL(oldFile.type)
                    .split(',')[1]
            );
            let arr = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            let file = new File([arr], oldFile.name, { type: oldFile.type });
            this.$refs.stripUpload.update(oldFile.id, {
                file,
                type: file.type,
                size: file.size,
                active: true
            });

            this.$bvModal.hide('strip-crop-modal');
        },
        editSaveLogo() {
            this.logoEdit = false;
            let oldFile = this.logoFiles[0];
            let binStr = atob(
                this.croppedLogoImage
                    .toDataURL(oldFile.type)
                    .split(',')[1]
            );
            let arr = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            let file = new File([arr], oldFile.name, { type: oldFile.type });
            this.$refs.logoUpload.update(oldFile.id, {
                file,
                type: file.type,
                size: file.size,
                active: true
            });

            this.$bvModal.hide('logo-crop-modal');
        },
        lockscreenInputFile(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                this.$nextTick(function() {
                    this.lockscreenEdit = true;
                    this.$bvModal.show('lockscreen-crop-modal');
                });
            }
            if (!newFile && oldFile) {
                this.lockscreenEdit = false;
                this.$bvModal.hide('lockscreen-crop-modal');
            }
        },
        lockscreenInputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    alert('Your choice is not a picture');
                    return prevent();
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = '';
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file);
                }
            }
        },
        logoInputFile(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                this.$nextTick(function() {
                    this.logoEdit = true;
                    this.$bvModal.show('logo-crop-modal');
                });
            }
            if (!newFile && oldFile) {
                this.logoEdit = false;
                this.$bvModal.hide('logo-crop-modal');
            }
        },
        logoInputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    alert('Your choice is not a picture');
                    return prevent();
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = '';
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file);
                }
            }
        },
        stripInputFile(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                this.$nextTick(function() {
                    this.stripEdit = true;
                    this.$bvModal.show('strip-crop-modal');
                });
            }
            if (!newFile && oldFile) {
                this.stripEdit = false;
                this.$bvModal.hide('strip-crop-modal');
            }
        },
        stripInputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    alert('Your choice is not a picture');
                    return prevent();
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = '';
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file);
                }
            }
        },
        lockscreenImageChange({coordinates, canvas}) {
            this.croppedLockscreenImage = canvas;
        },
        stripImageChange({coordinates, canvas}) {
            this.croppedStripImage = canvas;
        },
        logoImageChange({coordinates, canvas}) {
            this.croppedLogoImage = canvas;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    padding-top: 30px;
    padding-bottom: 30px;
    .layout-preview {
        // height: 100%;
        height: auto;
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: #ffffff;
    }
    .lockscreen-icon-upload {
        height: 135px;
        max-width: 135px;
    }
    .strip-image-upload {
        width: 361px;
        height: 135px;
    }
    .logo-image-upload {
        height: 135px;
        max-width: 135px;
    }
    .upload-wrapper {
        height: 100%;
        width: 100%;
        border: 1px dashed #707070;

        .file-uploads {
            width: 100%;
            height: 100%;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: white;
            padding: 0px;

            span {
                font-size: 8px;
                color: #4d4f5c;
                opacity: 0.5;
                margin-top: 5px;
            }

            .icon {
                width: 60px;
                height: 40px;
                color: #2f3380;
                opacity: 0.1;
            }
        }
    }
    label {
        font: normal normal normal 15px/25px;
        letter-spacing: 0px;
        color: #2f3380;
        margin-bottom: 0px;
    }
    h4 {
        font-size: 28px;
        line-height: 40px;
    }
    h5 {
        font-size: 20px;
        line-height: 40px;
    }
    p {
        font-size: 16px;
        color: #707070;
    }
}
.button-group {
    margin-top: 50px;
    button {
        width: 185px;
    }
}
// .cropper {
//     width: 944px;
//     height: 337px;
// }


::v-deep .custom-control-label {
    font: normal normal normal 15px/25px;
    letter-spacing: 0px;
    color: #2f3380;
}
</style>
