<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>

        <div class="email-builder" v-else>
            <div
                class="center-flex full-height"
                v-if="filteredEmailTemplates.length === 0"
            >
                <div class="no-emailbroadcasts">
                    <img
                        src="@/assets/images/emailcampaign/mail-image.png"
                        alt="Mail Image"
                    />
                    <h2>You don’t have any email template yet</h2>
                    <p>Start by create your first Email Template</p>
                    <div>
                        <b-button
                            class="mx-2"
                            variant="primary"
                            :to="{ name: 'EmailBuilder/builder' }"
                        >
                            Create transactional email template
                        </b-button>
                        <b-button
                            class="mx-2"
                            variant="primary"
                            :to="{ name: 'EmailBuilder/builder' }"
                        >
                            Create email marketing templates
                        </b-button>
                    </div>
                    <div class="email-templates-contents">
                        <h3>What can you find here</h3>
                        <b-list-group>
                            <b-list-group-item
                                v-for="(item, index) in emailTemplateContents"
                                :key="index"
                            >
                                <img
                                    class="mr-2"
                                    src="../../assets/icons/right_check.svg"
                                />
                                <span>{{ item }}</span>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>

            <div v-else>
                <b-row class="py-4">
                    <b-col>
                        <div class="d-flex align-items-center">
                            <h4 class="text-brand mr-3">Email Templates</h4>
                            <b-form-radio-group
                                id="emailTemplateTypes"
                                v-model="selectedTemplateType"
                                :options="emailTemplateTypes"
                                name="radio-btn-outline"
                                button-variant="outline-brand"
                                buttons
                            ></b-form-radio-group>
                            <a href="#">
                                <img
                                    class="ml-3"
                                    src="../../assets/icons/noun_Info.svg"
                                />
                            </a>
                        </div>
                    </b-col>
                    <b-col sm="4" class="flexRow">
                        <b-form-input
                            type="search"
                            placeholder="Search"
                        ></b-form-input>
                        <fa-icon
                            class="text-secondary ml-15 iconStyle"
                            icon="list"
                            @click="handleChangeViewType('list')"
                        />
                        <fa-icon
                            class="text-secondary ml-15 iconStyle"
                            icon="th"
                            @click="handleChangeViewType('image')"
                        />
                    </b-col>
                </b-row>

                <b-card>
                    <div
                        class="d-flex align-items-center py-3"
                        style="padding-left: 40px; padding-right: 30px"
                    >
                        <div class="d-flex align-items-center">
                            <span class="text-brand mr-3">Order by</span>
                            <b-dropdown
                                :text="selectedOrderByOption"
                                block
                                variant="outline-primary"
                                menu-class="w-100"
                            >
                                <b-dropdown-item
                                    v-for="option in orderByOptions"
                                    :key="option.value"
                                    :value="option.value"
                                    @click="
                                        selectedOrderByOption = option.value
                                    "
                                    >{{ option.text }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                        <div class="d-flex align-items-center ml-auto">
                            <router-link
                                :to="{
                                    name: 'EmailBuilder/builder',
                                    params: { templateId: null }
                                }"
                            >
                                <div class="mr-5">
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            width="24"
                                            height="24"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 24 24"
                                            style="
                                                -ms-transform: rotate(360deg);
                                                -webkit-transform: rotate(
                                                    360deg
                                                );
                                                transform: rotate(360deg);
                                            "
                                        >
                                            <path
                                                d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"
                                                fill="#2f3380"
                                            />
                                            <rect
                                                x="0"
                                                y="0"
                                                width="24"
                                                height="24"
                                                fill="rgba(0, 0, 0, 0)"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        class="text-brand ml-2"
                                        style="text-decoration: underline"
                                        >New Email Template</span
                                    >
                                </div>
                            </router-link>

                            <router-link
                                :to="{ name: 'EmailBuilder/templates' }"
                            >
                                <div class="mr-5">
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            width="24"
                                            height="24"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 24 24"
                                            style="
                                                -ms-transform: rotate(360deg);
                                                -webkit-transform: rotate(
                                                    360deg
                                                );
                                                transform: rotate(360deg);
                                            "
                                        >
                                            <path
                                                d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"
                                                fill="#2f3380"
                                            />
                                            <rect
                                                x="0"
                                                y="0"
                                                width="24"
                                                height="24"
                                                fill="rgba(0, 0, 0, 0)"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        class="text-brand ml-2"
                                        style="text-decoration: underline"
                                        >Create a template from the
                                        gallery</span
                                    >
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <b-table
                        hover
                        id="email-builder"
                        :fields="fieldsForEmailTemplate"
                        :items="filteredEmailTemplates"
                        :per-page="perPageForEmailTemplate"
                        :current-page="currentPageForEmailTemplate"
                        caption-top
                        responsive
                        head-variant="light"
                        @row-clicked="handleClickEmailTemplateTableRow"
                        ref="EmailTemplateTable"
                        v-if="viewType === 'list'"
                    >
                        <template v-slot:cell(name)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(subject)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(updatedAt)="data">
                            <div class="text-center">
                                {{ data.value | formatDate }}
                            </div>
                        </template>
                        <template v-slot:cell(status)="data">
                            <div class="text-center">
                                <span
                                    class="dot"
                                    :class="{
                                        active: data.value === 'published'
                                    }"
                                ></span>
                                {{ data.value | capitalize }}
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
                                    @click="editTemplate(data.item._id)"
                                >
                                    <span class="default">
                                        <svg
                                            id="Livello_1"
                                            data-name="Livello 1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 150 150"
                                        >
                                            <g
                                                id="Raggruppa_1053"
                                                data-name="Raggruppa 1053"
                                            >
                                                <path
                                                    id="Tracciato_767-2"
                                                    data-name="Tracciato 767-2"
                                                    d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                                    style="
                                                        fill: #4d505d;
                                                        fill-rule: evenodd;
                                                    "
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
                                                id="Raggruppa_1053"
                                                data-name="Raggruppa 1053"
                                            >
                                                <path
                                                    id="Tracciato_767-2"
                                                    data-name="Tracciato 767-2"
                                                    d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                                    style="
                                                        fill: #f49848;
                                                        fill-rule: evenodd;
                                                    "
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
                                                id="Raggruppa_1053"
                                                data-name="Raggruppa 1053"
                                            >
                                                <path
                                                    id="Tracciato_767-2"
                                                    data-name="Tracciato 767-2"
                                                    d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                                    style="
                                                        fill: #fff;
                                                        fill-rule: evenodd;
                                                    "
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                </a>
                                <a
                                    class="action-icon mr-2"
                                    @click="deleteTemplate(data.item._id)"
                                    data-toggle="tooltip"
                                    title="Delete Email Template"
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
                                <b-btn
                                    :variant="
                                        data.item.status === 'published'
                                            ? 'outline-brand'
                                            : 'brand'
                                    "
                                    @click="
                                        handlePublishEmailTemplate(
                                            data.item._id
                                        )
                                    "
                                    style="width: 120px; font-size: 14px"
                                >
                                    {{
                                        data.item.status === 'published'
                                            ? 'Unpublish'
                                            : 'Publish'
                                    }}
                                </b-btn>
                            </div>
                        </template>
                    </b-table>
                    <div v-else>
                        <div class="row">
                            <div
                                v-for="template in filteredEmailTemplates"
                                :key="template._id"
                                class="col-md-4 col-lg-3 mt-4 mb-3"
                            >
                                <EmailCard
                                    :name="template.name"
                                    :image="template.thumbnailUrl"
                                    :subject="template.subject"
                                    :description="template.description"
                                    :updatedAt="template.updatedAt"
                                    :status="template.status"
                                    typeOfCard="template"
                                    :to="{
                                        name: 'EmailBuilder/builder',
                                        params: { templateId: template._id }
                                    }"
                                    :editAction="
                                        editTemplate.bind(null, template._id)
                                    "
                                    :deleteAction="
                                        deleteTemplate.bind(null, template._id)
                                    "
                                    :publishEmailTemplate="
                                        handlePublishEmailTemplate.bind(
                                            null,
                                            template._id
                                        )
                                    "
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-end
                            pr-3
                            pl-3
                            border-top
                        "
                    >
                        <div class="mr-3">
                            <span class="mr-3">Rows per page: </span>
                            <b-form-select
                                v-model="perPageForEmailTemplate"
                                :options="rowsPerPageOptions"
                                style="width: 80px; height: 35px"
                            >
                            </b-form-select>
                        </div>

                        <b-pagination
                            v-model="currentPageForEmailTemplate"
                            aria-controls="email-templates"
                            align="right"
                            :total-rows="
                                filteredEmailTemplates
                                    ? filteredEmailTemplates.length
                                    : 0
                            "
                            :per-page="perPageForEmailTemplate"
                        ></b-pagination>
                    </div>
                </b-card>
                <b-modal
                    centered
                    title-class="text-left"
                    v-model="isPublishTemplateModel"
                    id="template-modal"
                    hide-footer
                    title="Publish Template"
                    hide-backdrop
                    body-class="pt-0"
                >
                    <b-form @submit="handlePublishSubmit">
                        <p class="textStyle mb-20">
                            This template is published to:
                        </p>
                        <div class="text-center">
                            <img
                                src="@/assets/images/Unchained-logo.png"
                                alt="Uchained Logo"
                                width="50%"
                                height="50%"
                                class="mb-20"
                            />
                        </div>
                        <p class="textStyle">
                            Select another provider to publish to
                        </p>
                        <b-form-group>
                            <div class="rowSpace mailStyle">
                                <b-form-checkbox
                                    id="mailchimp"
                                    v-model="status"
                                    name="mailchimp"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                >
                                    <img
                                        src="@/assets/images/mailchimp.png"
                                        alt="Mail Chimp"
                                        width="50%"
                                        height="50%"
                                        style="margin-top: -5px"
                                    />
                                </b-form-checkbox>
                                <b-form-checkbox
                                    id="drip"
                                    v-model="status"
                                    name="drip"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                >
                                    <img
                                        src="@/assets/images/drip.png"
                                        alt="Drip"
                                        width="50%"
                                        height="50%"
                                        style="margin-top: -5px"
                                    />
                                </b-form-checkbox>
                            </div>
                        </b-form-group>
                        <b-form-group>
                            <div class="rowSpace">
                                <b-btn
                                    block
                                    variant="outline-primary"
                                    style="flex: 0.48"
                                    @click="isPublishTemplateModel = false"
                                >
                                    Cancel
                                </b-btn>
                                <b-btn
                                    type="submit"
                                    block
                                    variant="brand"
                                    style="flex: 0.48"
                                    >Publish
                                </b-btn>
                            </div>
                        </b-form-group>
                    </b-form>
                </b-modal>
                <DeleteConfirmModal
                    :emailTemplate="selectedEmailTemplate"
                    @confirm="confirmDeleteEmailTemplate"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.rowBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.searchContainer {
    input {
        background: 'transparent';
    }
}
.flexRow {
    display: flex;
    align-items: center;
}
.ml-15 {
    margin-left: 15px;
}
.iconStyle {
    font-size: 30px;
    cursor: pointer;
}
.rowSpace {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
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
.dot {
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}
.dot.active {
    background-color: green;
}
.mailStyle {
    padding: 10px;
    background-color: #f6f6fa;
}
.textStyle {
    color: #2f3380;
}
.mb-20 {
    margin-bottom: 20px;
}
::v-deep {
    .email-templates-contents {
        border: 1px solid #2f3380;
        max-width: 981px;
        margin: auto;
        padding: 20px 70px;
        margin-top: 35px;
        .list-group {
            margin-top: 30px;
            .list-group-item {
                background-color: transparent;
                border: none;
                width: 100%;
                text-align: left;
                padding: 6px 10px;

                span {
                    color: #2f3380;
                    font-size: 17px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
// import Loading from '../../components/Loading';
import EmailCard from './components/EmailCard.vue';
import DeleteConfirmModal from './components/DeleteConfirmModal.vue';

export default {
    name: 'email-builder-home',
    components: {
        // Loading,
        EmailCard,
        DeleteConfirmModal
    },
    data: () => ({
        loading: false,
        selectedEmailTemplate: null,
        currentPageForEmailTemplate: 1,
        perPageForEmailTemplate: 5,
        viewType: 'list',
        isPublishTemplateModel: false,
        orderByOptions: [
            {
                value: 'name',
                text: 'Name'
            },
            {
                value: 'updatedAt',
                text: 'Last Update'
            },
            {
                value: 'subject',
                text: 'Subject'
            }
        ],
        selectedOrderByOption: 'updatedAt',
        fieldsForEmailTemplate: [
            {
                key: 'name',
                sortable: false,
                label: 'Name',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'subject',
                sortable: false,
                label: 'Subject',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'updatedAt',
                sortable: false,
                label: 'Last Update',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'status',
                sortable: false,
                label: 'Status',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        searchTerm: '',
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        emailTemplateTypes: [
            {
                text: 'MARKETING',
                value: 'marketing'
            },
            {
                text: 'TRANSACTIONAL',
                value: 'transactional'
            }
        ],
        selectedTemplateType: 'marketing',
        emailTemplateContents: [
            'Email templates for marketing purposes (e.g.newsletters)',
            'Email templates for transactional (e.g.notifications)',
            'Options to publish/unpublish a template with a certain email provider'
        ]
    }),
    computed: {
        ...mapGetters(['emailTemplates']),

        filteredEmailTemplates() {
            const searchTerm = this.searchTerm.toLowerCase();
            function findMatch(template, searchTerm) {
                return (
                    template.name.toLowerCase().includes(searchTerm) ||
                    template.subject.toLowerCase().includes(searchTerm) ||
                    template.description.toLowerCase().includes(searchTerm)
                );
            }
            return this.emailTemplates.filter(template =>
                findMatch(template, searchTerm)
            );
        },
        numOfTemplates() {
            return this.filteredEmailTemplates.length;
        }
    },
    methods: {
        async getEmailTemplates() {
            try {
                return await this.$store.dispatch('getEmailTemplates');
            } catch (error) {
                this.loading = false;
            }
        },
        handlePublishSubmit() {},
        handlePublishEmailTemplate(id) {
            this.isPublishTemplateModel = true;
        },
        handleClickEmailTemplateTableRow(item) {
            this.$router.push({
                name: 'EmailBuilder/builder',
                params: { templateId: item._id }
            });
        },
        handleChangeViewType(type) {
            if (type === 'list') {
                this.viewType = 'list';
            } else if (type === 'image') {
                this.viewType = 'image';
            }
        },
        findEmailTemplateById(id) {
            return this.filteredEmailTemplates.find(item => item._id === id);
        },
        editTemplate(templateId) {
            this.$router.push({
                name: 'EmailBuilder/builder',
                params: { purpose: 'update', templateId }
            });
        },
        async deleteTemplate(templateId) {
            const emailTemplate = this.findEmailTemplateById(templateId);
            this.selectedEmailTemplate = emailTemplate;
            this.$bvModal.show('delete-email-template-modal');
        },
        confirmDeleteEmailTemplate(value) {
            if (value) {
                this.filteredEmailTemplates = this.filteredEmailTemplates.filter(
                    item => item._id !== this.selectedEmailTemplate._id
                );
                this.$notify({
                    title: 'Success',
                    text: 'Successfully deleted the Email Template',
                    type: 'success'
                });
            }
        }
    },
    async mounted() {
        try {
            this.isLoading = true;
            this.loading = true;
            const templatesList = await this.getEmailTemplates();

            if (templatesList) {
                this.$store.commit('SET_TEMPLATES', templatesList);
                this.loading = false;
            }
        } catch (error) {
            // this.$notify({
            //     title: 'Error',
            //     text: error.message,
            //     type: 'error'
            // });
        } finally {
            this.isLoading = false;
            this.loading = false;
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
