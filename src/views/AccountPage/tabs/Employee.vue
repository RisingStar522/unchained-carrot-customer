<template>
    <div class="employee">
        <b-card>
            <div class="d-flex align-items-center p-3">
                <div class="d-flex align-items-center">
                    <b-input-group>
                        <b-input-group-prepend>
                            <span class="input-group-text"
                                ><fa-icon icon="search"
                            /></span>
                        </b-input-group-prepend>
                        <b-form-input
                            v-model="search"
                            class="no-shadow border-left-0 pl-0"
                        ></b-form-input>
                    </b-input-group>
                </div>
                <div
                    class="d-flex align-items-center ml-auto"
                    @click="handleShowModalAddEmployee"
                    style="cursor: pointer;"
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
                            >Add Employee</span
                        >
                    </div>
                </div>
            </div>
            <b-table
                hover
                id="email-builder"
                :fields="fieldsForEmployee"
                :items="datatable"
                :per-page="perPageForEmployee"
                :current-page="currentPageForEmployee"
                caption-top
                responsive
                head-variant="light"
                @row-clicked="handleClickLandingPageTemplateTableRow"
                ref="EmailTemplateTable"
            >
                <template v-slot:cell(firstName)="data">
                    <div class="first-cell-overflow">
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(lastName)="data">
                    <div class="text-center">
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(email)="data">
                    <div class="text-center">
                        {{ data.value }}
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
                            class="action-icon mr-2"
                            @click.prevent="showChartForRoute(data.item)"
                            data-toggle="tooltip"
                            title="Show Chart"
                        >
                            <template
                                v-if="
                                    (selectedChartId && isChart) &
                                        (data.item._id === selectedChartId)
                                "
                            >
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
                                                    style="fill: #f49848"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #f49848"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #f49848"
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
                                                    style="fill: #f49848"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #f49848"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #f49848"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </template>

                            <template v-else>
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
                                                    style="fill: #4d505d"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #4d505d"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #4d505d"
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
                                                    style="fill: #f49848"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #f49848"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #f49848"
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
                                                    style="fill: #fff"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #fff"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #fff"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </template>
                        </b-link>
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
                            @click="deleteTemplate(data.item)"
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
                        v-model="perPageForEmployee"
                        :options="rowsPerPageOptions"
                        style="width: 80px; height: 35px"
                    >
                    </b-form-select>
                </div>

                <b-pagination
                    v-model="currentPageForEmployee"
                    aria-controls="email-templates"
                    align="right"
                    :total-rows="datatable ? datatable.length : 0"
                    :per-page="perPageForEmployee"
                ></b-pagination>
            </div>
        </b-card>

        <!-- Modal -->
        <b-modal
            v-model="isAddEmployee"
            id="template-modal"
            hide-footer
            title="Add Employee"
            hide-backdrop
            body-class="pt-0"
            header-class="custom-modal-header"
        >
            <div class="validation_mark">
                <img
                    class="mr-2"
                    src="../../../assets/icons/validation_mandatory.svg"
                />
                <span>MANDATORY</span>
            </div>
            <h6 class="mb-4">Fill in all the fields</h6>
            <b-form @submit="handleSave" novalidate>
                <label for="name" class="text-brand">Save file as</label>
                <b-input-group class="border border-primary rounded" style="">
                    <b-input-group-prepend>
                        <span class="input-group-text border-0"
                            ><fa-icon icon="search"
                        /></span>
                    </b-input-group-prepend>
                    <b-input
                        v-model="employeeForm.user"
                        class="border-0 no-shadow pl-0"
                    ></b-input>
                    <b-button variant="primary" class="border-0 rounded"
                        >Add</b-button
                    >
                </b-input-group>

                <label for="email" class="text-brand mt-4"
                    >Send employee an invitation by email</label
                >
                <b-form-select
                    v-model="employeeForm.template"
                    :options="templateOptions"
                    value-field="item"
                    text-field="name"
                    disabled-field="notEnabled"
                    class="border-primary"
                ></b-form-select>

                <label for="email" class="text-brand mt-4"
                    >Add employee email</label
                >
                <b-input-group class="border border-primary rounded" style="">
                    <b-input
                        v-model="employeeForm.email"
                        class="border-0 no-shadow"
                        placeholder="Email"
                    ></b-input>
                    <b-button variant="primary" class="border-0 rounded"
                        >Add</b-button
                    >
                </b-input-group>

                <label for="email" class="text-brand mt-4"
                    >Employee email</label
                >

                <div class="border border-primary rounded">
                    <div
                        class="d-flex align-items-center justify-content-between p-2"
                        v-for="emailItem in emailList"
                        :key="emailItem.id"
                    >
                        <p style="font-size: 14px" class="mb-0">
                            {{ emailItem.email }}
                        </p>
                        <fa-icon
                            icon="trash-alt"
                            @click="handleAddEmployeeClick(emailItem.id)"
                            style="cursor: pointer;"
                        />
                    </div>
                </div>

                <b-form-group>
                    <div
                        class="d-flex align-items-center justify-content-between mt-5"
                    >
                        <b-btn
                            block
                            variant="outline-primary"
                            style="flex: 0.48"
                            @click="onDiscardChanges"
                        >
                            Cancel
                        </b-btn>
                        <b-btn type="submit" variant="brand" style="flex: 0.48"
                            >Send Invitation</b-btn
                        >
                    </div>
                </b-form-group>
            </b-form>
        </b-modal>

        <delete-confirm-modal
            id="delete-employee-confirm-modal"
            title="Delete Employee?"
            subtitle="Write DELETE to permanently delete this employee"
            @onSubmit="handleOnSubmitDelete"
        />
    </div>
</template>

<script>
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue';
export default {
    name: 'employee-tab',
    components: { DeleteConfirmModal },
    data: () => ({
        currentPageForEmployee: 1,
        employeeForm: {
            user: '',
            template: '',
            email: ''
        },
        emailList: [
            { id: 0, email: 'Mark@wikkels.nl' },
            { id: 1, email: 'Mark@wikkels.nl' },
            { id: 2, email: 'Mark@wikkels.nl' }
        ],
        templateOptions: [
            { item: 'A', name: 'Option A' },
            { item: 'B', name: 'Option B' },
            { item: 'C', name: 'Option C' }
        ],
        selectedChartId: '',
        isAddEmployee: false,
        search: '',
        perPageForEmployee: 5,
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        fieldsForEmployee: [
            {
                key: 'firstName',
                sortable: false,
                label: 'FIRST NAME',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'lastName',
                sortable: false,
                label: 'LAST NAME',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'email',
                sortable: false,
                label: 'EMAIL',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        datatable: [
            {
                id: 0,
                firstName: 'Mark',
                lastName: 'Noorlander',
                email: 'mark@gmail.com'
            },
            {
                id: 1,
                firstName: 'Mark',
                lastName: 'Noorlander',
                email: 'mark@gmail.com'
            },
            {
                id: 2,
                firstName: 'Mark',
                lastName: 'Noorlander',
                email: 'mark@gmail.com'
            },
            {
                id: 3,
                firstName: 'Mark',
                lastName: 'Noorlander',
                email: 'mark@gmail.com'
            }
        ],
        selectedData: null
    }),
    computed: {},
    methods: {
        onDiscardChanges() {
            this.isAddEmployee = false;
        },
        showChartForRoute(item) {
            console.log(item);
        },
        editTemplate(item) {
            console.log(item);
        },
        deleteTemplate(item) {
            this.selectedData = item;
            this.$bvModal.show('delete-employee-confirm-modal');
        },
        handleSave() {},
        handleClickLandingPageTemplateTableRow(item) {
            console.log(item);
        },
        handleShowModalAddEmployee() {
            this.isAddEmployee = true;
        },
        handleAddEmployeeClick() {
            console.log('trash employee click');
        },
        handleOnSubmitDelete() {
            console.log('DELETE IN HERE');
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.input-group-text {
    background-color: transparent;
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
.no-shadow {
    box-shadow: none !important;

    &:focus {
        border-color: #ced4da !important;
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
</style>
