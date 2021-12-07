<template>
    <div class="content">
        <div
            class="center-flex full-height"
            v-if="this.pages.length === 0 && this.templates.length === 0"
        >
            <div class="no-emailbroadcasts">
                <img
                    src="@/assets/images/landing-page.svg"
                    alt="Landing page"
                    style="width: 350px"
                />
                <h2>You don't have any page yet</h2>
                <p>Start by create your first Landing page</p>
                <div>
                    <b-button
                        class="mx-2"
                        variant="primary"
                        :to="{ name: 'EmailBuilder/builder' }"
                    >
                        Create your first page
                    </b-button>
                    <b-button
                        class="mx-2"
                        variant="primary"
                        :to="{ name: 'EmailBuilder/builder' }"
                    >
                        Create your first template
                    </b-button>
                </div>
                <div class="email-templates-contents">
                    <h3>What can you find here</h3>
                    <b-list-group>
                        <b-list-group-item
                            v-for="(item, index) in landingPageTemplateContents"
                            :key="index"
                            class="text-center"
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
                        <h4 class="text-brand mr-3">Landing Pages</h4>
                        <b-form-radio-group
                            id="landingPageType"
                            v-model="selectedLandingPageType"
                            :options="landingPageType"
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

            <div
                class="no-emailbroadcasts"
                v-if="datatable[selectedLandingPageType].length === 0"
            >
                <img
                    src="@/assets/images/landing-page.svg"
                    alt="Mail Image"
                    style="width: 350px"
                />
                <h2>You don't have any {{ selectedLandingPageType }} yet</h2>
                <p>Start by create your first {{ selectedLandingPageType }}</p>
                <div>
                    <b-button
                        class="mx-2"
                        variant="primary"
                        :to="{ name: 'EmailBuilder/builder' }"
                    >
                        Create your first
                        {{
                            selectedLandingPageType === 'pages'
                                ? 'page'
                                : 'template'
                        }}
                    </b-button>
                </div>
            </div>

            <div v-else>
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
                                    name: 'PageBuilder/page',
                                    params: { pageId: null }
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
                                        >Create new page</span
                                    >
                                </div>
                            </router-link>

                            <router-link
                                :to="{
                                    name: 'PageBuilder/page',
                                    params: {
                                        templateId: null
                                    }
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
                                        >Create a page from a template</span
                                    >
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <b-table
                        hover
                        id="email-builder"
                        :fields="fieldsForLandingPageTemplate"
                        :items="datatable[selectedLandingPageType]"
                        :per-page="perPageForLandingPageTemplate"
                        :current-page="currentPageForLandingPageTemplate"
                        caption-top
                        responsive
                        head-variant="light"
                        @row-clicked="handleClickLandingPageTemplateTableRow"
                        ref="EmailTemplateTable"
                        v-if="viewType === 'list'"
                    >
                        <template v-slot:cell(title)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(name)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(updatedAt)="data">
                            <div class="text-center">
                                {{ data.value | formatDate }}
                            </div>
                        </template>
                        <template v-slot:cell(locale)="data">
                            <div class="text-center">
                                {{ data.value | capitalize }}
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
                                <a class="action-icon mr-2">
                                    <span class="default">
                                        <svg
                                            id="Livello_1"
                                            data-name="Livello 1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 150 150"
                                        >
                                            <g
                                                id="noun_growth_3025764-2"
                                                data-name="noun growth 3025764-2"
                                            >
                                                <g
                                                    id="Raggruppa_1052-2"
                                                    data-name="Raggruppa 1052-2"
                                                >
                                                    <rect
                                                        id="Rettangolo_1524-2"
                                                        data-name="Rettangolo 1524-2"
                                                        x="11.92"
                                                        y="93.52"
                                                        width="25.62"
                                                        height="46.47"
                                                        style="fill:#4d505d"
                                                    />
                                                    <rect
                                                        id="Rettangolo_1525-2"
                                                        data-name="Rettangolo 1525-2"
                                                        x="53.57"
                                                        y="68.63"
                                                        width="25.62"
                                                        height="71.36"
                                                        style="fill:#4d505d"
                                                    />
                                                    <path
                                                        id="Tracciato_867-2"
                                                        data-name="Tracciato 867-2"
                                                        d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                        style="fill:#4d505d"
                                                    />
                                                </g>
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
                                                id="noun_growth_3025764-2"
                                                data-name="noun growth 3025764-2"
                                            >
                                                <g
                                                    id="Raggruppa_1052-2"
                                                    data-name="Raggruppa 1052-2"
                                                >
                                                    <rect
                                                        id="Rettangolo_1524-2"
                                                        data-name="Rettangolo 1524-2"
                                                        x="11.92"
                                                        y="93.52"
                                                        width="25.62"
                                                        height="46.47"
                                                        style="fill:#f49848"
                                                    />
                                                    <rect
                                                        id="Rettangolo_1525-2"
                                                        data-name="Rettangolo 1525-2"
                                                        x="53.57"
                                                        y="68.63"
                                                        width="25.62"
                                                        height="71.36"
                                                        style="fill:#f49848"
                                                    />
                                                    <path
                                                        id="Tracciato_867-2"
                                                        data-name="Tracciato 867-2"
                                                        d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                        style="fill:#f49848"
                                                    />
                                                </g>
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
                                                id="noun_growth_3025764-2"
                                                data-name="noun growth 3025764-2"
                                            >
                                                <g
                                                    id="Raggruppa_1052-2"
                                                    data-name="Raggruppa 1052-2"
                                                >
                                                    <rect
                                                        id="Rettangolo_1524-2"
                                                        data-name="Rettangolo 1524-2"
                                                        x="11.92"
                                                        y="93.52"
                                                        width="25.62"
                                                        height="46.47"
                                                        style="fill:#fff"
                                                    />
                                                    <rect
                                                        id="Rettangolo_1525-2"
                                                        data-name="Rettangolo 1525-2"
                                                        x="53.57"
                                                        y="68.63"
                                                        width="25.62"
                                                        height="71.36"
                                                        style="fill:#fff"
                                                    />
                                                    <path
                                                        id="Tracciato_867-2"
                                                        data-name="Tracciato 867-2"
                                                        d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                        style="fill:#fff"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </a>
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
                        <div class="row px-5">
                            <div
                                v-for="template in pages"
                                :key="template._id"
                                class="col-md-4 col-lg-3 mt-4 mb-3"
                            >
                                <PageCard
                                    :name="template.name"
                                    :title="template.title"
                                    :image="template.thumbnailUrl"
                                    :subject="template.subject"
                                    :description="template.description"
                                    :updatedAt="template.updatedAt"
                                    :status="template.status"
                                    typeOfCard="template"
                                    :to="{
                                        name: 'PageBuilder/page',
                                        params: { pageId: template._id }
                                    }"
                                    :editAction="
                                        editTemplate.bind(null, template._id)
                                    "
                                    :deleteAction="
                                        deleteTemplate.bind(null, template._id)
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
                                v-model="perPageForLandingPageTemplate"
                                :options="rowsPerPageOptions"
                                style="width: 80px; height: 35px"
                            >
                            </b-form-select>
                        </div>

                        <b-pagination
                            v-model="currentPageForLandingPageTemplate"
                            aria-controls="email-templates"
                            align="right"
                            :total-rows="pages ? pages.length : 0"
                            :per-page="perPageForLandingPageTemplate"
                        ></b-pagination>
                    </div>
                </b-card>
                <!-- <b-modal
                centered
                title-class="text-left"
                v-model="isPublicLandingPageModal"
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
                                @click="isPublicLandingPageModal = false"
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
                :emailTemplate="selectedLandingPageTemplate"
                @confirm="confirmDeleteLandingPageTemplate"
            /> -->

                <div v-if="isChart">
                    <div
                        class="d-flex  justify-content-between align-items-center mb-3 mt-5"
                    >
                        <div class="d-flex align-items-center ">
                            <div class=" mr-5 my-auto">
                                <h2 class="text-brand mb-0">
                                    Charts
                                </h2>
                                <p class="text-md p-0 subtile-color">
                                    Thank you
                                </p>
                            </div>
                            <date-range-picker
                                ref="picker"
                                class="my-auto py-4 date-picker"
                                :opens="open"
                                :locale-data="{
                                    firstDay: 1,
                                    format: 'dd/mm/yyyy'
                                }"
                                :showDropdowns="showDropdowns"
                                v-model="dateRange"
                                :linkedCalendars="linkedCalendars"
                                :dateFormat="dateFormat"
                            >
                            </date-range-picker>
                        </div>
                    </div>

                    <b-card class="pt-4 mt-3 mb-4">
                        <div class="row p-5">
                            <div class="col-md-12">
                                <h4 class="text-brand font-weight-bold">
                                    {{ '123123' }}
                                </h4>
                                <p class="font-weight-bold mb-2">
                                    Total Clicks
                                </p>
                                <div class="bar-container">
                                    <BarChart
                                        v-if="chartData.monthDatasets"
                                        :chartData="chartData.monthDatasets"
                                        :options="options"
                                    />
                                </div>
                                <p class="text-right p-font">Data in UTC</p>
                            </div>
                        </div>
                    </b-card>

                    <b-card class="py-4 mt-3">
                        <div class="row p-5">
                            <div class="col-md-4">
                                <h4 class="text-brand font-weight-bold mb-2">
                                    Browsers
                                </h4>
                                <div class="doughnut-container">
                                    <Doughnut
                                        v-if="chartData.browserDatasets"
                                        :chartData="chartData.browserDatasets"
                                        :options="doughnutChartoptions"
                                    />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h4 class="text-brand font-weight-bold mb-2">
                                    Countries
                                </h4>
                                <div class="doughnut-container">
                                    <Doughnut
                                        v-if="chartData.countryDatasets"
                                        :chartData="chartData.countryDatasets"
                                        :options="doughnutChartoptions"
                                    />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h4 class="text-brand font-weight-bold mb-2">
                                    Cities
                                </h4>
                                <div class="doughnut-container">
                                    <Doughnut
                                        v-if="chartData.cityDatasets"
                                        :chartData="chartData.cityDatasets"
                                        :options="doughnutChartoptions"
                                    />
                                </div>
                            </div>
                        </div>
                    </b-card>
                </div>

                <div class="blackFridayContainer mt-5" v-if="isBlackFriday">
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
                                        src="@/assets/images/UnchainedCarrot_bg.png"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-md-7 d-flex flex-column justify-content-between"
                            >
                                <div>
                                    <h2 class="blackFridayContainer__title">
                                        Blackfriday Promotion
                                    </h2>
                                    <a class="blackFridayContainer__link">
                                        https://unchainedcarrot.com/blackfriday-promotion
                                    </a>
                                </div>
                                <p class="blackFridayContainer__normalText">
                                    There is a limited amount of phones, client
                                    requires further analysis.
                                </p>
                                <div class="blackFridayContainer__statusBlock">
                                    <div class="border-right mr-5 pr-5">
                                        <h5
                                            class="blackFridayContainer__statusBlock-title"
                                        >
                                            STATUS OF THE PAGE
                                        </h5>
                                        <div
                                            class="blackFridayContainer__statusBlock-normalText"
                                        >
                                            <span
                                                class="blackFridayContainer__statusBlock-dot"
                                                :class="{
                                                    active: true
                                                }"
                                            ></span>
                                            Published
                                        </div>
                                    </div>
                                    <div class="">
                                        <h5
                                            class="blackFridayContainer__statusBlock-title"
                                        >
                                            LOCALE
                                        </h5>
                                        <p
                                            class="blackFridayContainer__statusBlock-normalText"
                                        >
                                            nl-NL
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="d-flex">
                                    <b-button variant="outline-primary"
                                        >Preview</b-button
                                    >
                                    <b-button
                                        variant="primary"
                                        class="ml-3"
                                        style="width: 100px"
                                        >Edit</b-button
                                    >
                                </div>
                            </div>
                        </div>
                    </b-card>
                </div>

                <div
                    class="embedAndWidgetContainer mt-5"
                    v-if="isEmbedAndWidgetContainer"
                >
                    <b-row>
                        <b-col md="4">
                            <div class="d-flex align-items-center mb-4">
                                <h4 class="text-brand mr-3">
                                    Embedded Widgets
                                </h4>
                                <a href="#">
                                    <img
                                        src="../../assets/icons/noun_Info.svg"
                                    />
                                </a>
                            </div>
                            <b-table
                                hover
                                id="embed-widget"
                                :fields="fieldsForEmbedWidget"
                                :items="embedWidgets"
                                style="background-color: #ffffff"
                                :per-page="perPageForLandingPageTemplate"
                                :current-page="
                                    currentPageForLandingPageTemplate
                                "
                                caption-top
                                responsive
                                head-variant="light"
                            >
                                <template v-slot:cell(widget)="data">
                                    <div class="first-cell-overflow">
                                        {{ data.value }}
                                    </div>
                                </template>
                                <template v-slot:cell(name)="data">
                                    <div>
                                        {{ data.value }}
                                    </div>
                                </template>
                            </b-table>
                        </b-col>
                        <b-col md="8">
                            <div class="d-flex align-items-center mb-4">
                                <h4 class="text-brand mr-3">Events</h4>
                                <a href="#">
                                    <img
                                        src="../../assets/icons/noun_Info.svg"
                                    />
                                </a>
                            </div>
                            <b-table
                                hover
                                id="embed-widget"
                                style="background-color: #ffffff"
                                :fields="fieldsEvent1"
                                :items="event1"
                                :per-page="perPageForLandingPageTemplate"
                                :current-page="
                                    currentPageForLandingPageTemplate
                                "
                                caption-top
                                responsive
                                head-variant="light"
                            >
                                <template v-slot:cell(name)="data">
                                    <div class="first-cell-overflow">
                                        {{ data.value }}
                                    </div>
                                </template>
                                <template v-slot:cell(source)="data">
                                    <div>
                                        {{ data.value }}
                                    </div>
                                </template>
                                <template v-slot:cell(project)="data">
                                    <div>
                                        {{ data.value }}
                                    </div>
                                </template>
                                <template v-slot:cell(lastSeen)="data">
                                    <div>
                                        {{ data.value }}
                                    </div>
                                </template>
                                <template v-slot:cell(rules)="data">
                                    <div>
                                        {{ data.value }}
                                    </div>
                                </template>
                            </b-table>

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
                                        v-model="perPageForLandingPageTemplate"
                                        :options="rowsPerPageOptions"
                                        style="width: 80px; height: 35px"
                                    >
                                    </b-form-select>
                                </div>

                                <b-pagination
                                    v-model="currentPageForLandingPageTemplate"
                                    aria-controls="email-templates"
                                    align="right"
                                    :total-rows="pages ? pages.length : 0"
                                    :per-page="perPageForLandingPageTemplate"
                                ></b-pagination>
                            </div>
                        </b-col>
                    </b-row>
                </div>

                <div class="trafficRouteContainer mt-5" v-if="isTrafficRoutes">
                    <div class="d-flex align-items-center mb-4">
                        <h4 class="text-brand mr-3">Traffic Routes</h4>
                        <a href="#">
                            <img src="../../assets/icons/noun_Info.svg" />
                        </a>
                    </div>
                    <b-table
                        hover
                        id="traffic-routes"
                        :fields="fieldsTrafficRoutes"
                        :items="trafficRoutes"
                        style="background-color: #ffffff"
                        :per-page="perPageForLandingPageTemplate"
                        :current-page="currentPageForLandingPageTemplate"
                        caption-top
                        responsive
                        head-variant="light"
                    >
                        <template v-slot:cell(name)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(shortenedLink)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(utmSource)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(utmMedium)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(utmCampaign)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(status)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(fallback)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(action)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                    </b-table>
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
                                v-model="perPageForLandingPageTemplate"
                                :options="rowsPerPageOptions"
                                style="width: 80px; height: 35px"
                            >
                            </b-form-select>
                        </div>

                        <b-pagination
                            v-model="currentPageForLandingPageTemplate"
                            aria-controls="email-templates"
                            align="right"
                            :total-rows="pages ? pages.length : 0"
                            :per-page="perPageForLandingPageTemplate"
                        ></b-pagination>
                    </div>
                </div>

                <div class="trafficRouteContainer mt-5" v-if="isEvent">
                    <div class="d-flex align-items-center mb-4">
                        <h4 class="text-brand mr-3">Events</h4>
                        <a href="#">
                            <img src="../../assets/icons/noun_Info.svg" />
                        </a>
                    </div>
                    <b-table
                        hover
                        id="traffic-routes"
                        :fields="fieldsEvent"
                        :items="events"
                        style="background-color: #ffffff"
                        :per-page="perPageForLandingPageTemplate"
                        :current-page="currentPageForLandingPageTemplate"
                        caption-top
                        responsive
                        head-variant="light"
                    >
                        <template v-slot:cell(name)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>

                        <template v-slot:cell(utmSource)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(utmMedium)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(utmCampaign)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(ipAddress)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(city)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(browser)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(os)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(device)="data">
                            <div>
                                {{ data.value }}
                            </div>
                        </template>
                    </b-table>
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
                                v-model="perPageForLandingPageTemplate"
                                :options="rowsPerPageOptions"
                                style="width: 80px; height: 35px"
                            >
                            </b-form-select>
                        </div>

                        <b-pagination
                            v-model="currentPageForLandingPageTemplate"
                            aria-controls="email-templates"
                            align="right"
                            :total-rows="pages ? pages.length : 0"
                            :per-page="perPageForLandingPageTemplate"
                        ></b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.blackFridayContainer {
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
.subtile-color {
    color: #4d4f5c;
}

.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
}

.hide {
    display: none;
}
.bar-container {
    flex-grow: 1;
    min-height: 0;

    > div {
        position: relative;
        height: 180px;
    }
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
.daterangepicker {
    .calendars {
        flex-wrap: nowrap;
    }
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
import PageCard from './components/page_card.vue';
// import LineChart from './components/LineChart.js';
import BarChart from './components/BarChart';
import Doughnut from './components/DoughnutChart';
import DateRangePicker from 'vue2-daterange-picker';
import _ from 'lodash';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
    name: 'page-builder-home',
    components: {
        PageCard,
        BarChart,
        Doughnut,
        DateRangePicker
    },
    data: () => ({
        loading: false,
        isBlackFriday: true,
        datatable: {
            pages: [],
            templates: []
        },
        isChart: true,
        isTrafficRoutes: true,
        isEmbedAndWidgetContainer: true,
        isEvent: true,
        pages: [],
        templates: [],
        currentPageForLandingPageTemplate: 1,
        perPageForLandingPageTemplate: 5,
        selectedLandingPageTemplate: null,
        monthDatasets: {
            labels: ['January', 'February'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20]
                }
            ]
        },
        chartData: {
            browserDatasets: null,
            cityDatasets: null,
            countryDatasets: null,
            monthDatasets: null
        },
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        landingPageTemplateContents: [
            'A Gallery of free and responsive templates',
            'The option to create Events for your Landing Pages',
            'A Dashboard showing how your Landing Pages perform'
        ],
        landingPageType: [
            {
                text: 'PAGES',
                value: 'pages'
            },
            {
                text: 'TEMPLATES',
                value: 'templates'
            }
        ],
        selectedLandingPageType: 'pages',
        viewType: 'list',
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
        fieldsForLandingPageTemplate: [
            {
                key: 'title',
                sortable: false,
                label: 'Name',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'name',
                sortable: false,
                label: 'File Name',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'updatedAt',
                sortable: false,
                label: 'LAST UPDATE',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'locale',
                sortable: false,
                label: 'LOCALE',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        fieldsForEmbedWidget: [
            { key: 'widget', sortable: false, label: 'WIDGET' },
            { key: 'name', sortable: false, label: 'NAME' }
        ],
        fieldsEvent1: [
            { key: 'name', sortable: false, label: 'NAME' },
            { key: 'source', sortable: false, label: 'SOURCE' },
            { key: 'project', sortable: false, label: 'PROJECT' },
            { key: 'lastSeen', sortable: false, label: 'LAST SEEN' },
            { key: 'rules', sortable: false, label: 'RULES' }
        ],
        fieldsTrafficRoutes: [
            { key: 'name', sortable: false, label: 'NAME' },
            { key: 'shortenedLink', sortable: false, label: 'SHORTENED LINK' },
            { key: 'utmSource', sortable: false, label: 'URM SOURCE' },
            { key: 'utmMedium', sortable: false, label: 'UTM MEDIUM' },
            { key: 'utmCampaign', sortable: false, label: 'UTM CAMPAIGN' },
            { key: 'status', sortable: false, label: 'STATUS' },
            { key: 'fallBack', sortable: false, label: 'FALLBACK' },
            { key: 'action', label: '' }
        ],
        fieldsEvent: [
            { key: 'date', sortable: false, label: 'DATE' },
            { key: 'utmSource', sortable: false, label: 'URM SOURCE' },
            { key: 'utmMedium', sortable: false, label: 'UTM MEDIUM' },
            { key: 'utmCampaign', sortable: false, label: 'UTM CAMPAIGN' },
            { key: 'ipAddress', sortable: false, label: 'IP ADDRESS' },
            { key: 'city', sortable: false, label: 'CITY' },
            { key: 'browser', sortable: false, label: 'BROWSER' },
            { key: 'os', sortable: false, label: 'OS' },
            { key: 'device', sortable: false, label: 'DEVICE' }
        ],
        events: [],
        embedWidgets: [
            { id: 0, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 1, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 2, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 3, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 4, widget: 'Reviewbyme', name: 'Reviewbyme' }
        ],
        trafficRoutes: [],
        event1: [
            {
                id: 0,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 1,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 2,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 3,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 4,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            }
        ],
        isPublicLandingPageModal: false,
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: '',
        options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItems) {
                        return tooltipItems.yLabel.toString() + ' clicks';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        barPercentage: 0.4,
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }
                ],
                yAxes: [
                    {
                        position: 'right',
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        },
        doughnutChartoptions: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    afterLabel: function(tooltipItems) {
                        return tooltipItems.yLabel.toString() + ' clicks';
                    }
                }
            },
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 10
                }
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        }
    }),
    computed: {
        numOfPages() {
            return this.pages.length;
        },
        numOfTemplates() {
            return this.templates.length;
        },
        dateRange() {
            const date = new Date();
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
            );
            return { startDate, endDate };
        }
    },
    methods: {
        async getLandingPages() {
            try {
                const { result } = await this.$store.dispatch(
                    'getLandingPages'
                );
                return result;
            } catch (error) {
            }
        },
        dateFormat(classes, date) {
            if (!classes.disabled) {
                classes.disabled = date.getTime() < new Date();
            }
            return classes;
        },
        async getLandingPageTemplates() {
            try {
                const { result } = await this.$store.dispatch(
                    'getLandingPageTemplates'
                );

                return result;
            } catch (error) {
            }
        },
        handleClickLandingPageTemplateTableRow(item) {
            this.$router.push({
                name: 'PageBuilder/page',
                params: { pageId: item._id }
            });
        },
        handleChangeViewType(type) {
            if (type === 'list') {
                this.viewType = 'list';
            } else if (type === 'image') {
                this.viewType = 'image';
            }
        },
        editTemplate(templateId) {
            this.$router.push({
                name: 'EmailBuilder/builder',
                params: { purpose: 'update', templateId }
            });
        },
        async deleteTemplate(templateId) {
            const emailTemplate = this.findEmailTemplateById(templateId);
            this.selectedLandingPageTemplate = emailTemplate;
            this.$bvModal.show('delete-email-template-modal');
        },
        confirmDeleteLandingPageTemplate(value) {
            if (value) {
                this.pages = this.pages.filter(
                    item => item._id !== this.selectedLandingPageTemplate._id
                );
                this.$notify({
                    title: 'Success',
                    text: 'Successfully deleted the Email Template',
                    type: 'success'
                });
            }
        },
        handlePublishEmailTemplate(id) {
            this.isPublicLandingPageModal = true;
        },
        async getChartData(routeId = 0) {
            try {
                // const { data } = await new TrafficRoutesAPI().getChartData(
                //     routeId
                // );
                const data = {
                    week: [
                        {
                            year: 2021,
                            weekNumber: 43,
                            redirects: 1
                        },
                        {
                            year: 2022,
                            weekNumber: 43,
                            redirects: 1
                        }
                    ],
                    day: [
                        {
                            year: 2021,
                            month: 10,
                            day: 19,
                            redirects: 1
                        },
                        {
                            year: 2021,
                            month: 11,
                            day: 18,
                            redirects: 1
                        }
                    ],
                    hour: [
                        {
                            year: 2021,
                            month: 10,
                            day: 19,
                            hour: 8,
                            redirects: 1
                        },
                        {
                            year: 2021,
                            month: 11,
                            day: 19,
                            hour: 8,
                            redirects: 1
                        }
                    ],
                    country: [
                        {
                            publicIpCountry: 'Viet Nam',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'Italy',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'France',
                            redirects: 1
                        }
                    ],
                    city: [
                        {
                            publicIpCountry: 'Italy',
                            publicIpCity: 'Longhignana',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'Viet Nam',
                            publicIpCity: 'Ho Chi Minh',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'Viet Nam',
                            publicIpCity: 'Ha Noi',
                            redirects: 1
                        }
                    ],
                    browser: [
                        {
                            browserName: 'Chrome',
                            redirects: 1
                        },
                        {
                            browserName: 'Safari',
                            redirects: 5
                        },
                        {
                            browserName: 'Firefox',
                            redirects: 5
                        }
                    ]
                };
                const browserLabels = data['browser'].map(b => b.browserName);
                const browserRedirects = data['browser'].map(b => b.redirects);

                const cityLabels = data['city'].map(c => c.publicIpCity);
                const cityRedirects = data['city'].map(c => c.redirects);

                const countryLabels = data['country'].map(
                    c => c.publicIpCountry
                );
                const countryRedirects = data['country'].map(c => c.redirects);
                const monthNames = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];
                const monthLabels = data['day'].map(c => {
                    const today = new Date(c.year, c.month, c.day);
                    return (
                        monthNames[today.getMonth() - 1] + ' ' + today.getDate()
                    );
                });

                const monthRedirects = data['day'].map(c => c.redirects);

                const browserColor = [
                    '#191C5C',
                    '#2F3380',
                    '#6E71A7',
                    '#ACADCC',
                    '#A3AQFB',
                    '#C3C1FC',
                    '#E9EE9F0'
                ];
                const countriesColor = [
                    '#FF6565',
                    '#FF8373',
                    '#FFE6E3',
                    '#FFC188',
                    '#FFDA83',
                    '#FFEDC5',
                    '#E9E9F0'
                ];

                const citiesColor = [
                    '#EE487D',
                    '#F05788',
                    '#FBD1DE',
                    '#FCE2EB',
                    '#F9AD6B',
                    '#FCD2AE',
                    '#E9E9F0'
                ];

                const browserDatasets = {
                    labels: browserLabels,
                    datasets: [
                        {
                            label: 'Browsers x Redirects',
                            data: browserRedirects,
                            backgroundColor: browserColor,
                            borderColor: browserColor,
                            borderWidth: 1
                        }
                    ]
                };

                const cityDatasets = {
                    labels: cityLabels,
                    datasets: [
                        {
                            label: 'Cities x Redirects',
                            data: cityRedirects,
                            backgroundColor: citiesColor,
                            borderColor: citiesColor,
                            borderWidth: 1
                        }
                    ]
                };

                const countryDatasets = {
                    labels: countryLabels,
                    datasets: [
                        {
                            label: 'Countries x Redirects',
                            data: countryRedirects,
                            backgroundColor: countriesColor,
                            borderColor: countriesColor,
                            borderWidth: 1
                        }
                    ]
                };

                const monthDatasets = {
                    labels: _.uniq(monthLabels),
                    datasets: [
                        {
                            label: 'Month x Redirects',
                            data: monthRedirects,
                            backgroundColor: '#39CB89',
                            borderColor: '#39CB89',
                            borderWidth: 1
                        }
                    ]
                };

                this.chartData.browserDatasets = browserDatasets;
                this.chartData.cityDatasets = cityDatasets;
                this.chartData.countryDatasets = countryDatasets;
                this.chartData.monthDatasets = monthDatasets;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    async mounted() {
        this.loading = true;

        try {
            const pages = await this.getLandingPages();
            if (pages instanceof Array) {
                this.pages = pages;
            } else {
                throw new Error(
                    `Expects ${pages} to be instance of Array but got ${typeof pages} instead`
                );
            }
        } catch (error) {
        } finally {
            this.loading = false;
        }

        try {
            const templates = await this.getLandingPageTemplates();

            if (templates instanceof Array) {
                this.templates = templates;
            } else {
                throw new Error(
                    `Expects ${templates} to be instance of Array but got ${typeof templates} instead`
                );
            }
        } catch (error) {
        } finally {
            this.loading = false;
        }
        this.datatable = {
            pages: this.pages,
            templates: this.templates
        };
        await this.getChartData();
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
