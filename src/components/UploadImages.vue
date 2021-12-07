<template>
    <div :class="'upload-wrapper' + (isShown ? '' : ' hidden')">
        <div class="upload-block">
            <h4 class="upload-title">
                Upload image to CDN
                <span
                    class="float-right text-muted pl-1 pr-1 cursor-pointer"
                    @click="closeModal"
                >
                    <fa-icon icon="times" />
                </span>
            </h4>
            <div
                :class="
                    'upload-content' +
                        ($refs.upload && $refs.upload.dropActive
                            ? ' active'
                            : '')
                "
            >
                <fa-icon icon="cloud-upload-alt" />
                <span>Drop files to upload or</span>
                <file-upload
                    class="btn btn-brand btn-sm"
                    name="image"
                    ref="upload"
                    :headers="headers"
                    :accept="acceptTypes"
                    :post-action="uploadUrl"
                    :multiple="true"
                    :drop="true"
                    :drop-directory="false"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    v-model="files"
                >
                    Browse
                </file-upload>
            </div>
            <div class="upload-files" v-show="files.length">
                <div v-for="file in files" :key="file.id" class="image-block">
                    <div class="image-preview">
                        <img
                            v-if="file.thumb"
                            :src="file.thumb"
                            width="40"
                            height="auto"
                        />
                        <span v-else>No Image</span>
                    </div>
                    <div class="image-path">
                        <span v-if="file.error">Error on uploading</span>
                        <span v-else-if="file.success">{{ file.name }}</span>
                        <span v-else>Loading ...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '../config/api.config';
import AuthService from '../services/AuthService';
export default {
    name: 'upload-images-modal',
    props: ['urlPath'],
    data() {
        return {
            headers: {},
            acceptTypes: 'image/png,image/gif,image/jpeg,image/jpg',
            isShown: false,
            config: config,
            files: []
        };
    },
    computed: {
        uploadUrl() {
            return this.config.uccAPI + this.urlPath;
        }
    },
    created() {
        this.updateHeaders();
        this.$parent.$on('showUploader', () => {
            this.isShown = true;
        });
    },
    methods: {
        updateHeaders() {
            return new Promise(async resolve => {
                this.headers = {
                    Authorization:
                        'Bearer ' + (await AuthService.getAccessToken())
                };
                resolve();
            });
        },
        resetUploader() {
            this.files = [];
        },
        closeModal() {
            this.isShown = false;
            this.resetUploader();
        },
        inputFilter(newFile, oldFile) {
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                newFile.blob = '';
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file);
                }
                newFile.thumb = '';
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob;
                }
            }
        },
        async inputFile(newFile, oldFile) {
            if (newFile && !oldFile) {
                // Add file
                await this.updateHeaders();
                this.$refs.upload.active = true;
            }

            if (newFile && oldFile) {
                // Update file

                // Upload error
                if (newFile.error !== oldFile.error) {
                    console.error('Error on uploading', newFile.response);
                }

                // Uploaded successfully
                if (newFile.success !== oldFile.success) {
                    this.$store.commit('ADD_QUIZ_IMAGES', newFile.response.url);
                }
            }
        }
    }
};
</script>
<style scoped lang="scss">
.upload-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000aa;
    z-index: 1025;
    display: flex;
    justify-content: center;
    align-items: center;

    .upload-block {
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
        max-width: 800px;
        width: 90%;

        .upload-title {
            text-align: center;
            margin-bottom: 40px;
        }

        .upload-content {
            height: 100px;
            font-size: 1.3em;
            width: 80%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border: 2px solid #2f3380;
            color: #2f3380;
            border-radius: 4px;
            padding: 0 30px;
            margin: 0 auto 40px;

            &.active {
                border-style: dashed;
            }
        }
        .upload-files {
            overflow: auto;
            max-height: 35vh;
        }

        .image-block {
            width: 80%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;

            .image-preview {
                width: 40px;
                margin-right: 20px;
            }
            .image-path {
            }
        }
    }
}
</style>
