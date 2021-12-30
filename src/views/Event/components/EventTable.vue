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
                    <template v-slot:cell(rules) = "data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-left
                            "
                        >
                        <div 
                        class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-for="rule in data.value"
                                :value="rule['mark']"
                                :key="rule['mark']"
                        >
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='email_green'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/email_green.svg"/>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='enrichment_green'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/enrichment_green.svg"/>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='analytics_green'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/analytics_green.svg"/>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='email_yellow'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/email_yellow.svg"/>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='enrichment_yellow'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/enrichment_yellow.svg"/>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='analytics_yellow'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/analytics_yellow.svg"/>
                                </span>
                            </div>
                            <div
                                class="action-icon mr-2"
                                data-toggle="tooltip"
                                v-if="rule['mark']=='reward_yellow'"
                            >
                                <span class="default">
                                    <img    
                                        class="mr-2"
                                        src="../../../assets/images/events/reward_yellow.svg"/>
                                </span>
                            </div>
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
            <div v-if="isShowCloseBtn"
                class="d-flex  justify-content-end"
            >
                <div class="justify-content-end"
                    
                >
                    <b-button
                        type="button"
                        variant="brand"
                        size="lg"
                        @click="closeCharts"
                        >Close</b-button
                    >
                </div>
            </div>
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
            <!-- <TreeView class="content-json"/> -->
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
        totalClicks: 6587,
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
                        barPercentage: 0.1,
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }
                ],
                yAxes: [
                    {
                        position: 'right',
                        max: 75,
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        },
        isShowCloseBtn: false,
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
                        "rules": [
                            {'mark':'email_green'}, 
                            {'mark':'enrichment_green'},
                            {'mark':'analytics_green'},
                            {'mark':'reward_yellow'}
                        ]
                    },
                    {
                        "_id":"61b992d61b1979001d18baa1",
                        "name":"Coupon Redeemed",
                        "source":"countr",
                        "project":"",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                        "rules": [
                            {'mark':'email_yellow'}, 
                            {'mark':'reward_yellow'}
                        ]
                    },
                    {
                        "_id":"61b992d61b1979001d18baa2",
                        "name":"Survey completed",
                        "source":"Unchained Carrot",
                        "project":"Landing Page",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                        "rules": [
                            {'mark':'email_green'}, 
                            {'mark':'enrichment_yellow'},
                            {'mark':'reward_yellow'}
                        ]
                    },
                    {
                        "_id":"61b992d61b1979001d18baa3",
                        "name":"Referral Confirmed",
                        "source":"ReferraledByMe",
                        "project":"myrefprog",
                        "status":"published",
                        "lastSeen":"2021-12-15T07:01:42.909Z",
                        "rules": [
                            {'mark':'enrichment_green'}, 
                            {'mark':'analytics_yellow'},
                            {'mark':'reward_yellow'}
                        ]
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
    mounted() {
        this.getChartData();
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
            this.isShowCloseBtn = true;
            this.isShowPublishedTreeDiagram = true;
            this.isShowUnpublishedTreeDiagram = false;
            this.statusPublished = true;
            this.isShowCharts = false;
            this.isShowJson = false;
        },
        async handleDblClickEventTableRow(item) {
            this.isShowCloseBtn = true;
            this.isShowPublishedTreeDiagram = false;
            this.isShowUnpublishedTreeDiagram = true;
            this.isShowCharts = false;
            this.isShowJson = false;
            this.statusPublished = false;
        },
        async refreshEvent() {
        },
        getChartData(eventId = 0) {
            try {
                const data = {
                    week: [
                        {
                            year: 2021,
                            weekNumber: 43,
                            events: 1
                        },
                        {
                            year: 2022,
                            weekNumber: 43,
                            events: 1
                        }
                    ],
                    day: [
                        {
                            year: 2021,
                            month: 10,
                            day: 19,
                            events: 35
                        },
                        {
                            year: 2021,
                            month: 11,
                            day: 18,
                            events: 70
                        }
                    ],
                    hour: [
                        {
                            year: 2021,
                            month: 10,
                            day: 19,
                            hour: 8,
                            events: 1
                        },
                        {
                            year: 2021,
                            month: 11,
                            day: 19,
                            hour: 8,
                            events: 1
                        }
                    ],
                };
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

                const monthEvents = data['day'].map(c => c.events);
                const monthDatasets = {
                    labels: _.uniq(monthLabels),
                    datasets: [
                        {
                            label: 'Month x Redirects',
                            data: monthEvents,
                            backgroundColor: '#39CB89',
                            borderColor: '#39CB89',
                            borderWidth: 1
                        }
                    ]
                };

                this.chartData.monthDatasets = monthDatasets;
            } catch (error) {
                throw new Error(error);
            }
        },
        async showChartForEvent(item) {
            this.getChartData();
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
            if ( this.isShowPublishedTreeDiagram || this.isShowUnpublishedTreeDiagram) {
                this.isShowCloseBtn = false;
                this.isShowPublishedTreeDiagram = false;
                this.isShowUnpublishedTreeDiagram = false;
            }

            if ( this.isShowCharts ) {
                this.isShowPublishedTreeDiagram = true;
                this.isShowUnpublishedTreeDiagram = false;
            } else if ( this.isShowJson ) {
                this.isShowUnpublishedTreeDiagram = true;
                this.isShowPublishedTreeDiagram = false;
            }
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
