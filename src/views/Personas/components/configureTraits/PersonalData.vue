<template>
    <div>
        <div class="personas">
            <b-card>
                <b-table
                    hover
                    id="personas"
                    :fields="fieldsForPersonas"
                    :items="itemsForPersonas"
                    caption-top
                    responsive
                    head-variant="light"
                    ref="personasTable"
                >
                    <template v-slot:cell(trait)="data">
                        <div class="">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(value)="data">
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
                        </div>
                    </template>
                </b-table>
            </b-card>

        </div>
        <!-- <DeleteConfirmModal
            :persona="selectedPersona"
            @confirm="confirmDeletePersona"
        /> -->
    </div>
</template>

<script>
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import dayjs from 'dayjs';

// import DeleteConfirmModal from './DeleteConfirmModal.vue';
import { mapGetters } from 'vuex';
// import PersonasAPI from '../../../api/PersonasAPI';

import _ from 'lodash';

export default {
    name: 'personas-table',
    components: {
        // DeleteConfirmModal,
    },
    data: () => ({
        form: {
            name: '',
            value: '',
            unit: '',
        },
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
        selectedPersona: null,
        isShowRecentRedirectsTable: false,
        perPageForPersonas: 5,
        currentPageForPersonas: 1,
        fieldsForPersonas: [
            {
                key: 'trait',
                sortable: false,
                label: 'LIST OF TRAITS',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'value',
                sortable: false,
                label: 'DEAFULT VALUE',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'action',
                label: ''
            }
        ],
        itemsForRecentRedirects: [],
        recentRedirectsTotal: 0,
        personasTotal: 0,
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: ''
    }),
    computed: {
        // ...mapGetters(['getAllPersonas']),

        itemsForPersonas: {
            get: function() {
                return [
                    {
                        "_id":"61b172d29aa3ac001d5216ca",
                        "trait":"Propensity to buy",
                        "value":"50%",
                    },
                    {
                        "_id":"61b172d29aa3ac001d5312ca",
                        "trait":"Propensity to buy new products",
                        "value":"50%"
                    }
                ];
                // return JSON.parse(JSON.stringify(this.getAllPersonas));
            },
            set: function() {}
        },
    },
    methods: {
        showConfigureTraits() {
            this.$bvModal.show('configureTraits');
        },
        removeRow(data) {
            // const route = this.findRouteById(data.item._id);
            // this.selectedPersona = route;
            // this.$bvModal.show('delete-confirm-modal');
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
.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
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
</style>
