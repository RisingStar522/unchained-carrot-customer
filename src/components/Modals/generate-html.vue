<template>
    <div>
        <b-modal
            @hidden="hidden"
            ref="modal"
            size="xl"
            id="generateHTML-modal"
            title="Generate HTML for your emails or website"
        >
            <div class="d-flex">
                <div class="html-form col-md-5">
                    <b-form>
                        <b-form-group
                            label="Generate code for"
                            label-for="generateCodeFor"
                            label-cols-sm="6"
                        >
                            <b-form-select
                                v-model="html.generateCodeFor"
                                :options="generateCodeForOptions"
                                name="generateCodeFor"
                            ></b-form-select>
                        </b-form-group>
                        <b-form-group
                            label="Icon Set"
                            label-for="icon-set"
                            label-cols-sm="6"
                        >
                            <Iconset
                                @iconSelected="selectIcon"
                                id="icon-set"
                                :icons="icons"
                                :setIcon="setIcon"
                            />
                        </b-form-group>

                        <div class="d-flex">
                            <label class="mr-5">Include UTM tags</label>
                            <b-form-radio-group
                                class="ml-5"
                                label="Include UTM tags"
                                id="include-utm-tags"
                                v-model="html.includeUTMtags"
                                :options="includeUTMtagsOptions"
                                name="include-utm-tags"
                            ></b-form-radio-group>
                        </div>

                        <div
                            v-if="html.includeUTMtags === 'Yes'"
                            class="utm-tags"
                        >
                            <b-form-group
                                label="UTM source"
                                label-for="utm-source"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    v-model="html.utmSource"
                                    id="utm-source"
                                    name="utm-source"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label="UTM medium"
                                label-for="utm-medium"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    v-model="html.utmMedium"
                                    id="utm-medium"
                                    name="utm-medium"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label="UTM name"
                                label-for="utm-name"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    v-model="html.utmName"
                                    id="utm-name"
                                    name="utm-name"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label="UTM term"
                                label-for="utm-term"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    disabled
                                    v-model="html.utmTerm"
                                    id="utm-term"
                                    name="utm-term"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label="UTM content"
                                label-for="utm-content"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    v-model="html.utmContent"
                                    id="utm-content"
                                    name="utm-content"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label="Padding"
                                label-for="padding"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    id="paddingRange"
                                    v-model="html.padding"
                                    type="range"
                                    min="0"
                                    max="100"
                                ></b-form-input>
                                <div class="mt-2">
                                    {{ `${html.padding}px` }}
                                </div>
                            </b-form-group>

                            <b-form-group
                                label="Font size"
                                label-for="font-size"
                                label-cols-sm="6"
                            >
                                <b-form-input
                                    id="fontSizeRange"
                                    v-model="html.fontSize"
                                    type="range"
                                    min="10"
                                    max="100"
                                ></b-form-input>
                                <div class="mt-2">
                                    {{ `${html.fontSize}px` }}
                                </div>
                            </b-form-group>

                            <b-form-group
                                label="Orientation"
                                label-for="orientation"
                                label-cols-sm="6"
                            >
                                <b-form-select
                                    v-model="html.orientation"
                                    :options="orientationOptions"
                                    name="generateCodeFor"
                                ></b-form-select>
                            </b-form-group>

                            <b-form-group
                                v-if="html.orientation == 'Vertical'"
                                label="Columns"
                                label-for="columns"
                                label-cols-sm="6"
                            >
                                <b-form-select
                                    v-model="html.columns"
                                    :options="columnOptions"
                                    name="generateCodeFor"
                                ></b-form-select>
                            </b-form-group>

                            <b-form-group
                                v-if="html.orientation == 'Horizontal'"
                                label="Rows"
                                label-for="rows"
                                label-cols-sm="6"
                            >
                                <b-form-select
                                    v-model="html.rows"
                                    :options="rowOptions"
                                    name="generateCodeFor"
                                ></b-form-select>
                            </b-form-group>
                        </div>
                    </b-form>
                    <div>
                        <b-button
                            ref="copyBtn"
                            @click="copyCode"
                            size="lg"
                            class="btn-brand"
                            >Copy</b-button
                        >
                        <span class="ml-3" v-if="copied"
                            >Copied to clipboard</span
                        >
                    </div>
                </div>
                <div class="html-preview-and-editor col-md-7">
                    <div class="d-flex">
                        <b-button
                            @click="generateHtml"
                            size="sm"
                            class="ml-auto btn-brand my-1"
                            >Refresh</b-button
                        >
                    </div>
                    <div v-html="html.content" class="html-preview"></div>

                    <div class="html-editor">
                        <editor
                            v-model="html.content"
                            @init="editorInit"
                            lang="html"
                            theme="chrome"
                            width="100%"
                            height="200"
                            id="editor"
                        ></editor>
                    </div>
                </div>
            </div>

            <template #modal-footer><div></div></template>
        </b-modal>
    </div>
</template>

<script>
import Iconset from '@/views/Review/components/Iconset';
import Editor from 'vue2-ace-editor';
import beautify from 'js-beautify';
export default {
    name: 'generate-HTML-modal',
    components: {
        Iconset,
        Editor
    },
    props: ['icons', 'setIcon', 'optionsArray', 'reviewId'],
    data() {
        return {
            columnOptions: [1, 2],
            rowOptions: [1, 2],
            orientation: 'Vertical',
            orientationOptions: ['Vertical', 'Horizontal'],
            copied: false,
            hasSetIconChanged: false,
            html: {
                generateCodeFor: 'Mailchimp',
                selectedIcon: null,
                includeUTMtags: 'Yes',
                utmSource: 'Mailchimp',
                utmMedium: 'Email',
                utmName: '',
                utmTerm: 'Reserved for option labels',
                utmContent: '',
                content: '',
                padding: 0,
                fontSize: 10,
                columns: 1,
                rows: 1,
                orientation: 'Vertical'
            },
            generateCodeForOptions: ['Mailchimp', 'Mandrill', 'Wordpress'],
            includeUTMtagsOptions: ['Yes', 'No']
        };
    },
    computed: {
        selectedIcon() {
            return this.html.selectedIcon == null
                ? this.setIcon
                : this.html.selectedIcon;
        }
    },
    watch: {
        ['html.selectedIcon']() {
            this.hasSetIconChanged = true;
        },
        ['html.generateCodeFor'](newVal) {
            this.setUTMSourceAndMedium(newVal);
        }
    },
    methods: {
        async copyCode() {
            try {
                await navigator.clipboard.writeText(this.html.content);
                this.copied = true;
                this.$refs.copyBtn.setAttribute('title', 'copied');
            } catch (error) {
            }
        },
        generateHtml() {
            let mappedColumns = this.optionsArray.map((option, index) => {
                if (this.html.orientation == 'Vertical') {
                    if (this.html.columns == 1) {
                        let link = `https://reviewby.me/submit?reviewId=${
                            this.reviewId
                        }&reviewResult=${index}&eid=*|MD5|*&uid=*|UCCUID|*&utm_source=${
                            this.html.utmSource
                        }&utm_medium=${this.html.utmMedium}&utm_name=${
                            this.html.utmName
                        }&utm_term=${encodeURIComponent(option)}&utm_content=${
                            this.html.utmContent
                        }`;
                        return `<td>
                <a href='${link}'>
                <div class="${
                    this.html.orientation === 'Vertical'
                        ? 'd-flex align-items-center'
                        : ''
                }">
                <div><img style="padding: ${
                    this.html.padding
                }px;" title='${option}' alt='${option}' src='${
                            this.selectedIcon.images[index].url
                        }' /></div>

                </div>
                </a>
                </td>`;
                    } else if (this.html.columns == 2) {
                        let link = `https://reviewby.me/submit?reviewId=${
                            this.reviewId
                        }&reviewResult=${index}&eid=*|MD5|*&uid=*|UCCUID|*&utm_source=${
                            this.html.utmSource
                        }&utm_medium=${this.html.utmMedium}&utm_name=${
                            this.html.utmName
                        }&utm_term=${encodeURIComponent(option)}&utm_content=${
                            this.html.utmContent
                        }`;
                        return `<td>
                <a href='${link}'>
                <div class="${
                    this.html.orientation === 'Vertical'
                        ? 'd-flex align-items-center'
                        : ''
                }">
                <div><img style="padding: ${
                    this.html.padding
                }px;"  alt='${option}' src='${
                            this.selectedIcon.images[index].url
                        }' /></div>

                </div>
                </a>
                </td>
                <td style='font-size: ${this.html.fontSize}px'>${option}</td>`;
                    }
                } else {
                    if (this.html.rows == 1) {
                        let link = `https://reviewby.me/submit?reviewId=${
                            this.reviewId
                        }&reviewResult=${index}&eid=*|MD5|*&uid=*|UCCUID|*&utm_source=${
                            this.html.utmSource
                        }&utm_medium=${this.html.utmMedium}&utm_name=${
                            this.html.utmName
                        }&utm_term=${encodeURIComponent(option)}&utm_content=${
                            this.html.utmContent
                        }`;
                        return `<td>
                <a href='${link}'>
                <div class="${
                    this.html.orientation === 'Horizontal'
                        ? 'd-flex align-items-center'
                        : ''
                }">
                <div><img style="padding: ${
                    this.html.padding
                }px;" title='${option}' alt='${option}' src='${
                            this.selectedIcon.images[index].url
                        }' /></div>

                </div>
                </a>
                </td>`;
                    } else if (this.html.rows == 2) {
                        let link = `https://reviewby.me/submit?reviewId=${
                            this.reviewId
                        }&reviewResult=${index}&eid=*|MD5|*&uid=*|UCCUID|*&utm_source=${
                            this.html.utmSource
                        }&utm_medium=${this.html.utmMedium}&utm_name=${
                            this.html.utmName
                        }&utm_term=${encodeURIComponent(option)}&utm_content=${
                            this.html.utmContent
                        }`;

                        return {
                            imgRow: `<td>
                        <a href='${link}'>
                            <div>
                                <div><img style="padding: ${this.html.padding}px;" alt='${option}' src='${this.selectedIcon.images[index].url}' /></div>

                            </div>
                        </a>
                    </td>`,
                            titleRow: `<td style='font-size: ${this.html.fontSize}px'>${option}</td>`
                        };
                    }
                }
            });

            if (this.html.orientation === 'Horizontal') {
                if (this.html.rows == 1) {
                    this.html.content = beautify.html(
                        '<table>' +
                            '<tr>' +
                            mappedColumns.join(' ') +
                            '<tr>' +
                            '</table>'
                    );
                } else if (this.html.rows == 2) {
                    const imgRows = mappedColumns.map(cmObj => cmObj.imgRow);
                    const titleRows = mappedColumns.map(
                        cmObj => cmObj.titleRow
                    );
                    this.html.content = beautify.html(
                        '<table>' +
                            '<tr>' +
                            imgRows.join(' ') +
                            '</tr>' +
                            '<tr class="text-center">' +
                            titleRows.join(' ') +
                            '<tr>' +
                            '</table>'
                    );
                }
            } else {
                this.html.content = beautify.html(
                    '<table>' +
                        mappedColumns
                            .map(mc => {
                                return `<tr>${mc}</tr>`;
                            })
                            .join(' ') +
                        '</table>'
                );
            }

            // Remove 'copied to clipboard' text beside the copy button
            this.copied = false;
        },
        hidden() {
            if (this.hasSetIconChanged) {
                this.$emit('onIconSetChanged', this.selectedIcon);
            }
        },
        setUTMSourceAndMedium(generateCodeForOption) {
            if (
                generateCodeForOption === 'Mailchimp' ||
                generateCodeForOption === 'Mandrill'
            ) {
                if (generateCodeForOption === 'Mailchimp') {
                    this.html.utmSource = 'Mailchimp';
                } else {
                    this.html.utmSource = 'Mandrill';
                }

                this.html.utmMedium = 'Email';
            }
        },
        editorInit: function() {
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/html');
            require('brace/mode/javascript'); //language
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript'); //snippet
        },
        selectIcon(iconset) {
            this.html.selectedIcon = this.icons.filter(
                ic => ic.iconsetId == iconset.iconsetId
            )[0];
        }
    }
};
</script>

<style scoped>
.html-preview,
.html-editor {
    border: 1px solid rgb(236, 234, 234);
    margin-top: 5px;
}
.html-editor #editor {
    height: 100%;
}
.html-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
}
</style>
