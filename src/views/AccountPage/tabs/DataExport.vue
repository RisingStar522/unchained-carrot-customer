<template>
    <div class="employee">
        <b-card>
            <div class="d-flex align-items-center p-3">
                <div class="d-flex align-items-center">
                    <span class="text-brand mr-3">Order by</span>
                    <b-dropdown
                        :text="selectedOrderByOption.text"
                        block
                        variant="outline-primary"
                        menu-class="w-100"
                    >
                        <b-dropdown-item
                            v-for="option in orderByOptions"
                            :key="option.value"
                            :value="option.value"
                            @click="selectedOrderByOption = option"
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
                                >Download csv</span
                            >
                        </div>
                    </router-link>
                </div>
            </div>
            <b-table
                hover
                :fields="field"
                :items="datatable"
                :per-page="perPage"
                :current-page="currentPage"
                caption-top
                responsive
                head-variant="light"
                @row-clicked="handleRowClick"
            >
                <template v-slot:cell(status)="data">
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
                        v-model="perPage"
                        :options="rowsPerPageOptions"
                        style="width: 80px; height: 35px"
                    >
                    </b-form-select>
                </div>

                <b-pagination
                    v-model="currentPage"
                    aria-controls="email-templates"
                    align="right"
                    :total-rows="datatable ? datatable.length : 0"
                    :per-page="perPage"
                ></b-pagination>
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'data-export-tab',
    data: () => ({
        orderByOptions: [
            {
                value: 'dataSource',
                text: 'Data Source'
            },
            {
                value: 'dataSet',
                text: 'Data Set'
            },
            {
                value: 'fileType',
                text: 'File Type'
            },
            {
                value: 'ipAddress',
                text: 'IP Address'
            },
            {
                value: 'emailAddress',
                text: 'Email Address'
            },
            {
                value: 'requestDate',
                text: 'Request Date'
            },
            {
                value: 'status',
                text: 'Status'
            }
        ],
        selectedOrderByOption: {
            value: 'dataSource',
            text: 'DATA SOURCE'
        },
        currentPage: 1,
        perPage: 5,
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        field: [
            {
                key: 'dataSource',
                sortable: false,
                label: 'DATA SOURCE'
            },
            {
                key: 'dataSet',
                sortable: false,
                label: 'DATA SET'
            },
            {
                key: 'fileType',
                sortable: false,
                label: 'FILE TYPE'
            },
            {
                key: 'ipAddress',
                sortable: false,
                label: 'IP ADDRESS'
            },
            {
                key: 'emailAddress',
                sortable: false,
                label: 'EMAIL ADDRESS'
            },
            {
                key: 'requestDate',
                sortable: false,
                label: 'REQUEST DATE'
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS'
            }
        ],
        datatable: [
            {
                id: 0,
                dataSource: 'test',
                dataSet: 'test',
                fileType: 'test',
                ipAddress: '123.123.123.123',
                emailAddress: 'test@gmail.com',
                requestDate: '12/12/2021',
                status: 'Issued'
            },
            {
                id: 1,
                dataSource: 'test',
                dataSet: 'test',
                fileType: 'test',
                ipAddress: '123.123.123.123',
                emailAddress: 'test@gmail.com',
                requestDate: '12/12/2021',
                status: 'Issued'
            },
            {
                id: 2,
                dataSource: 'test',
                dataSet: 'test',
                fileType: 'test',
                ipAddress: '123.123.123.123',
                emailAddress: 'test@gmail.com',
                requestDate: '12/12/2021',
                status: 'Issued'
            },
            {
                id: 3,
                dataSource: 'test',
                dataSet: 'test',
                fileType: 'test',
                ipAddress: '123.123.123.123',
                emailAddress: 'test@gmail.com',
                requestDate: '12/12/2021',
                status: 'Issued'
            }
        ]
    }),
    methods: {
        handleRowClick(item) {
            console.log(item);
        }
    }
};
</script>

<style></style>
