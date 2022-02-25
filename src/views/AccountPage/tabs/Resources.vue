<template>
    <div class="resources">
        <b-card>
            <div class="d-flex align-items-center px-3 mb-3">
                <img src="@/assets/images/account/rockset-logo.png" />
                <a href="#">
                    <img
                        class="ml-3"
                        src="@/assets/icons/noun_Info.svg"
                    />
                </a>
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
    name: 'resources-tab',
    data: () => ({
        currentPage: 1,
        perPage: 5,
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' },
        ],
        field: [
            {
                key: 'collection',
                sortable: false,
                label: 'COLLECTION',
            },
            {
                key: 'documents',
                sortable: false,
                label: 'DOCUMENTS',
            },
            {
                key: 'total_bytes_ingested',
                sortable: false,
                label: 'TOTAL BYTES INGESTED',
            },
            {
                key: 'active_index_size',
                sortable: false,
                label: 'ACTIVE INDEX SIZE',
            },
            {
                key: 'last_updated',
                sortable: false,
                label: 'LAST UPDATED',
            },
            {
                key: 'last_queried',
                sortable: false,
                label: 'LAST QUERIED',
            },
        ],
        datatable: [
            {
                id: 0,
                collection: 'tracking',
                documents: '1,234',
                total_bytes_ingested: '29.9 KiB',
                active_index_size: '538.5 KiB',
                last_updated: '2 months ago',
                last_queried: '15-dec-2021 15:15:16',
            },
            {
                id: 1,
                collection: 'page views',
                documents: '123,456',
                total_bytes_ingested: '',
                active_index_size: '',
                last_updated: '',
                last_queried: '',
            },
        ],
    }),
    methods: {
        handleRowClick(item) {},
    },
};
</script>

<style></style>
