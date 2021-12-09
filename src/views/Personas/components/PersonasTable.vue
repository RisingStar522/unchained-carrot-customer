<template>
    <div class="content">
        <div class="traffic-routes">
            <div class="py-4">
                <h4 class="text-brand">Personas</h4>
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
                                @change="sortTrafficRoute"
                                v-model="selectedOrderByOption"
                            >
                                <option selected value="dateCreated">
                                    Date Created
                                </option>
                                <option value="status">Status</option>
                                <option value="utmCampaign">
                                    UTM Campaign
                                </option>
                            </b-form-select>
                        </div>
                    </div>
                    <div class="d-flex align-items-center ml-auto">
                        <div class="">
                            <b-link class="mr-4" @click="refreshTrafficRoutes">
                                <img
                                    src="../../../assets/icons/refresh_icon.svg"
                                />
                            </b-link>

                            <router-link :to="{ name: 'AddNewTrafficRoute' }">
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
                                    >Add Route</span
                                >
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- :current-page="currentPageForTrafficRoutes" -->
                <!-- :per-page="perPageForTrafficRoutes" -->
                <b-table
                    hover
                    id="traffic-routes"
                    :fields="fieldsForTrafficRoutes"
                    :items="itemsForTrafficRoutes"
                    @row-clicked="handleClickTrafficRoutesTableRow"
                    caption-top
                    responsive
                    head-variant="light"
                    ref="traffictable"
                >
                    <template v-slot:cell(title)="data">
                        <div class="pl-2">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(shortenedLink)="data">
                        <div
                            class="
                                d-flex"
                        >
                            <span class="mr-4">{{
                                'https://' + data.value
                            }}</span>
                            <button
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Copy to cliboard"
                                @click="doCopy('https://' + data.value)"
                                class="btn btn-lg p-0 flex-shrink-0"
                                @mouseover="hoverIcon(data.item._id)"
                                @mouseleave="unhoverIcon(data.item._id)"
                                size="lg"
                            >
                                <img
                                    v-if="data.item._id !== hoverItemId"
                                    src="../../../assets/icons/copy.svg"
                                />
                                <img
                                    v-if="data.item._id === hoverItemId"
                                    src="../../../assets/icons/copy-hover.svg"
                                />
                            </button>
                        </div>
                    </template>
                    <template v-slot:cell(utmCampaign)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(createdAt)="data">
                        <div class="text-center">
                            {{ dayjs(data.value).format('DD/MM/YYYY') }}
                        </div>
                    </template>
                    <template v-slot:cell(redirects)="data">
                        <div class="text-center">
                            {{ data.value }}
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
                                    published: data.value === 'published',
                                    unpublished: data.value === 'unpublished',
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
                                class="action-icon mr-2"
                                @click.prevent="showChartForRoute(data.item)"
                                data-toggle="tooltip"
                                title="Show Chart"
                            >
                                <template
                                    v-if="
                                        (selectedChartId && isShowCharts) &
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
                                @click="removeRow(data)"
                                data-toggle="tooltip"
                                title="Delete Route"
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

                            <b-btn
                                variant="outline-brand"
                                @click="publishOrUnpublishRoute(data)"
                                style="width: 120px"
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

                <div
                    class="d-flex align-items-center justify-content-end pr-3 pl-3 border-top"
                >
                    <div class="mr-3">
                        <span class="mr-3">Rows per page: </span>
                        <b-form-select
                            v-model="perPageForTrafficRoutes"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                            @change="handleTrafficRoutesPageSizeChange($event)"
                        >
                        </b-form-select>
                    </div>
                    <b-pagination
                        v-model="currentPageForTrafficRoutes"
                        aria-controls="traffic-routes"
                        align="right"
                        :total-rows="trafficRoutesTotal"
                        :per-page="perPageForTrafficRoutes"
                        @change="handleTrafficRoutesChange"
                    ></b-pagination>
                </div>
            </b-card>
        </div>

        <div
            class="d-flex  justify-content-between align-items-center mb-3 mt-5"
            v-if="isShowCharts"
        >
            <div class="d-flex align-items-center ">
                <div class=" mr-5 my-auto">
                    <h2 class="text-brand mb-0">
                        Charts
                    </h2>
                    <h4 class="text-md p-0 subtile-color">{{ tableTitle }}</h4>
                </div>
                <date-range-picker
                    ref="picker"
                    disabled
                    class="my-auto py-4"
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

            <div>
                <b-button
                    type="button"
                    variant="brand"
                    size="lg"
                    @click="closeCharts"
                    >Close</b-button
                >
            </div>
        </div>

        <b-card class="pt-4 mt-3 mb-4" v-if="isShowCharts">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h4 class="text-brand font-weight-bold">
                            {{ totalClicks }}
                        </h4>
                        <p class="font-weight-bold mb-2">
                            Total Clicks
                        </p>
                        <!-- <div class="bar-container">
                            <BarChart
                                v-if="chartData.monthDatasets"
                                :data="chartData.monthDatasets"
                                :options="options"
                            />
                        </div> -->
                        <p class="text-right p-font">Data in UTC</p>
                    </div>
                </div>
            </div>
        </b-card>

        <b-card class="py-4 mt-3" v-if="isShowCharts">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h4 class="text-brand font-weight-bold mb-2">
                            Browsers
                        </h4>
                    </div>
                    <div class="col-md-4">
                        <h4 class="text-brand font-weight-bold mb-2">
                            Countries
                        </h4>
                    </div>
                    <div class="col-md-4">
                        <h4 class="text-brand font-weight-bold mb-2">
                            Cities
                        </h4>
                    </div>
                </div>
            </div>
        </b-card>

        <div
            class="recent-redirects"
            v-bind:class="{
                hide: isShowRecentRedirectsTable === false,
                show: isShowRecentRedirectsTable === true
            }"
        >
            <div class="d-flex mb-3 mt-5">
                <h4 class="text-brand mr-5 mt-1">Recent Redirects</h4>
            </div>

            <b-card>
                <b-table
                    hover
                    id="recent-redirects"
                    :fields="fieldsForRecentRedirects"
                    :items="itemsForRecentRedirects"
                    caption-top
                    responsive
                    head-variant="light"
                >
                    <template v-slot:cell(date)="data">
                        <div class="text-center">
                            {{
                                `${data.item.day}/${data.item.month}/${data.item.year} ${data.item.hour}:00`
                            }}
                        </div>
                    </template>
                    <template v-slot:cell(destinationUrl)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(IPaddress)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(publicIpCity)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(browserName)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(osName)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(deviceModel)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                </b-table>

                <div
                    class="d-flex align-items-center justify-content-end pr-3 pl-3 border-top mt-4"
                >
                    <div class="mr-3">
                        <span class="mr-3">Rows per page: </span>

                        <b-form-select
                            v-model="pageSizeForRecentRedirects"
                            @change="
                                handleRecentRedirectsPageSizeChange($event)
                            "
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                        >
                        </b-form-select>
                    </div>

                    <b-pagination
                        v-model="pageForRecentRedirects"
                        @change="handleRecentRedirectsPageChange"
                        align="right"
                        :total-rows="recentRedirectsTotal"
                        :per-page="pageSizeForRecentRedirects"
                    >
                    </b-pagination>
                </div>
            </b-card>
        </div>

        <DeleteConfirmModal
            :trafficRoute="selectedTrafficRoute"
            @confirm="confirmDeleteTrafficRoute"
        />
    </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

import dayjs from 'dayjs';

import DeleteConfirmModal from './DeleteConfirmModal.vue';
import { mapGetters } from 'vuex';
import TrafficRoutesAPI from '../../../api/TrafficRoutesAPI';

import _ from 'lodash';
import { submitTrackingEvent } from '../../../services/TrackingService';

export default {
    name: 'traffic-routes-table',
    components: {
        DeleteConfirmModal
    },
    data: () => ({
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
        isShowCharts: false,
        // chartData: {
        //     browserDatasets: null,
        //     cityDatasets: null,
        //     countryDatasets: null,
        //     monthDatasets: null
        // },
        selectedOrderByOption: 'dateCreated',
        selectedTrafficRoute: null,
        isShowRecentRedirectsTable: false,
        perPageForTrafficRoutes: 5,
        currentPageForTrafficRoutes: 1,
        fieldsForTrafficRoutes: [
            {
                key: 'title',
                sortable: false,
                label: 'TITLE',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'shortenedLink',
                sortable: false,
                label: 'SHORTENED LINK',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'utmCampaign',
                sortable: false,
                label: 'UTM CAMPAIGN',
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
                label: 'REDIRECTS',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS',
                thStyle: {
                    textAlign: 'center'
                }
            },
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
        trafficRoutesTotal: 0,
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: ''
    }),
    async created() {
        await this.getTrafficRoutes();
    },
    computed: {
        ...mapGetters(['getAllTrafficRoutes']),

        itemsForTrafficRoutes: {
            get: function() {
                return JSON.parse(JSON.stringify(this.getAllTrafficRoutes));
            },
            set: function() {}
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
        async handleClickTrafficRoutesTableRow(item) {
            this.selectedTrafficRoute = item;

            for (var i = 0; i < this.itemsForTrafficRoutes.length; i++) {
                this.itemsForTrafficRoutes[i]._rowVariant = '';
            }

            item._rowVariant = 'active';
            this.pageForRecentRedirects = 1;
            await this.getRecentRedirects();

            this.isShowRecentRedirectsTable = true;
            this.isShowCharts = false;
            this.$refs.traffictable.refresh();
        },
        async refreshTrafficRoutes() {
            this.currentPageForTrafficRoutes = 1;
            this.isShowRecentRedirectsTable = false;
            this.closeCharts();
            await this.getTrafficRoutes();
        },
        async publishOrUnpublishRoute(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedTrafficRoute = route;

            if (data.item.status === 'published') {
                await this.$store
                    .dispatch(
                        'unpublishTrafficRoute',
                        this.selectedTrafficRoute._id
                    )
                    .then(() => {
                        // Send Tracking Event With UCC SDK
                        submitTrackingEvent(
                            'TRAFFIC-ROUTE-UNPUBLISHED',
                            { trafficRouteId: this.selectedTrafficRoute._id },
                            this.$store.getters['customerData']
                        );
                        this.$store.dispatch('getAllTrafficRoutes', {
                            sort_by: this.selectedOrderByOption
                        });
                    });
            } else {
                await this.$store
                    .dispatch(
                        'publishTrafficRoute',
                        this.selectedTrafficRoute._id
                    )
                    .then(() => {
                        // Send Tracking Event With UCC SDK
                        submitTrackingEvent(
                            'TRAFFIC-ROUTE-PUBLISHED',
                            { trafficRouteId: this.selectedTrafficRoute._id },
                            this.$store.getters['customerData']
                        );
                        this.$store.dispatch('getAllTrafficRoutes', {
                            sort_by: this.selectedOrderByOption
                        });
                    });
            }
        },
        // async showChartForRoute(item) {
        //     this.tableTitle = item.title;
        //     this.totalClicks = item.redirects;

        //     const route = this.findRouteById(item._id);
        //     this.selectedTrafficRoute = route;

        //     this.isShowCharts = true;
        //     this.isShowRecentRedirectsTable = false;

        //     for (var i = 0; i < this.itemsForTrafficRoutes.length; i++) {
        //         this.itemsForTrafficRoutes[i]._rowVariant = '';
        //     }

        //     if (this.isShowCharts && this.selectedChartId === item._id) {
        //         this.closeCharts();
        //         this.selectedChartId = '';
        //         return;
        //     }
        //     this.selectedChartId = item._id;

        //     await this.getChartData(item._id);
        // },
        // closeCharts() {
        //     this.isShowCharts = false;
        //     this.selectedChartId = '';
        //     this.selectedTrafficRoute = null;
        // },
        findRouteById(id) {
            return this.itemsForTrafficRoutes.find(item => item._id === id);
        },
        doCopy(text) {
            this.$copyText(text).then(
                () => {
                    this.$notify({
                        title: 'Copied',
                        type: 'success'
                    });
                },
                () => {
                    alert('Cannot copy');
                }
            );
        },
        editRow(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedTrafficRoute = route;
            this.$store.commit('SET_TRAFFICROUTE', this.selectedTrafficRoute);
            this.$router.push({
                name: 'EditTrafficRoute',
                params: {
                    id: this.selectedTrafficRoute._id
                }
            });
        },
        removeRow(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedTrafficRoute = route;
            this.$bvModal.show('delete-confirm-modal');
        },
        confirmDeleteTrafficRoute(value) {
            if (value) {
                this.itemsForTrafficRoutes = this.itemsForTrafficRoutes.filter(
                    item => item._id !== this.selectedTrafficRoute._id
                );
                this.isShowRecentRedirectsTable = false;
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
        // async getChartData(routeId) {
        //     try {
        //         const { data } = await new TrafficRoutesAPI().getChartData(
        //             routeId
        //         );
        //         const browserLabels = data['browser'].map(b => b.browserName);
        //         const browserRedirects = data['browser'].map(b => b.redirects);

        //         const cityLabels = data['city'].map(c => c.publicIpCity);
        //         const cityRedirects = data['city'].map(c => c.redirects);

        //         const countryLabels = data['country'].map(
        //             c => c.publicIpCountry
        //         );
        //         const countryRedirects = data['country'].map(c => c.redirects);
        //         const monthNames = [
        //             'January',
        //             'February',
        //             'March',
        //             'April',
        //             'May',
        //             'June',
        //             'July',
        //             'August',
        //             'September',
        //             'October',
        //             'November',
        //             'December'
        //         ];
        //         const monthLabels = data['day'].map(c => {
        //             const today = new Date(c.year, c.month, c.day);
        //             return (
        //                 monthNames[today.getMonth() - 1] + ' ' + today.getDate()
        //             );
        //         });

        //         const monthRedirects = data['day'].map(c => c.redirects);

        //         const browserColor = [
        //             '#191C5C',
        //             '#2F3380',
        //             '#6E71A7',
        //             '#ACADCC',
        //             '#A3AQFB',
        //             '#C3C1FC',
        //             '#E9EE9F0'
        //         ];
        //         const countriesColor = [
        //             '#FF6565',
        //             '#FF8373',
        //             '#FFE6E3',
        //             '#FFC188',
        //             '#FFDA83',
        //             '#FFEDC5',
        //             '#E9E9F0'
        //         ];

        //         const citiesColor = [
        //             '#EE487D',
        //             '#F05788',
        //             '#FBD1DE',
        //             '#FCE2EB',
        //             '#F9AD6B',
        //             '#FCD2AE',
        //             '#E9E9F0'
        //         ];

        //         const browserDatasets = {
        //             labels: browserLabels,
        //             datasets: [
        //                 {
        //                     label: 'Browsers x Redirects',
        //                     data: browserRedirects,
        //                     backgroundColor: browserColor,
        //                     borderColor: browserColor,
        //                     borderWidth: 1
        //                 }
        //             ]
        //         };

        //         const cityDatasets = {
        //             labels: cityLabels,
        //             datasets: [
        //                 {
        //                     label: 'Cities x Redirects',
        //                     data: cityRedirects,
        //                     backgroundColor: citiesColor,
        //                     borderColor: citiesColor,
        //                     borderWidth: 1
        //                 }
        //             ]
        //         };

        //         const countryDatasets = {
        //             labels: countryLabels,
        //             datasets: [
        //                 {
        //                     label: 'Countries x Redirects',
        //                     data: countryRedirects,
        //                     backgroundColor: countriesColor,
        //                     borderColor: countriesColor,
        //                     borderWidth: 1
        //                 }
        //             ]
        //         };

        //         const monthDatasets = {
        //             labels: _.uniq(monthLabels),
        //             datasets: [
        //                 {
        //                     label: 'Month x Redirects',
        //                     data: monthRedirects,
        //                     backgroundColor: '#39CB89',
        //                     borderColor: '#39CB89',
        //                     borderWidth: 1
        //                 }
        //             ]
        //         };

        //         this.chartData.browserDatasets = browserDatasets;
        //         this.chartData.cityDatasets = cityDatasets;
        //         this.chartData.countryDatasets = countryDatasets;
        //         this.chartData.monthDatasets = monthDatasets;
        //     } catch (error) {
        //         throw new Error(error);
        //     }
        // },
        async getTrafficRoutes() {
            const routes = await this.$store.dispatch('getAllTrafficRoutes', {
                sort_by: this.selectedOrderByOption,
                limit: this.perPageForTrafficRoutes,
                offset:
                    (this.currentPageForTrafficRoutes - 1) *
                    this.perPageForTrafficRoutes
            });
            this.trafficRoutesTotal = routes.total;
        },
        async getRecentRedirects() {
            var redirects = await new TrafficRoutesAPI().getRedirectsData(
                this.selectedTrafficRoute._id,
                this.pageSizeForRecentRedirects,
                (this.pageForRecentRedirects - 1) *
                    this.pageSizeForRecentRedirects
            );

            this.recentRedirectsTotal = redirects.data.total;
            this.itemsForRecentRedirects = redirects.data.data;
        },
        async handleTrafficRoutesChange(value) {
            this.currentPageForTrafficRoutes = value;
            await this.getTrafficRoutes();
        },
        async handleRecentRedirectsPageChange(value) {
            this.pageForRecentRedirects = value;
            await this.getRecentRedirects();
        },
        async handleTrafficRoutesPageSizeChange(size) {
            this.perPageForTrafficRoutes = size;
            this.currentPageForTrafficRoutes = 1;
            await this.getTrafficRoutes();
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
        async sortTrafficRoute() {
            this.currentPageForTrafficRoutes = 1;
            await this.getTrafficRoutes();
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

.published {
    background: #9fe364 0% 0% no-repeat padding-box;
}

.unpublished {
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
</style>
