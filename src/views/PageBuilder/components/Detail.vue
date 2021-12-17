<template>
    <div class="detailsContainer mt-5">
        <b-card class="px-5 py-4">
            <div class="row">
                <div class="col-md-3">
                    <div
                        style="width: 100%; height: 227px"
                        class="d-flex flex-center flex-column"
                    >
                        <img
                            style="height: 139px; width: 168px"
                            class="img-thumbnail"
                            :src="data.thumbnailUrl"
                        />
                    </div>
                </div>
                <div
                    class="col-md-7 d-flex flex-column justify-content-between"
                >
                    <div>
                        <h2 class="detailsContainer__title">
                            {{ data.name || '' }}
                        </h2>
                        <a class="detailsContainer__link">
                            {{ data.publishedUrl }}
                        </a>
                    </div>
                    <p class="detailsContainer__normalText">
                        {{ data.description }}
                    </p>
                    <div class="detailsContainer__statusBlock">
                        <div class="border-right mr-5 pr-5">
                            <h5 class="detailsContainer__statusBlock-title">
                                STATUS OF THE PAGE
                            </h5>
                            <div
                                class="
                                    detailsContainer__statusBlock-normalText
                                "
                            >
                                <span
                                    class="detailsContainer__statusBlock-dot"
                                    :class="{
                                        active: data.status === 'published'
                                    }"
                                ></span>
                                {{ data.status | capitalize }}
                            </div>
                        </div>
                        <div class="">
                            <h5 class="detailsContainer__statusBlock-title">
                                LOCALE
                            </h5>
                            <p
                                class="
                                    detailsContainer__statusBlock-normalText
                                "
                            >
                                nl-NL
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="d-flex">
                        <b-button
                            variant="outline-primary"
                            @click="handlePreview"
                            >Preview</b-button
                        >
                        <b-button
                            variant="primary"
                            class="ml-3"
                            style="width: 100px"
                            @click="handleGotoPageBuilder"
                            >Edit</b-button
                        >
                    </div>
                </div>
            </div>
        </b-card>
        <Modal>
            <template #default>
                <div class="html-editor">
                    <editor
                        v-model="data.html"
                        @init="editorInit"
                        lang="html"
                        theme="chrome"
                        width="100%"
                        height="500"
                        id="editor"
                    ></editor>
                    <div class="d-flex">
                        <small class="ml-auto" v-if="copied"
                            >Copied to clipboard</small
                        >
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from './modal.vue';
import Editor from 'vue2-ace-editor';
export default {
    name: 'detail-component',
    components: { Modal, Editor },
    data: () => ({
        copied: false
    }),
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        handlePreview() {
            this.$bvModal.show('output');
        },
        handleGotoPageBuilder() {
            this.$router.push({
                name: 'PageBuilder/page',
                params: {
                    pageId: this.data.pageId,
                    templateId: this.data.templateId,
                    purpose: 'update'
                }
            });
        },
        editorInit: function() {
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/html');
            require('brace/mode/javascript'); //language
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript'); //snippet
        }
    },
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
.detailsContainer {
    &__title {
        color: #2f3380;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 3px;
    }

    &__link {
        color: #808495 !important;
        font-size: 13px;
    }

    &__normalText {
        margin-top: 20px;
        font-size: 16px;
    }

    &__statusBlock {
        display: flex;
        justify-self: flex-end;

        &-title {
            color: #a3a6b4;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 700;
        }

        &-dot {
            height: 10px;
            width: 10px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            margin-bottom: 0px;
            &.active {
                background-color: green;
            }
        }

        &-normalText {
            font-size: 13px;
            margin-bottom: 0px;
        }
    }
}
.flex-center {
    justify-content: center;
    background-color: #eaeaea;
    align-items: center;
    border-radius: 9px;
}
</style>
