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
import { orderByOptions, field } from './data/DataExport.data';
export default {
    name: 'data-export-tab',
    data: () => ({
        orderByOptions,
        field,
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
        datatable: []
    }),
    methods: {
        handleRowClick(item) {},
        async getExports() {
            try {
                const response = await this.$store.dispatch('getExport');
                this.datatable = response.results;
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        try {
            await this.getExports();
        } catch (err) {
            console.log(err);
        }
    }
};
</script>

<style></style>
