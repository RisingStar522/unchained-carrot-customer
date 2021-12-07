<template>
    <div class="upload-wrapper">
        <file-upload
            class="btn"
            name="image"
            ref="upload"
            :extensions="extensions"
            :headers="headers"
            :accept="acceptTypes"
            :multiple="false"
            :drop="true"
            :drop-directory="false"
            @input-filter="inputFilter"
            @input-file="inputFile"
            v-model="files"
        >
            <div v-if="files.length">
                <img :src="files[0].url" />
            </div>

            <div v-if="files.length === 0">
                <fa-icon class="icon" icon="cloud-upload-alt" />
            </div>
            <span v-if="files.length === 0">Drag and drop a file here</span>
        </file-upload>
    </div>
</template>

<script>
export default {
    name: 'upload-image-component',
    data() {
        return {
            headers: {},
            extensions: 'gif,jpg,jpeg,png',
            acceptTypes: 'image/png,image/gif,image/jpeg,image/jpg',
            files: [],
            edit: false,
            cropper: false
        };
    },
    watch: {
        edit(value) {
            if (value) {
                this.$nextTick(function() {
                    if (!this.$refs.editImage) {
                        return;
                    }
                    let cropper = new Cropper(this.$refs.editImage, {
                        aspectRatio: 1 / 1,
                        viewMode: 1
                    });
                    this.cropper = cropper;
                });
            } else {
                if (this.cropper) {
                    this.cropper.destroy();
                    this.cropper = false;
                }
            }
        }
    },
    methods: {
        editSave() {
            this.edit = false;
            let oldFile = this.files[0];
            let binStr = atob(
                this.cropper
                    .getCroppedCanvas()
                    .toDataURL(oldFile.type)
                    .split(',')[1]
            );
            let arr = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            let file = new File([arr], oldFile.name, { type: oldFile.type });
            this.$refs.upload.update(oldFile.id, {
                file,
                type: file.type,
                size: file.size,
                active: true
            });
        },
        inputFile(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                this.$nextTick(function() {
                    this.edit = true;
                });
            }
            if (!newFile && oldFile) {
                this.edit = false;
            }
        },
        inputFilter(newFile, oldFile, prevent) {
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
        }
    }
};
</script>

<style scoped lang="scss">
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
            font-size: 10px;
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
</style>
