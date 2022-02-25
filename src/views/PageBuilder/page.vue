<template>
    <div style="width: -webkit-fill-available; width:100%">
        <div
            id="bee-container"
            class="bee-container bee-container__slidebar-open"
            style="width: 100%"
        >
            <Loading :isLoading="loading" />
        </div>
        <Modal>
            <template #default>
                <div class="html-editor">
                    <editor
                        v-model="htmlFileContent"
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
        <b-modal
            v-model="onSaveSidebarVisibility"
            id="template-modal"
            hide-footer
            title="Details"
            hide-backdrop
            body-class="pt-0"
            header-class="custom-modal-header"
        >
            <div class="validation_mark">
                <img
                    class="mr-2"
                    src="../../assets/icons/validation_mandatory.svg"
                />
                <span>MANDATORY</span>
            </div>
            <h6 class="mb-4">Fill in all the fields</h6>
            <b-form @submit="handleOnSaveSidebarFormSubmit" novalidate>
                <b-form-group>
                    <label for="name" class="text-brand">Save file as</label>
                    <b-input
                        id="name"
                        v-model="pageDetail.name"
                        required
                        placeholder="page.html"
                    />
                    <p style="font-size: 11px">
                        This name will be visible in the URL
                    </p>
                </b-form-group>
                <b-form-group>
                    <label for="subject" class="text-brand"
                        >Name of the page</label
                    >
                    <b-input
                        id="subject"
                        v-model="pageDetail.subject"
                        required
                    />
                    <p style="font-size: 11px">
                        This is the title of the page set in HTML
                    </p>
                </b-form-group>
                <b-form-group>
                    <label for="description" class="text-brand"
                        >Description</label
                    >
                    <b-textarea
                        id="description"
                        v-model="pageDetail.description"
                        rows="5"
                        required
                    ></b-textarea>
                </b-form-group>
                <b-form-group>
                    <label for="locale" class="text-brand">Locale</label>
                    <b-form-select
                        id="locale"
                        v-model="selectedLocale"
                        :value="test"
                        :options="localeOptions"
                    ></b-form-select>
                </b-form-group>

                <b-form-group>
                    <label for="publish" class="text-brand"
                        >Where do you want to publish your page</label
                    >
                    <b-form-select
                        id="publish"
                        v-model="selectedPublish"
                        :options="publishOptions"
                    ></b-form-select>
                </b-form-group>

                <!-- <p class="addMergeStyle" @click="showAddMergeTag()">
                    Add merge tag
                </p> -->
                <b-form-group>
                    <div class="rowSpace">
                        <b-btn
                            block
                            variant="outline-primary"
                            style="flex: 0.48"
                            @click="onDiscardChanges"
                        >
                            Discard Changes
                        </b-btn>
                        <b-btn
                            type="submit"
                            block
                            variant="brand"
                            style="flex: 0.48"
                            >{{
                                $route.params.purpose == 'update'
                                    ? 'Update'
                                    : 'Save'
                            }}
                        </b-btn>
                    </div>
                </b-form-group>
            </b-form>
        </b-modal>

        <b-modal
            v-model="isPublishModal"
            hide-footer
            centered
            hide-backdrop
            body-class="pt-0"
        >
            <div class="text-center">
                <h5 class="text-primary">Your page is not published yet.</h5>
                <h5 class="mb-5 text-primary">
                    Do you want to publish it now?
                </h5>
                <div class="rowSpace">
                    <b-btn
                        block
                        variant="outline-primary"
                        style="flex: 0.48"
                        @click="onDiscardChanges"
                    >
                        Later
                    </b-btn>
                    <b-btn
                        type="submit"
                        block
                        variant="brand"
                        style="flex: 0.48"
                        @click="handleOnPublishNow"
                        >Publish Now
                    </b-btn>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Bee from '@mailupinc/bee-plugin';
import Modal from './components/modal.vue';
import Editor from 'vue2-ace-editor';
import Loading from '../../components/Loading';
import blankTemplate from './templates/blank-template.json';
import BuilderAPI from '../../api/BuilderAPI';

export default {
    name: 'pageBuilder-page',
    components: {
        Modal,
        Editor,
        Loading
    },
    data: () => ({
        loading: true,
        pageDetail: {
            name: '',
            title: '',
            description: ''
        },
        selectedLocale: null,
        selectedPublish: null,
        localeOptions: require('./localeOption.json'),
        publishOptions: [
            { value: null, text: 'pages.unchainedcarrot.com' }
        ],
        beeToken: '',
        htmlFileContent: '',
        jsonFileContent: JSON.stringify(blankTemplate),
        copied: false,
        onSaveSidebarVisibility: false,
        isPublishModal: false,
        beeObj: {},
        saveAs: 'page'
    }),
    methods: {
        onDiscardChanges() {
            this.onSaveSidebarVisibility = false;
            this.isPublishModal = false;
            this.$router.push('/page-builder');
        },
        handleOnPublishNow() {},
        async initializeBeePlugin() {
            const beeConfig = {
                uid: 'A-S00062286', //needed for identify resources of the that user and billing stuff
                container: 'bee-container', //Identifies the id of div element that contains BEE Plugin
                language: localStorage.getItem('lang')
                    ? localStorage.getItem('lang')
                    : 'en-US',
                onSave: (jsonFile, htmlFile) => {
                    this.jsonFileContent = jsonFile;
                    this.htmlFileContent = htmlFile;
                    this.saveAs = 'page'; // Important!
                    this.showOnSaveSidebar(true);
                },
                onSaveAsTemplate: jsonFile => {
                    this.jsonFileContent = jsonFile;
                    this.htmlFileContent = 'not available on saveAsTemplate';
                    this.saveAs = 'template'; // Important!
                    this.showOnSaveSidebar(true);
                },
                onSend: htmlFile => {
                    this.htmlFileContent = htmlFile;
                },
                onError: errorMessage => {},
                onLoad: json => {
                    this.loading = false;
                }
            };

            const beePlugin = new Bee();
            beePlugin
                .getToken(
                    process.env.VUE_APP_BEE_PAGE_BUILDER_ID,
                    process.env.VUE_APP_BEE_PAGE_BUILDER_SECRET
                )
                .then(() => {
                    beePlugin.start(
                        beeConfig,
                        JSON.parse(this.jsonFileContent)
                    );

                    this.beeObj = beePlugin;
                })
                .catch(error => {});

            return beePlugin;
        },
        async updateLandingPageTemplate(payload) {
            const resp = await this.$store.dispatch(
                'updateLandingPageTemplate',
                payload
            );

            return resp;
        },
        async updateLandingPage(payload) {
            const resp = await this.$store.dispatch(
                'updateLandingPage',
                payload
            );

            return resp;
        },
        async handleOnSaveSidebarFormSubmit(evt) {
            evt.preventDefault();

            this.loading = true;

            const { name, title, description } = this.pageDetail;
            let json = JSON.parse(this.jsonFileContent);
            let html = this.htmlFileContent;

            json.page.title = title;
            json.page.description = description;
            json.page.template.name = name;
            json = JSON.stringify(json);

            let payload = {
                name,
                title,
                description,
                json,
                html
            };

            // UPDATING
            const { templateId, purpose, type } = this.$route.params;
            if (purpose && purpose == 'update') {
                if (type && type == 'template') {
                    //update template
                    this.loading = true;
                    const resp = await this.updateLandingPageTemplate({
                        templateId,
                        data: payload
                    });
                    this.loading = false;
                    this.$notify({
                        title: 'Success',
                        text: resp.message,
                        type: 'success'
                    });
                } else if (type && type == 'page') {
                    payload.status = 'draft'; // status is not in the docs but is required
                    // update page
                    const imageUrl = await this.generatePageThumbnail(html);
                    payload.thumbnailUrl = imageUrl;

                    this.loading = true;
                    const resp = await this.updateLandingPage({
                        pageId: this.$route.params.pageId,
                        data: payload
                    });
                    this.loading = false;
                    this.$notify({
                        title: 'Success',
                        text: resp.message,
                        type: 'success'
                    });

                    // this.$bvModal.show('output');
                }
            } else {
                // SAVING
                if (this.saveAs == 'template') {
                    this.$store
                        .dispatch('createLandingPageTemplate', payload)
                        .then(resp => {
                            this.$notify({
                                title: 'Success',
                                text: 'Page template saved successfully',
                                type: 'success'
                            });
                        })
                        .catch(error => {
                            const { reason, name } = error.response.result;

                            const err =
                                reason instanceof Array
                                    ? reason.map(r => r.message).toString()
                                    : reason;

                            this.$notify({
                                title: name,
                                text: err,
                                type: 'error'
                            });
                        })
                        .finally(() => (this.loading = false));
                } else if (this.saveAs == 'page') {
                    payload.status = 'draft';
                    const imageUrl = await this.generatePageThumbnail(html);
                    payload.thumbnailUrl = imageUrl;
                    this.$store
                        .dispatch('createLandingPage', payload)
                        .then(resp => {
                            this.$notify({
                                title: 'Success',
                                text: 'Page saved successfully',
                                type: 'success'
                            });

                            // this.$bvModal.show('output');
                        })
                        .catch(e => {
                            this.$notify({
                                title: e.response.result.name,
                                text:
                                    e.response.result.reason instanceof Array
                                        ? e.response.result.reason
                                              .map(({ message }) => message)
                                              .join('. ')
                                        : e.response.result.reason,
                                type: 'error'
                            });
                        })
                        .finally(() => (this.loading = false));
                }
            }

            this.onSaveSidebarVisibility = false;
            this.isPublishModal = true;
        },
        showOnSaveSidebar(value) {
            this.onSaveSidebarVisibility = value;
        },
        async copyCode() {
            try {
                await navigator.clipboard.writeText(this.htmlFileContent);
                this.copied = true;
                this.$children[0].$refs.copyBtn.setAttribute('title', 'copied');
            } catch (error) {}
        },
        editorInit: function() {
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/html');
            require('brace/mode/javascript'); //language
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript'); //snippet
        },
        async getLandingPageTemplate(templateId) {
            try {
                const { result } = await this.$store.dispatch(
                    'getLandingPageTemplate',
                    templateId
                );

                return result;
            } catch (e) {
                this.$notify({
                    title: e.response.result.name,
                    text: e.response.result.reason,
                    type: 'error'
                });
            }
        },
        async getLandingPage(pageId) {
            try {
                const { result } = await this.$store.dispatch(
                    'getLandingPage',
                    pageId
                );

                return result;
            } catch (e) {
                this.$notify({
                    title: e.response.result.name,
                    text: e.response.result.reason,
                    type: 'error'
                });
            }
        },
        async generatePageThumbnail(htmlString) {
            try {
                const base64EncodedHTML = btoa(htmlString);
                const response = await new BuilderAPI().generatePageThumbnail(
                    base64EncodedHTML
                );

                const imageUrl = response.content;

                return imageUrl;
            } catch (error) {}
        }
    },
    async mounted() {
        const templateId = this.$route.params.templateId;
        const pageId = this.$route.params.pageId;

        if (templateId) {
            const data = await this.getLandingPageTemplate(templateId);

            const { name, title, description, json, html } = data;
            this.jsonFileContent = json;
            this.htmlFileContent = html;
            this.pageDetail.name = name;
            this.pageDetail.title = title;
            this.pageDetail.description = description;

            this.initializeBeePlugin();
        } else if (pageId) {
            const data = await this.getLandingPage(pageId);

            const { name, title, description, json, html } = data;
            this.jsonFileContent = json;
            this.htmlFileContent = html;
            this.pageDetail.name = name;
            this.pageDetail.title = title;
            this.pageDetail.description = description;

            this.initializeBeePlugin();
        } else {
            this.initializeBeePlugin();
        }
    }
};
</script>

<style scoped lang="scss">
.html-editor #editor {
    height: 100%;
}
.pt-0 {
    padding-top: 0px;
}
.rowSpace {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.addMergeStyle {
    color: #2f337f;
    cursor: pointer;
}
table {
    tbody {
        tr {
            .action-icon {
                width: 23px;
                .default {
                    display: block;
                }
                .hover,
                .active {
                    display: none;
                }
            }
            .action-icon:hover {
                .default,
                .active {
                    display: none;
                }
                .hover {
                    display: block;
                }
            }
            &.table-active {
                .action-icon {
                    .active {
                        display: block;
                    }
                    .default,
                    .hover {
                        display: none;
                    }
                }
            }
        }
    }
}
.mb-10 {
    margin-bottom: 10px;
}
.validation_mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -70px;

    span {
        color: #a3a0fb;
        font-size: 12px;
        line-height: 20px;
    }
}
::v-deep {
    .custom-modal-header {
        padding-bottom: 10px;
        .modal-title {
            color: #2f337f;
            font-weight: 800;
            font-size: 22px;
        }
    }
}
</style>
