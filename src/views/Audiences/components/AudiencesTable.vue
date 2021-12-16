<style lang="scss" scoped>
.card-header {
    background-color: #f0f0f7 !important;
    border-bottom: none !important;
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    border: 1px solid blue;
}
#viewEmployees {
    .tabs-nav-class {
        background-color: white;
    }
    .nav-item > .nav-link {
        padding: 0px !important;
    }
}

.title-item {
    background-color: yellow !important;
    .nav-link{
        padding: 0px !important;
        border: 1px solid greenyellow;
    }
}
.nav-tabs .nav-link {
    margin-bottom: -1px;
    padding-left: 0px;
    padding-right: 0px;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
div.nav-wrapper-class {
    padding-left: 10px !important;
}
</style>
<template>
    <div class="content">
        <div class="audiences">
            <div class="d-flex align-items-center py-3">
                <div class="d-flex align-items-center">
                    <h4 class="text-brand">Audiences</h4>
                </div>
            </div>

            <b-card>
                <div
                    class="d-flex align-items-center py-3"
                    style="padding-left: 40px; padding-right: 30px"
                >
                    <div class="d-flex align-items-center">
                        <span class="text-brand mr-3 flex-grow">Order by</span>
                        <div>
                            <b-form-select
                                @change="sortAudiences"
                                v-model="selectedOrderByOption"
                            >
                                <option selected value="dateCreated">
                                    Date Created
                                </option>
                                <option value="status">
                                    Status
                                    </option>
                            </b-form-select>
                        </div>
                        <b-col sm="5">
                            <div class="input-with-icon">
                                <b-form-input placeholder="Search key" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <defs>
                                            <clipPath id="a">
                                                <rect
                                                    width="16"
                                                    height="15"
                                                    fill="none"
                                                />
                                            </clipPath>
                                        </defs>
                                        <g clip-path="url(#a)">
                                            <path
                                                d="M12.7,11.23a6.777,6.777,0,0,0,1.4-4.174A7.02,7.02,0,0,0,7.1,0,7.105,7.105,0,0,0,0,7.056a7.105,7.105,0,0,0,7.1,7.056,6.667,6.667,0,0,0,4.2-1.391l3,2.981a.971.971,0,0,0,1.4,0,.957.957,0,0,0,0-1.391Zm-5.6.8A5.022,5.022,0,0,1,2,7.056a5.1,5.1,0,0,1,10.2,0A5.022,5.022,0,0,1,7.1,12.025Z"
                                            />
                                        </g>
                                    </svg>
                            </div>
                        </b-col>
                    </div>
                    <div class="d-flex align-items-center ml-auto">
                        <div class="">
                            <router-link :to="{ name: 'AudiencesList' }">
                                <img
                                    src="../../../assets/icons/add_circle_icon.svg"
                                />
                                <span
                                    class="text-brand ml-3"
                                    style="
                                        text-decoration: underline;
                                        font-size: 18px;
                                        line-height: 22px;
                                    "
                                    >Add Audience</span
                                >
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- :current-page="currentPageForAudiences" -->
                <!-- :per-page="perPageForAudiences" -->
                <b-table
                    hover
                    id="audiences"
                    :fields="fieldsForAudiences"
                    :items="itemsForAudiences"
                    caption-top
                    responsive
                    head-variant="light"
                    ref="audiencesTable"
                >
                    <template v-slot:cell(name)="data">
                        <div class="pl-2">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(audiences)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(exclude)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(include)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(createdAt)="data">
                        <div class="text-center">
                            {{ dayjs(data.value).format('DD/MM/YYYY') }}
                        </div>
                    </template>
                    <template v-slot:cell(redirects)="data">
                        <div class="text-center">
                            <b-btn
                                variant="outline-brand"
                                @click="btnEmployee(data)"
                                style="width: 70px"
                                class="employee"
                                v-if="isShowEmployee"
                            >
                                EMPLOYEE
                            </b-btn>
                        </div>
                    </template>
                    <template v-slot:cell(status)="data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-center
                            "
                        >
                            <div
                                class="status-dot mr-1"
                                v-bind:class="{
                                    Active: data.value === 'Active',
                                    deActive: data.value === 'deActive',
                                    draft: data.value === 'draft'
                                }"
                            ></div>
                            <span class="ml-1">{{ data.value }}</span>
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
                        <b-link
                                class="action-icon mr-4"
                                @click="downloadCSV(data)"
                                data-toggle="tooltip"
                                title="Download CSV"
                            >
                                <span class="default">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="36.678" 
                                        height="21" 
                                        viewBox="0 0 36.678 21"
                                    >
                                        <g 
                                            id="Raggruppa_1788" 
                                            data-name="Raggruppa 1788" 
                                            transform="translate(-1348.322 -295)"
                                        >
                                            <text id="csv" transform="translate(1374 310)" fill="#4d4f5c" font-size="15" font-family="SourceSansPro-Bold, Source Sans Pro" font-weight="700"><tspan x="-10" y="0">csv</tspan></text>
                                            <path 
                                                id="Tracciato_1298" 
                                                data-name="Tracciato 1298" 
                                                d="M30.574,33.136H21.781a.689.689,0,1,1,0-1.378h8.793a.689.689,0,1,1,0,1.378ZM29.94,24.46A.694.694,0,0,1,31,25.354v0l-4.3,5.023a.689.689,0,0,1-.973.061.637.637,0,0,1-.061-.061l-4.314-5.023a.69.69,0,1,1,1.051-.9l3.084,3.6V18.32a.689.689,0,1,1,1.378,0v9.744Z" 
                                                transform="translate(1327.23 279.369)" 
                                                fill="#4d4f5c"/>
                                        </g>
                                    </svg>
                                </span>
                                <span class="hover">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="36.678" 
                                        height="21" 
                                        viewBox="0 0 36.678 21"
                                    >
                                        <g 
                                            id="Raggruppa_1788" 
                                            data-name="Raggruppa 1788" 
                                            transform="translate(-1348.322 -295)"
                                        >
                                            <text id="csv" 
                                                transform="translate(1374 310)" 
                                                font-size="15" 
                                                style="
                                                    fill: #f49848;
                                                    fill-rule: evenodd;
                                                "
                                                font-family="SourceSansPro-Bold, Source Sans Pro" 
                                                font-weight="700">
                                                <tspan x="-10" y="0">csv</tspan>
                                            </text>
                                            <path 
                                                id="Tracciato_1298" 
                                                data-name="Tracciato 1298" 
                                                d="M30.574,33.136H21.781a.689.689,0,1,1,0-1.378h8.793a.689.689,0,1,1,0,1.378ZM29.94,24.46A.694.694,0,0,1,31,25.354v0l-4.3,5.023a.689.689,0,0,1-.973.061.637.637,0,0,1-.061-.061l-4.314-5.023a.69.69,0,1,1,1.051-.9l3.084,3.6V18.32a.689.689,0,1,1,1.378,0v9.744Z" 
                                                transform="translate(1327.23 279.369)" 
                                                style="
                                                    fill: #f49848;
                                                    fill-rule: evenodd;
                                                "/>
                                        </g>
                                    </svg>
                                </span>
                                <span class="active">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="36.678" 
                                        height="21" 
                                        viewBox="0 0 36.678 21"
                                    >
                                        <g 
                                            id="Raggruppa_1788" 
                                            data-name="Raggruppa 1788" 
                                            transform="translate(-1348.322 -295)"
                                        >
                                            <text id="csv" transform="translate(1374 310)" fill="#4d4f5c" font-size="15" font-family="SourceSansPro-Bold, Source Sans Pro" font-weight="700"><tspan x="-10" y="0">csv</tspan></text>
                                            <path 
                                                id="Tracciato_1298" 
                                                data-name="Tracciato 1298" 
                                                d="M30.574,33.136H21.781a.689.689,0,1,1,0-1.378h8.793a.689.689,0,1,1,0,1.378ZM29.94,24.46A.694.694,0,0,1,31,25.354v0l-4.3,5.023a.689.689,0,0,1-.973.061.637.637,0,0,1-.061-.061l-4.314-5.023a.69.69,0,1,1,1.051-.9l3.084,3.6V18.32a.689.689,0,1,1,1.378,0v9.744Z" 
                                                transform="translate(1327.23 279.369)" 
                                                fill="#4d4f5c"/>
                                        </g>
                                    </svg>
                                </span>
                            </b-link>
                            <b-link
                                class="action-icon mr-2"
                                @click="editRow(data)"
                                data-toggle="tooltip"
                                title="Edit Row"
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
                            </b-link>

                            <b-link
                                class="action-icon mr-2"
                                v-b-modal.modal-1
                                data-toggle="tooltip"
                                title="Delete Audience"
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
                            </b-link>
                        </div>
                    </template>
                </b-table>

                <div
                    class="d-flex align-items-center justify-content-end pr-3 pl-3 border-top"
                >
                    <div class="mr-3">
                        <span class="mr-3">Rows per page: </span>
                        <b-form-select
                            v-model="perPageForAudiences"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                            @change="handleAudiencesPageSizeChange($event)"
                        >
                        </b-form-select>
                    </div>
                    <b-pagination
                        v-model="currentPageForAudiences"
                        aria-controls="audiences"
                        align="right"
                        :total-rows="audiencesTotal"
                        :per-page="perPageForAudiences"
                        @change="handleAudiencesChange"
                    ></b-pagination>
                </div>
            </b-card>

        </div>

        <!-- <Modal modalId="configureTraits" title="Add Audience Trait">
            <template v-slot:default>
                <div class="validation_mark">
                    <img
                        class="mr-2"
                        src="../../../assets/icons/validation_mandatory.svg"
                    />
                    <span>MANDATORY</span>
                </div>
                <b-row class="m-1">
                    <label class="trait-source">Source</label>
                    <b-form-select
                        id="event-source"
                        name="event-source"
                        v-model="selected"
                        :options="transformActiveIntegrations"
                        class="mb-3"
                        aria-placeholder="select event source"
                    >
                    </b-form-select>
                </b-row>
                <b-form-group id="input-group-1" class="trait-form mx-1 mb-3" label="Name" label-for="input-2">
                    <b-form-input
                        id="input-1"
                        v-model="form.name"
                        placeholder="Propensity to buy"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" class="trait-form mx-1 mb-3" label="Default value" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="form.value"
                        placeholder="50"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-3" class="trait-form mx-1 mb-3" label="Unit measure" label-for="input-3">
                    <b-form-input
                        id="input-3"
                        v-model="form.unit"
                        placeholder="%"
                        required
                    ></b-form-input>
                </b-form-group>
            </template>
        </Modal> -->

        <!-- <TabModal modalId="viewEmployees" class="tab-modal" title="Add Audience Trait">
            <b-tabs fill
                active-tab-class="active-tab-class"
                nav-wrapper-class="nav-wrapper-class"
                active-nav-item-class="active-nav-item-class"
                class="tabs-class"
                nav-class="tabs-nav-class" 
                style
            >
                <b-tab
                    title-item-class="title-item-class"
                    class="tab-item"
                    title="Events"
                >
                    <EventTab></EventTab>
                </b-tab>
                <b-tab 
                    class="tab-item"
                    title="Traits">
                    <TraitsTab></TraitsTab>
                </b-tab>
                <b-tab 
                    class="tab-item"
                    title="Audiences">
                    <AudiencesTab></AudiencesTab>
                </b-tab>
                <b-tab 
                    class="tab-item"
                    title="Identities">
                    <IdentitiesTab></IdentitiesTab>
                </b-tab>
                <b-tab 
                    class="tab-item"
                    title="Opt In/Opt Out">
                    <OptInOutTab></OptInOutTab>
                </b-tab>
                <b-tab 
                    class="tab-item"
                    title="Memberships">
                    <MembershipsTab></MembershipsTab>
                </b-tab>
                <b-tab 
                    class="tab-item"
                    title="Rewards">
                    <RewardsTab></RewardsTab>       
                </b-tab>
            </b-tabs>
        </TabModal> -->

        <!-- <DeleteConfirmModal
            :audience="selectedAudience"
            @confirm="confirmDeleteAudience"
        /> -->

        <b-modal
            id="modal-1"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-footer
            >
                <template #modal-title>
                    <div class="d-flex justify-content-left w-100 ">
                        <div class="audience-trait-title col-sm-12">
                            <div class="title text-left">
                                This audience will be removed from the list.
                                <br/>
                                Please specify an option
                            </div>
                        </div>
                    </div>
                </template >
            <div
                class="d-block text-center p-0"
                style="width: 360px; margin: 0px"
            >
                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selectedValue"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                    >
                        <b-form-checkbox value="wipe">Wipe</b-form-checkbox>
                        <b-form-checkbox value="deactivate" selected>Deactivate</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </div>

            <template>
                <div class="d-flex justify-content-center w-100 pb-3">
                    <b-btn
                        variant="outline-brand"
                        @click="confirm"
                        size="lg"
                        class="mr-2"
                        style="width: 196px; font-size:12px;"
                        >confirm</b-btn
                    >
                    <b-btn
                        size="lg"
                        variant="brand"
                        @click="cancel"
                        style="width: 196px; font-size:12px;"
                        >Cancel and go back</b-btn
                    >
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
// import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
// import TabModal from './TabModal.vue';
// import EventTab from './EventTab.vue';
// import TraitsTab from './TraitsTab.vue';
// import AudiencesTab from './AudiencesTab.vue';
// import IdentitiesTab from './IdentitiesTab.vue';
// import OptInOutTab from './OptInOutTab.vue';
// import MembershipsTab from './MembershipsTab.vue';
// import RewardsTab from './RewardsTab.vue'
// import Modal from './modal.vue';

import dayjs from 'dayjs';

// import DeleteConfirmModal from './DeleteConfirmModal.vue';
// import { mapGetters } from 'vuex';
// import AudiencesAPI from '../../../api/AudiencesAPI';

import _ from 'lodash';

export default {
    name: 'audiences-table',
    components: {
        // DeleteConfirmModal,
        // TabModal,
        // EventTab,
        // TraitsTab,
        // AudiencesTab,
        // IdentitiesTab,
        // OptInOutTab,
        // MembershipsTab,
        // RewardsTab,
        // Modal
    },
    data: () => ({
        form: {
            name: '',
            value: '',
            unit: '',
        },
        selectedValue: [],
        selected: '',
        tableTitle: '',
        totalClicks: 0,
        hoverItemId: '',
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
        isShowEmployee: false,
        selectedOrderByOption: 'dateCreated',
        selectedAudience: null,
        isShowRecentRedirectsTable: false,
        perPageForAudiences: 5,
        currentPageForAudiences: 1,
        fieldsForAudiences: [
            {
                key: 'name',
                sortable: false,
                label: 'NAME',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'audiences',
                sortable: false,
                label: 'AUDIENCES',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'exclude',
                sortable: false,
                label: 'EXCLUDE',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'include',
                sortable: false,
                label: 'INCLUDE',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'createdAt',
                sortable: false,
                label: 'DATE CREATED',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'redirects',
                sortable: false,
                label: '',
                thStyle: {
                    textAlign: 'center'
                }
            },
            // {
            //     key: 'status',
            //     sortable: false,
            //     label: 'STATUS',
            //     thStyle: {
            //         textAlign: 'center'
            //     }
            // },
            {
                key: 'action',
                label: ''
            }
        ],
        pageSizeForRecentRedirects: 5,
        pageForRecentRedirects: 1,
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        fieldsForRecentRedirects: [
            {
                key: 'date',
                sortable: false,
                label: 'DATE',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'destinationUrl',
                sortable: false,
                label: 'DESTINATION URL',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'IPaddress',
                sortable: false,
                label: 'IP ADDRESS',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'publicIpCity',
                sortable: false,
                label: 'CITY',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'browserName',
                sortable: false,
                label: 'BROWSER',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'osName',
                sortable: false,
                label: 'OS',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'deviceModel',
                sortable: false,
                label: 'DEVICE',
                thStyle: {
                    textAlign: 'center'
                }
            }
        ],
        itemsForRecentRedirects: [],
        recentRedirectsTotal: 0,
        audiencesTotal: 0,
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: ''
    }),
    async created() {
        await this.getAudiences();
    },
    computed: {
        // ...mapGetters(['getAllAudiences']),
        itemsForAudiences: {
            get: function() {
                return [
                    {
                        "_id":"61b172d29aa3ac001d5216ca",
                        "name":"AUDIENCE1",
                        "audiences":"All",
                        "exclude":"Noorlander",
                        "include":"Netherlands",
                        "status":"Active",
                        "createdAt":"2021-12-09T03:06:58.983Z",
                    },
                ];
                // return JSON.parse(JSON.stringify(this.getAllAudiences));
            },
            set: function() {}
        },

        confirm() {
        },
        cancel() {

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
        },
        transformActiveIntegrations() {
            return this.itemsForAudiences.map(({ externalSystem }) =>
                this.capitalizeFirstLetter(externalSystem)

            );
        },
    },
    methods: {
        capitalizeFirstLetter(string) {
            return (
                // string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
                'ANALYTICS'
            );
        },
        async handleClickAudiencesTableRow(item) {
            // this.selectedAudiences = item;

            // for (var i = 0; i < this.itemsForAudiences.length; i++) {
            //     this.itemsForAudiences[i]._rowVariant = '';
            // }

            // item._rowVariant = 'active';
            // this.pageForRecentRedirects = 1;
            // await this.getRecentRedirects();

            this.isShowEmployee = true;
            this.$refs.audiencesTable.refresh();

            this.$root.$emit('bv::show::modal', 'viewEmployees')
        },
        findRouteById(id) {
            return this.itemsForAudiences.find(item => item._id === id);
        },
        editRow(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedAudience = route;
            // this.$store.commit('SET_AUDIENCE', this.selectedAudience);
            // this.$router.push({
            //     name: 'EditAudience',
            //     params: {
            //         id: this.selectedAudience._id
            //     }
            // });
        },
        removeRow(data) {
            // const route = this.findRouteById(data.item._id);
            // this.selectedAudience = route;
            
            this.$bvModal.show('delete-confirm-modal');
        },
        confirmDeleteAudience(value) {
            if (value) {
                this.itemsForAudiences = this.itemsForAudiences.filter(
                    item => item._id !== this.selectedAudience._id
                );
                // this.isShowRecentRedirectsTable = false;
            }
        },
        stringToHslColor(str, s, l) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }

            const h = hash % 360;
            return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        },
        async getAudiences() {
            // const routes = await this.$store.dispatch('getAllAudiences', {
            //     sort_by: this.selectedOrderByOption,
            //     limit: this.perPageForAudiences,
            //     offset:
            //         (this.currentPageForAudiences - 1) *
            //         this.perPageForAudiences
            // });
            // this.audiencesTotal = routes.total;
        },
        async getRecentRedirects() {
            // var redirects = await new AudiencesAPI().getRedirectsData(
            //     this.selectedAudience._id,
            //     this.pageSizeForRecentRedirects,
            //     (this.pageForRecentRedirects - 1) *
            //         this.pageSizeForRecentRedirects
            // );

            // this.recentRedirectsTotal = redirects.data.total;
            // this.itemsForRecentRedirects = redirects.data.data;
        },
        async handleAudiencesChange(value) {
            this.currentPageForAudiences = value;
            await this.getAudiences();
        },
        async handleRecentRedirectsPageChange(value) {
            this.pageForRecentRedirects = value;
            await this.getRecentRedirects();
        },
        async handleAudiencesPageSizeChange(size) {
            this.perPageForAudiences = size;
            this.currentPageForAudiences = 1;
            await this.getAudiences();
        },
        async handleRecentRedirectsPageSizeChange(size) {
            this.pageSizeForRecentRedirects = size;
            this.pageForRecentRedirects = 1;
            await this.getRecentRedirects();
        },
        dateFormat(classes, date) {
            if (!classes.disabled) {
                classes.disabled = date.getTime() < new Date();
            }
            return classes;
        },
        dayjs(...args) {
            return dayjs(...args);
        },
        async sortAudiences() {
            this.currentPageForAudiences = 1;
            await this.getAudiences();
        },
        hoverIcon(routeId) {
            this.hoverItemId = routeId;
        },
        unhoverIcon(routeId) {
            if (routeId === this.hoverItemId) {
                this.hoverItemId = '';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.disable--pointer {
    cursor: not-allowed !important;
}

.cursor {
    cursor: pointer !important;
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

.doughnut-container {
    flex-grow: 1;
    min-height: 0;

    > div {
        position: relative;
        height: 340px;
    }
}

.show {
    display: block;
}

.chart-heading {
    line-height: 13px;
    margin-top: 2px !important;
}
.dataset-heading {
    margin-left: 8px;
}
.custom-select {
    border: 1px solid #2f3380;
}

.first-cell-overflow {
    padding-left: 27px;
}

.p-font {
    font-size: 13px;
    color: #4d4f5c;
}

.status-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
}

.Active {
    background: #9fe364 0% 0% no-repeat padding-box;
}

.deActive {
    background: #c6c6c6 0% 0% no-repeat padding-box;
}
.draft {
    border: 1px solid #707070;
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

::v-deep {
    .b-dropdown {
        width: 226px;
    }

    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }

    .pagination.b-pagination {
        float: none;
    }

    .reportrange-text {
        border: 1px solid #2f3380 !important;
    }

    .daterangepicker {
        .calendars {
            flex-wrap: nowrap;
        }
    }
}

.employee {
    border: 1px solid #a3a6b4;
    color: #a3a6b4;
    font-size: 10px;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 3px;
    padding-bottom: 3px;
    width: 15%;
    border-radius: 0 !important;
}

.validation_mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    margin-left: 5px;
    margin-top: -66px;

    span {
        color: #a3a0fb;
        font-size: 12px;
        line-height: 20px;
    }
}

.trait-source {
    font-family: 'Poppins', sans-serif;
    color: #2f3380;
    font-size: 12px;
}

.trait-form {
    font-family: 'Poppins', sans-serif;
    color: #2f3380;
    font-size: 12px;
}

div.nav-wrapper-class {
    padding-left: 10px !important;
}

.audience-trait-title {
    color: #2f3380;
    font-family: 'Poppins', sans-serif;
    .title {
        box-sizing: border-box;
        font-size: 16px !important;
        line-height: 20px !important;
        padding-left: 18px;
    }
}
</style>
