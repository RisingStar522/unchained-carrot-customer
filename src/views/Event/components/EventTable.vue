<template>
    <div class="content">
        <div class="event">
            <div class="py-4">
                <h4 class="text-brand">Events</h4>
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
                                @change="sortEvent"
                                v-model="selectedOrderByOption"
                            >
                                <option selected value="lastSeen">
                                    LAST SEEN
                                </option>
                            </b-form-select>
                        </div>
                    </div>
                    <div class="d-flex align-items-center ml-4">
                        <div class="">
                            <b-link class="mr-4" @click="refreshEvent">
                                <img
                                    src="../../../assets/icons/refresh_icon.svg"
                                />
                            </b-link>
                        </div>
                    </div>
                </div>

                <b-table
                    hover
                    id="event"
                    :fields="fieldsForEvent"
                    :items="itemsForEvent"
                    @row-clicked="handleClickEventTableRow"
                    @row-dblclicked="handleDblClickEventTableRow"
                    caption-top
                    responsive
                    head-variant="light"
                    ref="eventtable"
                >
                    <template v-slot:cell(name)="data">
                        <div class="pl-2">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(source)="data">
                        <div class="text-center">
                            {{data.value}}
                        </div>
                    </template>
                    <template v-slot:cell(project)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(lastSeen)="data">
                        <div class="text-center">
                            {{ dayjs(data.value).format('DD-MM-YYYY hh:mm') }}
                        </div>
                    </template>
                    <template v-slot:cell(rules)>
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-center
                            "
                        >
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                            >
                                <span class="default">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="Rettangolo_1731" data-name="Rettangolo 1731" width="16" height="16" transform="translate(20 235.667)" fill="#39cb89"/>
                                            </clipPath>
                                        </defs>
                                        <g id="Gruppo_di_maschere_44" data-name="Gruppo di maschere 44" transform="translate(-20 -235.667)" clip-path="url(#clip-path)">
                                            <g id="Raggruppa_1094" transform="translate(20.001 237.875)">
                                            <g id="Raggruppa_1784" data-name="Raggruppa 1784" transform="translate(0 0)">
                                                <path class="icon-green" id="Tracciato_1302" data-name="Tracciato 1302" d="M4.351,7.9l7.228,4.033a.244.244,0,0,0,.072.029.123.123,0,0,0,.116,0c.029-.014.058-.014.072-.029L19.068,7.9a.827.827,0,0,0-.4-1.547H4.741a.824.824,0,0,0-.824.824A.806.806,0,0,0,4.351,7.9Z" transform="translate(-3.917 -6.349)" fill="#5bbaa1"/>
                                                <path class="icon-green" id="Tracciato_1303" data-name="Tracciato 1303" d="M19.448,10.233a.357.357,0,0,0-.492-.13l-7.113,4.033a.4.4,0,0,1-.26,0L4.47,10.1a.357.357,0,0,0-.492.13h0a.4.4,0,0,0-.043.188v8.168a.358.358,0,0,0,.361.361H19.13a.358.358,0,0,0,.361-.361V10.421a.219.219,0,0,0-.043-.188Z" transform="translate(-3.921 -7.168)" fill="#5bbaa1"/>
                                            </g>
                                            </g>
                                        </g>  
                                    </svg>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                            >
                                <span class="default">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 13.875 19.5">
                                        <path class="icon-green" id="Icon_ionic-ios-calculator" data-name="Icon ionic-ios-calculator" d="M19.969,3.375H9.094a1.5,1.5,0,0,0-1.5,1.5v16.5a1.5,1.5,0,0,0,1.5,1.5H19.969a1.5,1.5,0,0,0,1.5-1.5V4.875A1.5,1.5,0,0,0,19.969,3.375Zm-.563,12.75v3.75A1.122,1.122,0,0,1,18.281,21h0a1.122,1.122,0,0,1-1.125-1.125v-3.75A1.122,1.122,0,0,1,18.281,15h0A1.122,1.122,0,0,1,19.406,16.125Zm0-3.75h0A1.122,1.122,0,0,1,18.281,13.5h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,19.406,12.375Zm-3.75,7.5h0A1.122,1.122,0,0,1,14.531,21h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,15.656,19.875Zm0-3.75h0a1.122,1.122,0,0,1-1.125,1.125h0a1.122,1.122,0,0,1-1.125-1.125h0A1.122,1.122,0,0,1,14.531,15h0A1.122,1.122,0,0,1,15.656,16.125Zm0-3.75h0A1.122,1.122,0,0,1,14.531,13.5h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,15.656,12.375Zm-3.75,7.5h0A1.122,1.122,0,0,1,10.781,21h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,11.906,19.875Zm0-3.75h0a1.122,1.122,0,0,1-1.125,1.125h0a1.122,1.122,0,0,1-1.125-1.125h0A1.122,1.122,0,0,1,10.781,15h0A1.122,1.122,0,0,1,11.906,16.125Zm0-3.75h0A1.122,1.122,0,0,1,10.781,13.5h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,11.906,12.375Zm-2.25-3.75V6.375a.752.752,0,0,1,.75-.75h8.25a.752.752,0,0,1,.75.75v2.25a.752.752,0,0,1-.75.75h-8.25A.752.752,0,0,1,9.656,8.625Z" transform="translate(-7.594 -3.375)" fill="#f79946"/>
                                    </svg>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                            >
                                <span class="default">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 13.875 19.5">
                                        <path class="icon-green" id="Icon_ionic-ios-calculator" data-name="Icon ionic-ios-calculator" d="M19.969,3.375H9.094a1.5,1.5,0,0,0-1.5,1.5v16.5a1.5,1.5,0,0,0,1.5,1.5H19.969a1.5,1.5,0,0,0,1.5-1.5V4.875A1.5,1.5,0,0,0,19.969,3.375Zm-.563,12.75v3.75A1.122,1.122,0,0,1,18.281,21h0a1.122,1.122,0,0,1-1.125-1.125v-3.75A1.122,1.122,0,0,1,18.281,15h0A1.122,1.122,0,0,1,19.406,16.125Zm0-3.75h0A1.122,1.122,0,0,1,18.281,13.5h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,19.406,12.375Zm-3.75,7.5h0A1.122,1.122,0,0,1,14.531,21h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,15.656,19.875Zm0-3.75h0a1.122,1.122,0,0,1-1.125,1.125h0a1.122,1.122,0,0,1-1.125-1.125h0A1.122,1.122,0,0,1,14.531,15h0A1.122,1.122,0,0,1,15.656,16.125Zm0-3.75h0A1.122,1.122,0,0,1,14.531,13.5h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,15.656,12.375Zm-3.75,7.5h0A1.122,1.122,0,0,1,10.781,21h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,11.906,19.875Zm0-3.75h0a1.122,1.122,0,0,1-1.125,1.125h0a1.122,1.122,0,0,1-1.125-1.125h0A1.122,1.122,0,0,1,10.781,15h0A1.122,1.122,0,0,1,11.906,16.125Zm0-3.75h0A1.122,1.122,0,0,1,10.781,13.5h0a1.122,1.122,0,0,1-1.125-1.125h0a1.122,1.122,0,0,1,1.125-1.125h0A1.122,1.122,0,0,1,11.906,12.375Zm-2.25-3.75V6.375a.752.752,0,0,1,.75-.75h8.25a.752.752,0,0,1,.75.75v2.25a.752.752,0,0,1-.75.75h-8.25A.752.752,0,0,1,9.656,8.625Z" transform="translate(-7.594 -3.375)" fill="#f79946"/>
                                    </svg>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                            >
                                <span class="default">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
                                        <defs>
                                            <clipPath id="clip-path">
                                            <rect id="Rettangolo_1731" data-name="Rettangolo 1731" width="16" height="16" transform="translate(20 235.667)" fill="#39cb89"/>
                                            </clipPath>
                                        </defs>
                                        <g id="Gruppo_di_maschere_44" data-name="Gruppo di maschere 44" transform="translate(-20 -235.667)" clip-path="url(#clip-path)">
                                            <g id="Raggruppa_1094" transform="translate(20.001 237.875)">
                                            <g id="Raggruppa_1784" data-name="Raggruppa 1784" transform="translate(0 0)">
                                                <path class="icon-yellow" id="Tracciato_1302" data-name="Tracciato 1302" d="M4.351,7.9l7.228,4.033a.244.244,0,0,0,.072.029.123.123,0,0,0,.116,0c.029-.014.058-.014.072-.029L19.068,7.9a.827.827,0,0,0-.4-1.547H4.741a.824.824,0,0,0-.824.824A.806.806,0,0,0,4.351,7.9Z" transform="translate(-3.917 -6.349)" fill="#f79946"/>
                                                <path class="icon-yellow" id="Tracciato_1303" data-name="Tracciato 1303" d="M19.448,10.233a.357.357,0,0,0-.492-.13l-7.113,4.033a.4.4,0,0,1-.26,0L4.47,10.1a.357.357,0,0,0-.492.13h0a.4.4,0,0,0-.043.188v8.168a.358.358,0,0,0,.361.361H19.13a.358.358,0,0,0,.361-.361V10.421a.219.219,0,0,0-.043-.188Z" transform="translate(-3.921 -7.168)" fill="#f79946"/>
                                            </g>
                                            </g>
                                        </g>  
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </template>
                </b-table>

                <div
                    class="d-flex align-items-center justify-content-end pr-3 pl-3 border-top"
                >
                    <div class="mr-3">
                        <span class="mr-3">Rows per page: </span>
                        <b-form-select
                            v-model="perPageForEvent"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                            @change="handleEventPageSizeChange($event)"
                        >
                        </b-form-select>
                    </div>
                    <b-pagination
                        v-model="currentPageForEvent"
                        aria-controls="event"
                        align="right"
                        :total-rows="EventTotal"
                        :per-page="perPageForEvent"
                        @change="handleEventChange"
                    ></b-pagination>
                </div>
            </b-card>
        </div>

        <div>
            <Event
                class="show-published"
                v-bind:class="{
                    hide: isShowPublishedTreeDiagram === false,
                    show: isShowPublishedTreeDiagram === true
                }"
                :name="name"
                :project="project"
                :lastSeen="lastSeen"
                :statusPublished="statePublished"
            ></Event>

            <Event
                class="show-unPublished"
                v-bind:class="{
                    hide: isShowUnpublishedTreeDiagram === false,
                    show: isShowUnpublishedTreeDiagram === true
                }"
                :name="name"
                :project="project"
                :lastSeen="lastSeen"
                :statusPublished="statePublished"
            ></Event>
        </div>

        <div v-if="isShowCharts" class="container-chart">
            <EventChartJson
                class="show-chart-json"
                :name="name"
                :project="project"
                :lastSeen="lastSeen"
                :statusPublished="statePublished"
            ></EventChartJson>
            <div
                class="d-flex  justify-content-between align-items-center mb-3"
                style="margin-top: 10px"
            >
                <div class="d-flex align-items-center ">
                    <div class=" mr-5 my-auto">
                        <h2 class="text-brand mb-0">
                            Charts
                        </h2>
                        <h4 class="text-sm p-0 subtile-color" style="font-size: 10px">Name of event</h4>
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

            <b-card class="pt-4 mt-3 mb-4">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h4 class="text-brand font-weight-bold">
                                {{ totalClicks }}
                            </h4>
                            <p class="font-weight-bold mb-2">
                                Total Events
                            </p>
                            <div class="bar-container">
                                <BarChart
                                    v-if="chartData.monthDatasets"
                                    :data="chartData.monthDatasets"
                                    :options="options"
                                />
                            </div>
                            <p class="text-right p-font">Data in UTC</p>
                        </div>
                    </div>
                </div>
            </b-card>

        </div>


        <div v-if="isShowJson" class="container-json">
            <EventChartJson
                class="show-chart-json"
                :name="name"
                :project="project"
                :lastSeen="lastSeen"
                :statusPublished="statePublished"
            ></EventChartJson>

            <div
                class="d-flex  justify-content-between align-items-center mb-3"
                style="margin-top: 10px"
            >
            </div>
            <TreeView class="content-json"/>
        </div>
    </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import TreeView from './event/components/TreeView.vue'
import dayjs from 'dayjs';

import BarChart from './charts/Bar.vue';
import Event from './event/Event.vue';
import EventChartJson from './event/EventChartJson.vue';

import _ from 'lodash';

export default {
    name: 'event-table',
    components: {
        BarChart,
        DateRangePicker,
        Event,
        EventChartJson,
        TreeView
    },
    data: () => ({
        treeData: [{"id": 2, "name": "Venus" , "children": [{"id": 3, "name": "Neptune"}, {"id": 4, "name": "Stratus"} ] } ],
        itemIndex: "1",
        itemForEvent: {        
          address: 'name'
        },
        eventTitle: 'Name of the event',
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
        isShowJson: false,
        chartData: {
            browserDatasets: null,
            cityDatasets: null,
            countryDatasets: null,
            monthDatasets: null
        },
        selectedOrderByOption: 'lastSeen',
        selectedEvent: null,
        isShowPublishedTreeDiagram: false,
        isShowUnpublishedTreeDiagram: false,
        statusPublished: true,
        perPageForEvent: 5,
        currentPageForEvent: 1,
        fieldsForEvent: [
            {
                key: 'name',
                sortable: false,
                label: 'NAME',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'source',
                sortable: false,
                label: 'SOURCE',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'project',
                sortable: false,
                label: 'PROJECT',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'lastSeen',
                sortable: false,
                label: 'LAST SEEN',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'rules',
                sortable: false,
                label: 'RULES',
                thStyle: {
                    textAlign: 'center'
                }
            }
        ],
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        EventTotal: 0,
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: '',
    }),
    computed: {
        itemsForEvent: {
            get: function() {
               return [
                    {
                        "_id":"61b992d61b1979001d18baa7",
                        "name":"asdf",
                        "source":"woocommerce",
                        "project":"MyShop.com",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                    },
                    {
                        "_id":"61b992d61b1979001d18baa1",
                        "name":"Coupon Redeemed",
                        "source":"countr",
                        "project":"",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                    },
                    {
                        "_id":"61b992d61b1979001d18baa2",
                        "name":"Survey completed",
                        "source":"Unchained Carrot",
                        "project":"Landing Page",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                    },
                    {
                        "_id":"61b992d61b1979001d18baa3",
                        "name":"Referral Confirmed",
                        "source":"ReferraledByMe",
                        "project":"myrefprog",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                    }
               ]
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
        },

        name() {
            return 'WooCommerce';
        },

        project() {
            return 'MyShop.com';
        },

        lastSeen() {
            return '1-oct-2021 18:57';
        },

        statePublished() {
            return this.statusPublished;
        }
    },
    methods: {
        changeStateJson() {
          this.isShowJson = true;
          this.isShowCharts = false;
          this.isShowPublishedTreeDiagram = false;
          this.isShowUnpublishedTreeDiagram = false;
        },
        changeStateCharts() {
          this.isShowJson = false;
          this.isShowCharts = true;
          this.isShowPublishedTreeDiagram = false;
          this.isShowUnpublishedTreeDiagram = false;
        },
        validate() {
            console.log('--------------------Validate------------------');
        },
        async handleClickEventTableRow(item) {
            this.isShowPublishedTreeDiagram = true;
            this.isShowUnpublishedTreeDiagram = false;
            this.statusPublished = true;
            this.isShowCharts = false;
            this.isShowJson = false;
        },
        async handleDblClickEventTableRow(item) {
            this.isShowPublishedTreeDiagram = false;
            this.isShowUnpublishedTreeDiagram = true;
            this.isShowCharts = false;
            this.isShowJson = false;
            this.statusPublished = false;
        },
        async refreshEvent() {
        },
        async showChartForEvent(item) {
            this.eventTitle = item.title;

            this.isShowPublishedTreeDiagram = false;
            this.isShowUnpublishedTreeDiagram = false;
            this.isShowCharts = true;
            this.isShowJson = false;
        },
        async showJsonForEvent(item) {
            this.eventTitle = item.title;

            this.isShowPublishedTreeDiagram = false;
            this.isShowUnpublishedTreeDiagram = false;            
            this.isShowCharts = false
            this.isShowJson = true;
        },
        closeCharts() {
            if ( this.isShowCharts )
                this.isShowPublishedTreeDiagram = true;
            else if ( this.isShowJson )
                this.isShowUnpublishedTreeDiagram = true;
            this.isShowCharts = false;
            this.isShowJson = false;
        },
        stringToHslColor(str, s, l) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }

            const h = hash % 360;
            return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        },
        async handleEventChange(value) {
            this.currentPageForEvent = value;
        },
        async handleEventPageSizeChange(size) {
            this.perPageForEvent = size;
            this.currentPageForEvent = 1;
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
        async sortEvent() {
        },
    }
};
</script>

<style lang="scss" scoped>
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

.p-font {
    font-size: 13px;
    color: #4d4f5c;
}

.published {
    background: #9fe364 0% 0% no-repeat padding-box;
}

.unpublished {
    background: #c6c6c6 0% 0% no-repeat padding-box;
}

table {
    tbody {
        tr {
            .action-icon {
                width: 23px;

                .default {
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


.container-json {
    position: relative;
}
.content-json {
    position: absolute;
    margin-left: 400px;
    margin-top: -100px;
}
</style>
