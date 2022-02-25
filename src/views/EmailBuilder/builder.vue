<template>
    <div style="width: -webkit-fill-available; width: 100%">
        <div
            id="beeContainer"
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
                <div>
                    <div class="my-2">
                        <b-form-checkbox
                            id="emailService"
                            v-model="toggleEmailService"
                            name="emailService"
                        >
                            Add to email service provider
                        </b-form-checkbox>
                    </div>

                    <div
                        v-if="toggleEmailService === true"
                        class="d-flex justify-content-sm-between"
                    >
                        <b-form-select
                            class="mr-1"
                            v-model="selectedEmailService"
                            :options="emailServiceOptions"
                            :onchange="onChangeEmailServiceOption()"
                        ></b-form-select>

                        <b-form-select
                            v-model="selectedEmailServiceFolder"
                            :options="emailServiceFolders"
                        ></b-form-select>
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
                    <label for="name" class="text-brand"
                        >Save template as</label
                    >
                    <b-input id="name" v-model="templateDetail.name" required />
                    <p style="font-size: 11px">Name can only include alphanumeric characters. Do not leave spaces, use"_"or"-"</p>
                </b-form-group>
                <b-form-group>
                    <label for="subject" class="text-brand"
                        >Subject of the email</label
                    >
                    <b-input
                        id="subject"
                        v-model="templateDetail.subject"
                        required
                    />
                    <p style="font-size: 11px">Note: Subject can be overwritten later in Email Rules or Email Broadcast</p>
                </b-form-group>
                <b-form-group>
                    <label for="description" class="text-brand"
                        >Description</label
                    >
                    <b-textarea
                        id="description"
                        v-model="templateDetail.description"
                        rows="5"
                        required
                    ></b-textarea>
                </b-form-group>
                <!-- <p class="addMergeStyle" @click="showAddMergeTag()">
                    Add merge tag
                </p> -->
                <div class="addMergeStyle mb-2 d-flex align-items-center">
                    <span> Merge tag in this template </span>
                    <img
                        class="ml-2"
                        src="../../assets/icons/noun_Info.svg"
                        style="width: 18px"
                    />
                </div>
                <div class="rowSpace mb-10" v-show="isAdd">
                    <b-input
                        id="subject"
                        v-model="mergeTagInput.key"
                        style="flex: 0.4"
                        placeholder="Merge Tag"
                    />
                    <b-input
                        id="subject"
                        v-model="mergeTagInput.value"
                        style="flex: 0.4"
                        placeholder="Value"
                    />
                    <b-btn
                        block
                        variant="brand"
                        style="flex: 0.1"
                        @click="handleAddTag()"
                        >Add</b-btn
                    >
                </div>
                <b-table
                    hover
                    caption-top
                    responsive
                    head-variant="light"
                    :items="mergeTagItem"
                    :fields="mergeTagField"
                    class="mb-10"
                >
                    <template v-slot:cell(key)="data">
                        <div class="first-cell-overflow">
                            <b-form-group>
                                <b-input
                                    id="subject"
                                    v-model="mergeTagItem[data.index].key"
                                    style="flex: 0.4"
                                    placeholder="Key"
                                />
                            </b-form-group>
                        </div>
                    </template>
                    <template v-slot:cell(value)="data">
                        <div class="first-cell-overflow">
                            <b-form-group>
                                <b-input
                                    id="subject"
                                    v-model="mergeTagItem[data.index].value"
                                    style="flex: 0.4"
                                    placeholder="Value"
                                />
                            </b-form-group>
                        </div>
                    </template>
                    <template v-slot:cell(action)="data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-end
                            "
                        >
                            <a
                                class="action-icon mr-2"
                                @click="handleRemoveTag(data.index)"
                            >
                                <span class="default">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1054"
                                            data-name="Raggruppa 1054"
                                        >
                                            <path
                                                id="Tracciato_763-2"
                                                data-name="Tracciato 763-2"
                                                d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z"
                                                style="fill: #4d505d"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill: #4d505d"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="hover">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1054"
                                            data-name="Raggruppa 1054"
                                        >
                                            <path
                                                id="Tracciato_763-2"
                                                data-name="Tracciato 763-2"
                                                d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z"
                                                style="fill: #f49848"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill: #f49848"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="active">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1054"
                                            data-name="Raggruppa 1054"
                                        >
                                            <path
                                                id="Tracciato_763-2"
                                                data-name="Tracciato 763-2"
                                                d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z"
                                                style="fill: #fff"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill: #fff"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </template>
                </b-table>
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
    </div>
</template>

<script>
import Bee from '@mailupinc/bee-plugin';
import Modal from './components/modal';
import Editor from 'vue2-ace-editor';
import Loading from '../../components/Loading';
import BuilderAPI from '../../api/BuilderAPI';
import * as client from '@mailchimp/mailchimp_marketing';

export default {
    name: 'email-page',
    components: { Modal, Editor, Loading },
    data: () => ({
        beeToken: '',
        loading: false,
        htmlFileContent: '',
        isAdd: false,
        titleButtonAddMergeTag: 'Add',
        jsonFileContent: JSON.stringify(
            require('./templates/blank-template.json')
        ),
        copied: false,
        onSaveSidebarVisibility: false,
        beeObj: {},
        mergeTagInput: {
            key: '',
            value: '',
        },
        mergeTagItem: [],
        mergeTagField: [
            {
                key: 'key',
                sortable: false,
                label: 'MERGE TAG',
            },
            {
                key: 'value',
                sortable: false,
                label: 'VALUE',
            },
            {
                key: 'action',
                label: '',
            },
        ],
        templateDetail: {
            name: '',
            subject: '',
            description: '',
        },
        selectedEmailService: null,
        emailServiceOptions: [
            {
                value: null,
                text: 'Select email service provider',
                disabled: true,
            },
            { value: 'MAILCHIMP', text: 'Mailchimp' },
            { value: 'MANDRILL', text: 'Mandrill' },
        ],
        toggleEmailService: false,
        selectedEmailServiceFolder: null,
        emailServiceFolders: [
            { value: null, text: 'Select folder', disabled: true },
        ],
        activeIntegrations: [],
    }),
    computed: {
        emailIntegration() {
            return this.activeIntegrations.find(
                (integration) =>
                    integration.externalSystem === this.selectedEmailService
            );
        },
    },
    methods: {
        editorInit: function () {
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/html');
            require('brace/mode/javascript'); //language
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript'); //snippet
        },
        showAddMergeTag() {
            this.isAdd = !this.isAdd;
        },
        getMergeTag() {
            this.mergeTagItem = [];
            let regex = /\{\{[^{}]*\}\}/gm;

            this.htmlFileContent.match(regex).map((item) => {
                this.mergeTagItem = [
                    ...this.mergeTagItem,
                    {
                        key: item.match(/{{(.*?)}}/)[1],
                        value: '',
                    },
                ];
            });
        },
        showOnSaveSidebar(value) {
            this.onSaveSidebarVisibility = value;
        },
        handleAddTag() {
            this.mergeTagItem = [
                ...this.mergeTagItem,
                {
                    key: this.mergeTagInput.key,
                    value: this.mergeTagInput.value,
                },
            ];
            this.mergeTagInput = {
                key: '',
                value: '',
            };
        },
        handleRemoveTag(index) {
            this.mergeTagItem = this.mergeTagItem.filter(
                (item, indexItem) => index !== indexItem
            );
        },
        async copyCode() {
            try {
                await navigator.clipboard.writeText(this.htmlFileContent);
                this.copied = true;
                this.$children[0].$refs.copyBtn.setAttribute('title', 'copied');
            } catch (error) {
            }
        },
        async initializeBeePlugin() {
            const beeConfig = {
                uid: 'A-S00062286', //needed for identify resources of the that user and billing stuff
                container: 'beeContainer', //Identifies the id of div element that contains BEE Plugin
                mergeTags: this.mergeTagItem,
                language: localStorage.getItem('lang')
                    ? localStorage.getItem('lang')
                    : 'en-US',
                trackChanges: true,
                onSave: (jsonFile, htmlFile) => {
                    this.showOnSaveSidebar(true);
                    this.jsonFileContent = jsonFile;
                    this.htmlFileContent = htmlFile;
                    this.getMergeTag();
                },
                onSaveAsTemplate: () => {
                    this.beeObj.save();
                },
                onSend: (htmlFile) => {
                },
                onError: (errorMessage) => {
                },
                onLoad: (json) => {
                    this.loading = false;
                },
            };

            const beePlugin = new Bee();
            beePlugin
                .getToken(
                    process.env.VUE_APP_BEE_EMAIL_BUILDER_ID,
                    process.env.VUE_APP_BEE_EMAIL_BUILDER_SECRET
                )
                .then(() => {
                    beePlugin.start(
                        beeConfig,
                        JSON.parse(this.jsonFileContent)
                    );

                    this.beeObj = beePlugin;
                })
                .catch((error) => {});

            return beePlugin;
        },
        async handleOnSaveSidebarFormSubmit(evt) {
            evt.preventDefault();

            this.loading = true;

            const { name, subject, description } = this.templateDetail;
            let json = JSON.parse(this.jsonFileContent);
            let html = this.htmlFileContent;

            json.page.title = subject;
            json.page.description = description;
            json.page.template.name = name;
            json = JSON.stringify(json);

            const thumbnailUrl = await this.generatePageThumbnail(html);

            let payload = {
                name,
                subject,
                description,
                json,
                html,
                thumbnailUrl,
                mergeTags: this.mergeTagItem,
            };

            // UPDATING
            const { templateId, purpose } = this.$route.params;
            if (purpose && purpose == 'update') {
                //update template
                this.loading = true;
                const resp = await this.$store.dispatch('updateEmailTemplate', {
                    templateId,
                    data: payload,
                });
                this.loading = false;
                this.$notify({
                    title: 'Success',
                    text: resp.message,
                    type: 'success',
                });
                this.$bvModal.show('output');
            } else {
                // SAVING
                this.$store
                    .dispatch('createEmailTemplate', payload)
                    .then(() => {
                        this.$notify({
                            title: 'Success',
                            text: 'Email template saved successfully',
                            type: 'success',
                        });

                        this.$bvModal.show('output');
                    })
                    .catch((error) => {
                        const { reason, name } = error.response.data;

                        const err =
                            reason instanceof Array
                                ? reason.map((r) => r.message).toString()
                                : reason;

                        this.$notify({
                            title: name,
                            text: err,
                            type: 'error',
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                        this.showOnSaveSidebar(false);
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
            } catch (error) {
            }
        },
        onChangeEmailServiceOption() {
            if (this.selectedEmailService !== null) {
                if (!this.emailIntegration) {
                    return alert(
                        `Please add ${this.selectedEmailService.toLowerCase()} to your integrations`
                    );
                }

                switch (this.emailIntegration.externalSystem) {
                    case 'MAILCHIMP':
                        this.listMaichimpTemplateFolders();
                        break;
                }
            }
        },
        getActiveIntegrations() {
            this.$store
                .dispatch('getIntegrations')
                .then(() => {
                    this.activeIntegrations =
                        this.$store.state.integrations.all;
                })
                .catch((err) => {
                    this.$notify({
                        title: err.response.data.name,
                        text: err.response.data.reason,
                        type: 'error',
                    });
                });
        },
        listMaichimpTemplateFolders() {
            const { apiKey } = this.emailIntegration.credentials;
            client.setConfig({
                apiKey,
                server: 'us4',
            });

            const run = async () => {
                const response = await client.templateFolders.list();
            };

            run();
        },
        onDiscardChanges() {
            this.onSaveSidebarVisibility = false;
            this.$router.push('/email');
        },
    },
    async mounted() {
        const templateId = this.$route.params.templateId;
        if (templateId) {
            const template = await this.$store.dispatch(
                'getEmailTemplate',
                templateId
            );

            const { json, html, name, subject, description } = template;

            this.jsonFileContent = json;
            this.htmlFileContent = html;
            this.templateDetail.name = name;
            this.templateDetail.subject = subject;
            this.templateDetail.description = description;
            this.initializeBeePlugin();

            this.getActiveIntegrations();
        } else {
            this.initializeBeePlugin();
        }

        if (this.$route.params.templateType) {
            this.jsonFileContent = JSON.stringify(
                this.$route.params.templateType
                    ? require(`./templates/${this.$route.params.templateType}`)
                    : require('./templates/blank-template.json')
            );
        }
    },
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
