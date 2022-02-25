<template>
    <div>
        <div class="personas">
            <b-card>
                <div
                    class="d-flex align-items-center py-3"
                    style="padding-left: 40px; padding-right: 30px"
                >
                    <div class="d-flex align-items-center">
                        <span class="text-brand mr-3 flex-grow">Order by</span>
                        <div>
                            <b-form-select
                                @change="sortPersonas"
                                v-model="selectedOrderByOption"
                            >
                                <option selected value="source">
                                    Source
                                </option>
                                <option value="name">
                                    Name
                                </option>
                                <option value="defaultValue">
                                    Default Value
                                </option>
                            </b-form-select>
                        </div>
                        <b-col sm="5">
                            <div class="input-with-icon">
                                <b-form-input placeholder="" />
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
                                                    height="16"
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
                            <img
                                src="../../../../assets/icons/add_circle_icon.svg"
                            />
                            <b-btn v-b-modal.configureTraits class="ml-2" variant="outline-brand">
                                Add Trait
                            </b-btn>
                        </div>
                    </div>
                </div>

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
                    <template v-slot:cell(source)="data">
                        <div class="pl-2">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(name)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(defaultValue)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(dataType)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(unitOfMeasure)="data">
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
                                title="Delete Data"
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
                            v-model="perPageForPersonas"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                            @change="handlePersonasPageSizeChange($event)"
                        >
                        </b-form-select>
                    </div>
                    <b-pagination
                        v-model="currentPageForPersonas"
                        aria-controls="personas"
                        align="right"
                        :total-rows="personasTotal"
                        :per-page="perPageForPersonas"
                        @change="handlePersonasChange"
                    ></b-pagination>
                </div>
            </b-card>

        </div>

        <Modal modalId="configureTraits" title="Add Persona Trait">
            <template v-slot:default>
                <div class="validation_mark">
                    <img
                        class="mr-2"
                        src="../../../../assets/icons/validation_mandatory.svg"
                    />
                    <span>MANDATORY</span>
                </div>
                <b-row class="m-1">
                    <label class="trait-source">Source</label>
                    <b-form-select
                        id="event-source"
                        name="event-source"
                        v-model="selected"
                        :options="transformActivePersonas"
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
        </Modal>

        <Modal modalId="configureEditTraits" title="Edit Persona Trait">
            <template v-slot:default>
                <div class="validation_mark">
                    <img
                        class="mr-2"
                        src="../../../../assets/icons/validation_mandatory.svg"
                    />
                    <span>MANDATORY</span>
                </div>
                <b-row class="m-1">
                    <label class="trait-source">Source</label>
                    <b-form-select
                        id="event-source"
                        name="event-source"
                        v-model="selected"
                        :options="transformActivePersonas"
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
        </Modal>

        <Modal modalId="addPersonas" title="Add Persona Trait">
            <template v-slot:default>
                <div class="validation_mark">
                    <img
                        class="mr-2"
                        src="../../../../assets/icons/validation_mandatory.svg"
                    />
                    <span>MANDATORY</span>
                </div>
                <b-row class="m-1">
                    <label><small>Source</small></label>
                    <b-form-select
                        id="event-source"
                        name="event-source"
                        v-model="selected"
                        :options="transformActivePersonas"
                        class="mb-3"
                        aria-placeholder="select event source"
                    >
                    </b-form-select>
                </b-row>
                <b-form-group id="input-group-1" label="Name" label-for="input-2">
                    <b-form-input
                        id="input-1"
                        v-model="form.name"
                        placeholder="Propensity to buy"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Default Value" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="form.value"
                        placeholder="50%"
                        required
                    ></b-form-input>
                </b-form-group>
            </template>
        </Modal>
    </div>
</template>

<script>
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import Modal from '../modal.vue';
import _ from 'lodash';

export default {
    name: 'customerTraits',
    components: {
        Modal
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
        isShowEmployee: false,
        selectedOrderByOption: 'source',
        selectedPersona: null,
        perPageForPersonas: 5,
        currentPageForPersonas: 1,
        fieldsForPersonas: [
            {
                key: 'source',
                sortable: false,
                label: 'SOURCE',
                thStyle: {
                    paddingLeft: '40px'
                }
            },
            {
                key: 'name',
                sortable: false,
                label: 'NAME',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'defaultValue',
                sortable: false,
                label: 'DEFAULT VALUE',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'dataType',
                sortable: false,
                label: 'DATA TYPE',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'unitOfMeasure',
                sortable: false,
                label: 'UNIT OF MEASURE',
                thStyle: {
                    textAlign: 'center'
                }
            },
            {
                key: 'action',
                label: ''
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
        personasTotal: 0,
    }),
    async created() {
        await this.getPersonas();
    },
    computed: {
        itemsForPersonas: {
            get: function() {
                return [
                    {
                        "_id":"61b172d29aa3ac001d5216ca",
                        "source":"Event",
                        "name":"Last purchase",
                        "defaultValue":"-",
                        "dataType":"number",
                        "unitOfMeasure": "",
                    },
                    {
                        "_id":"61b172d29aa3ac001d5312ca",
                        "source":"Analytics",
                        "name":"Life time value",
                        "defaultValue":"0",
                        "dataType":"no",
                        "unitOfMeasure": "",
                    },
                    {
                        "_id":"61b172d29aa3ac001d5312ca",
                        "source":"User input",
                        "name":"-",
                        "defaultValue":"-",
                        "dataType":"no",
                        "unitOfMeasure": "",
                    },
                    {
                        "_id":"61b172d29aa3ac001d5312ca",
                        "source":"Consumer Input",
                        "name":"Last consumer support contact",
                        "defaultValue":"0",
                        "dataType":"no",
                        "unitOfMeasure": "",
                    },
                    {
                        "_id":"61b172d29aa3ac001d5312ca",
                        "source":"Event",
                        "name":"Newsletter subscribe",
                        "defaultValue":"False",
                        "dataType":"yes",
                        "unitOfMeasure": "",
                    }
                ];
            },
            set: function() {}
        },

        transformActivePersonas() {
            return this.itemsForPersonas.map(({ externalSystem }) =>
                this.capitalizeFirstLetter(externalSystem)

            );
        },
        
    },
    methods: {
        capitalizeFirstLetter(string) {
            return (
                'ANALYTICS'
            );
        },
        findPersonById(id) {
            return this.itemsForPersonas.find(item => item._id === id);
        },
        editRow(data) {
            const persona = this.findPersonById(data.item._id);
            this.selectedPersona = persona;
            this.$bvModal.show('configureEditTraits');
        },
        removeRow(data) {
        },
        async getPersonas() {
        },
        async handlePersonasChange(value) {
            this.currentPageForPersonas = value;
            await this.getPersonas();
        },
        async handlePersonasPageSizeChange(size) {
            this.perPageForPersonas = size;
            this.currentPageForPersonas = 1;
            await this.getPersonas();
        },
        async sortPersonas() {
            this.currentPageForPersonas = 1;
            await this.getPersonas();
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
</style>
