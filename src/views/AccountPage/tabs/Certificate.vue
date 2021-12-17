<template>
    <div class="certificate">
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
                id="email-builder"
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
                        <span
                            class="dot"
                            :class="{
                                active: data.value === 'Issued'
                            }"
                        ></span>
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(action)="data">
                    <div class="text-center">
                        <fa-icon
                            icon="pen"
                            @click="handleEdit(data.item)"
                            style="cursor: pointer;"
                        />
                        <fa-icon
                            icon="trash-alt"
                            class="ml-3"
                            @click="handleDelete(data.item)"
                            style="cursor: pointer;"
                        />
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

        <b-card v-if="isExpandInfo">
            <b-row>
                <b-col md="8">
                    <b-form>
                        <b-form-group
                            v-for="item in loopDetailData"
                            :key="item.id"
                        >
                            <b-row>
                                <b-col md="4">
                                    <label>{{ item.label }}</label>
                                </b-col>
                                <b-col md="8" v-if="item.type === 'input'">
                                    <b-form-input
                                        placeholder="Test"
                                        v-model="selectedData[item.key]"
                                    ></b-form-input>
                                </b-col>
                                <b-col md="8" v-if="item.type === 'table'">
                                    <b-table
                                        :fields="resourceRecordField"
                                        :items="selectedData[item.key]"
                                    />
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </b-form>
                </b-col>
                <b-col md="4">
                    <div
                        class="d-flex align-items-center justify-content-end"
                        style=" cursor: pointer;"
                        @click="handleClose"
                    >
                        <fa-icon icon="times-circle" class="text-primary" />
                        <p
                            class="mb-0 ml-2"
                            style="text-decoration: underline;"
                        >
                            Close
                        </p>
                    </div>
                </b-col>
            </b-row>
        </b-card>

        <delete-confirm-modal
            id="delete-certificate-confirm-modal"
            title="Delete Certificate?"
            subtitle="Write DELETE to permanently delete this certificate"
            @onSubmit="handleOnSubmitDelete"
        />
    </div>
</template>

<script>
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue';
export default {
    components: { DeleteConfirmModal },
    name: 'certificate-tab',
    data: () => ({
        resourceRecordField: [
            {
                key: 'host',
                sortable: false,
                label: 'HOST'
            },
            {
                key: 'type',
                sortable: false,
                label: 'TYPE'
            },
            {
                key: 'value',
                sortable: false,
                label: 'VALUE'
            }
        ],
        orderByOptions: [
            {
                value: 'domain',
                text: 'Domain'
            },
            {
                value: 'validationMethod',
                text: 'Validation Method'
            },
            {
                value: 'validationStatus',
                text: 'Validation Status'
            },
            {
                value: 'issuer',
                text: 'Issuer'
            },
            {
                value: 'issedAt',
                text: 'Issued At'
            },
            {
                value: 'notAfter',
                text: 'Not After'
            },
            {
                value: 'status',
                text: 'Status'
            }
        ],
        selectedOrderByOption: {
            value: 'domain',
            text: 'Domain'
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
                key: 'domain',
                sortable: false,
                label: 'DOMAIN'
            },
            {
                key: 'validationMethod',
                sortable: false,
                label: 'VALIDATION METHOD'
            },
            {
                key: 'validationStatus',
                sortable: false,
                label: 'VALIDATION STATUS'
            },
            {
                key: 'issuer',
                sortable: false,
                label: 'ISSUER'
            },
            {
                key: 'issuedAt',
                sortable: false,
                label: 'ISSUED AT'
            },
            {
                key: 'notAfter',
                sortable: false,
                label: 'NOT AFTER'
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS'
            },
            {
                key: 'action',
                label: ''
            }
        ],
        loopDetailData: [
            {
                id: 0,
                label: 'Domain',
                key: 'domain',
                type: 'input'
            },
            {
                id: 1,
                label: 'Validation Method',
                key: 'validationMethod',
                type: 'input'
            },
            {
                id: 2,
                label: 'Validation Status',
                key: 'validationStatus',
                type: 'input'
            },
            {
                id: 3,
                label: 'Resource Record',
                key: 'resourceRecord',
                type: 'table'
            },
            {
                id: 4,
                label: 'Issuer',
                key: 'issuer',
                type: 'input'
            },
            {
                id: 5,
                label: 'Issued At',
                key: 'issuedAt',
                type: 'input'
            },
            {
                id: 6,
                label: 'Not Before',
                key: 'notBefore',
                type: 'input'
            },
            {
                id: 7,
                label: 'Not After',
                key: 'notAfter',
                type: 'input'
            },
            {
                id: 8,
                label: 'Status',
                key: 'status',
                type: 'input'
            }
        ],
        datatable: [
            {
                id: 0,
                domain: 'host.com',
                validationMethod: 'DNS',
                validationStatus: 'SUCCESS',
                resourceRecord: [
                    {
                        id: 'resource1',
                        host: '@',
                        type: 'CNAME',
                        value: '21155.aws.com'
                    },
                    {
                        id: 'resource2',
                        host: '@',
                        type: 'CNAME',
                        value: '21155.aws.com'
                    }
                ],
                issuer: 'AWS',
                issuedAt: '15-Nov-21',
                notBefore: '14-Nov-22',
                notAfter: '14-Nov-22',
                status: 'Issued'
            },
            {
                id: 1,
                domain: 'host.com',
                validationMethod: 'DNS',
                validationStatus: 'SUCCESS',
                resourceRecord: [
                    {
                        id: 'resource1',
                        host: '@',
                        type: 'CNAME',
                        value: '21155.aws.com'
                    },
                    {
                        id: 'resource2',
                        host: '@',
                        type: 'CNAME',
                        value: '21155.aws.com'
                    }
                ],
                issuer: 'AWS',
                issuedAt: '15-Nov-21',
                notBefore: '14-Nov-22',
                notAfter: '14-Nov-22',
                status: 'Issued'
            },
            {
                id: 2,
                domain: 'host.com',
                validationMethod: 'DNS',
                validationStatus: 'SUCCESS',
                resourceRecord: [],
                issuer: 'AWS',
                issuedAt: '15-Nov-21',
                notBefore: '14-Nov-22',
                notAfter: '14-Nov-22',
                status: 'Issued'
            },
            {
                id: 3,
                domain: 'host.com',
                validationMethod: 'DNS',
                validationStatus: 'SUCCESS',
                resourceRecord: [],
                issuer: 'AWS',
                issuedAt: '15-Nov-21',
                notBefore: '14-Nov-22',
                notAfter: '14-Nov-22',
                status: 'Issued'
            }
        ],
        isExpandInfo: false,
        selectedData: null
    }),
    methods: {
        handleRowClick(item) {
            this.selectedData = item;
            this.isExpandInfo = true;
        },
        handleEdit(item) {
            console.log('Edit', item);
        },
        handleDelete(item) {
            this.$bvModal.show('delete-certificate-confirm-modal');
            this.selectedData = item;
        },
        handleClose() {
            this.isExpandInfo = false;
        },
        handleOnSubmitDelete() {
            console.log('DELETE IN HERE');
        }
    }
};
</script>

<style lang="scss" scoped>
.dot {
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 0px;
    &.active {
        background-color: green;
    }
}
</style>
