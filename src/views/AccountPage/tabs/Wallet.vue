<template>
    <div class="wallet">
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
                    <div
                        class="d-flex align-items-center mr-5"
                        style="cursor: pointer"
                        @click="isAddWalletModal = true"
                    >
                        <span style="font-size: 25px">
                            <fa-icon icon="plus-circle" class="text-primary" />
                        </span>
                        <span
                            class="text-brand ml-2"
                            style="text-decoration: underline"
                            >Add Wallet</span
                        >
                    </div>
                </div>
            </div>
            <b-table
                hover
                :fields="walletField"
                :items="customerWallets"
                :per-page="perPage"
                :current-page="currentPage"
                caption-top
                responsive
                head-variant="light"
                @row-clicked="handleRowClick"
            >
                <template v-slot:cell(usage)="data">
                    <div>
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(KeyId)="data">
                    <div>
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(address)="data">
                    <div>
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(nonces.onChain)="data">
                    <div>
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(nonces.inCache)="data">
                    <div>
                        {{ data.value }}
                    </div>
                </template>
                <template v-slot:cell(action)="data">
                    <div class="d-flex align-items-center justify-content-end">
                        <a
                            class="action-icon mr-3"
                            @click="openDepositTable(data.item)"
                            data-toggle="tooltip"
                            title="Deposit"
                        >
                            <img
                                class="default"
                                :src="
                                    require('@/assets/icons/account/deposit_default_icon.svg')
                                "
                            />
                            <img
                                class="hover"
                                :src="
                                    require('@/assets/icons/account/deposit_hover_icon.svg')
                                "
                            />
                            <img
                                class="active"
                                :src="
                                    require('@/assets/icons/account/deposit_hover_icon.svg')
                                "
                            />
                        </a>
                        <a
                            class="action-icon"
                            @click="openWithdrawalTable(data.item)"
                            data-toggle="tooltip"
                            title="Withdrawal"
                        >
                            <img
                                class="default"
                                :src="
                                    require('@/assets/icons/account/withdrawal_default_icon.svg')
                                "
                            />
                            <img
                                class="hover"
                                :src="
                                    require('@/assets/icons/account/withdrawal_hover_icon.svg')
                                "
                            />
                            <img
                                class="active"
                                :src="
                                    require('@/assets/icons/account/withdrawal_hover_icon.svg')
                                "
                            />
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
                    :total-rows="
                        customerWallets && customerWallets.length > 0
                            ? customerWallets.length
                            : 0
                    "
                    :per-page="perPage"
                ></b-pagination>
            </div>
        </b-card>

        <div v-if="isShowDepositTable">
            <div class="d-flex align-items-center">
                <h4 class="text-brand mr-3 mb-0">Payments to</h4>
                <img class="ml-3" src="@/assets/icons/noun_Info.svg" />
            </div>

            <b-card>
                <div class="d-flex align-items-center p-3">
                    <div class="d-flex align-items-center">
                        <span class="text-brand mr-3">Order by</span>
                        <b-dropdown
                            :text="selectedOrderByOptionPaymentTo.text"
                            block
                            variant="outline-primary"
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="option in orderByPaymentToOptions"
                                :key="option.value"
                                :value="option.value"
                                @click="selectedOrderByOptionPaymentTo = option"
                                >{{ option.text }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <div class="d-flex align-items-center ml-3">
                        <span class="text-brand mr-3"
                            ><fa-icon icon="filter"></fa-icon
                        ></span>
                        <b-dropdown
                            :text="selectedFilterOrderByOptionPaymentTo.text"
                            block
                            variant="outline-primary"
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="option in filterByPaymentToOptions"
                                :key="option.value"
                                :value="option.value"
                                @click="
                                    selectedFilterOrderByOptionPaymentTo =
                                        option
                                "
                                >{{ option.text }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <div class="d-flex align-items-center ml-auto">
                        <div class="d-flex align-items-center">
                            <b-form-checkbox-group
                                id="checkbox-group-2"
                                v-model="selectedBoxPaymentTo"
                                :options="optionsBoxPaymentTo"
                            ></b-form-checkbox-group>
                        </div>
                    </div>
                </div>
                <b-table
                    hover
                    :fields="depositField"
                    :items="customerDeposits"
                    caption-top
                    responsive
                    head-variant="light"
                    @row-clicked="handleRowClick"
                >
                    <template v-slot:cell(action)="data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-end
                            "
                        >
                            <a
                                class="action-icon mr-3"
                                @click="
                                    handleOpenEventModal(data.item, 'paymentTo')
                                "
                                data-toggle="tooltip"
                                title="Deposit"
                            >
                                <fa-icon icon="bolt" />
                            </a>
                            <a
                                class="action-icon"
                                @click="() => {}"
                                data-toggle="tooltip"
                                title="Withdrawal"
                            >
                                <fa-icon icon="search" />
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
                            v-model="perPageForDeposits"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                            @change="handleChangeDepositsPageSize($event)"
                        >
                        </b-form-select>
                    </div>

                    <b-pagination
                        v-model="currentDepositsPage"
                        aria-controls="payments-to"
                        align="right"
                        :total-rows="
                            customerDeposits && customerDeposits.length > 0
                                ? customerDeposits.length
                                : 0
                        "
                        :per-page="perPageForDeposits"
                        @change="handleChangeDepositsPage"
                    ></b-pagination>
                </div>
            </b-card>
        </div>
        <div v-if="isShowWithdrawalTable">
            <div class="d-flex align-items-center">
                <h4 class="text-brand mr-3 mb-0">Payouts from</h4>
                <img class="ml-3" src="@/assets/icons/noun_Info.svg" />
            </div>

            <b-card>
                <div class="d-flex align-items-center p-3">
                    <div class="d-flex align-items-center">
                        <span class="text-brand mr-3">Order by</span>
                        <b-dropdown
                            :text="selectedOrderByOptionPaymentFrom.text"
                            block
                            variant="outline-primary"
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="option in orderByPaymentFromOptions"
                                :key="option.value"
                                :value="option.value"
                                @click="
                                    selectedOrderByOptionPaymentFrom = option
                                "
                                >{{ option.text }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <div class="d-flex align-items-center ml-3">
                        <span class="text-brand mr-3"
                            ><fa-icon icon="filter"></fa-icon
                        ></span>
                        <b-dropdown
                            :text="selectedFilterOrderByOptionPaymentFrom.text"
                            block
                            variant="outline-primary"
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="option in filterByPaymentFromOptions"
                                :key="option.value"
                                :value="option.value"
                                @click="
                                    selectedFilterOrderByOptionPaymentFrom =
                                        option
                                "
                                >{{ option.text }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <div class="d-flex align-items-center ml-auto">
                        <div class="d-flex align-items-center">
                            <b-form-checkbox-group
                                id="checkbox-group-2"
                                v-model="selectedBoxPaymentFrom"
                                :options="optionsBoxPaymentFrom"
                            ></b-form-checkbox-group>
                        </div>
                    </div>
                </div>
                <b-table
                    hover
                    :fields="withdrawalField"
                    :items="customerWithdrawals"
                    caption-top
                    responsive
                    head-variant="light"
                    @row-clicked="handleRowClick"
                >
                    <template v-slot:cell(action)="data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-end
                            "
                        >
                            <a
                                class="action-icon mr-3"
                                @click="
                                    handleOpenEventModal(
                                        data.item,
                                        'paymentFrom'
                                    )
                                "
                                data-toggle="tooltip"
                                title="Deposit"
                            >
                                <fa-icon icon="bolt" />
                            </a>
                            <a
                                class="action-icon"
                                @click="() => {}"
                                data-toggle="tooltip"
                                title="Withdrawal"
                            >
                                <fa-icon icon="search" />
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
                            v-model="perPageForWithdrawals"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                            @change="handleChangeWithdrawalsPageSize($event)"
                        >
                        </b-form-select>
                    </div>

                    <b-pagination
                        v-model="currentWithdrawalsPage"
                        aria-controls="payments-to"
                        align="right"
                        :total-rows="
                            customerWithdrawals && customerWithdrawals.length > 0
                                ? customerWithdrawals.length
                                : 0
                        "
                        :per-page="perPageForWithdrawals"
                        @change="handleChangeWithdrawalsPage"
                    ></b-pagination>
                </div>
            </b-card>
        </div>

        <div v-if="isExpandMoreInfo">
            <div class="d-flex align-items-center mb-4">
                <h4 class="text-brand mr-3 mb-0">Balance</h4>
                <a href="#">
                    <img src="../../../assets/icons/noun_Info.svg" />
                </a>
            </div>

            <b-table
                :fields="fieldMoreInfo"
                :items="itemMoreInfo"
                style="background-color: #ffffff; width: 400px"
            ></b-table>
        </div>

        <!-- Modal -->
        <b-modal
            v-model="isAddWalletModal"
            id="template-modal"
            hide-footer
            centered
            title="Add Wallet"
            hide-backdrop
            body-class="pt-0"
            header-class="custom-modal-header"
        >
            <p>Create a Hot Wallet that will be used for:</p>
            <b-form @submit="handleCreateWallet" novalidate>
                <b-form-group>
                    <b-form-select
                        v-model="selectedHotWallet"
                        :options="walletOptions"
                        class="mb-5"
                    ></b-form-select>
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-between
                            mt-5
                        "
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
                            >Add Wallet</b-btn
                        >
                    </div>
                </b-form-group>
            </b-form>
        </b-modal>

        <!-- Modal -->
        <b-modal
            v-model="isEventModal"
            id="event-modal"
            hide-footer
            centered
            title="Event"
            hide-backdrop
            body-class="pt-0"
            dialog-class="eventModal"
            header-class="custom-modal-header"
        >
            <p>
                This is the custom data that will be included in each deposit
                event
            </p>
            <b-button-group class="content__contentDetail-buttonGroup mt-4">
                <b-button
                    v-for="button in EVENT_MENU"
                    :key="button.id"
                    squared
                    class="content__contentDetail-buttonGroup-button px-4 py-3"
                    variant="outline"
                    :class="{ active: button.isActive }"
                    @click="handleChangeTab(button.id)"
                    >{{ button.title }}</b-button
                >
            </b-button-group>
            <b-table
                hover
                :fields="eventField"
                :items="customerEvents"
                caption-top
                responsive
                head-variant="light"
            ></b-table>
        </b-modal>
    </div>
</template>

<script>
import {
    depositField,
    withdrawalField,
    orderByPaymentToOptions,
    orderByPaymentFromOptions,
    orderByOptions,
    walletField,
    optionsBoxPayment,
    filterByPaymentToOptions,
    filterByPaymentFromOptions,
    eventField,
    EVENT_MENU,
    EVENT_TYPE,
} from './data/Wallet.data';
import { mapGetters } from 'vuex';

export default {
    name: 'wallet-tab',
    components: {
        WalletDepositTable,
        WalletWithdrawalTable,
    },
    data: () => ({
        selectedBoxPaymentTo: [], // Must be an array reference!
        selectedBoxPaymentFrom: [], // Must be an array reference!
        optionsBoxPaymentTo: optionsBoxPayment,
        optionsBoxPaymentFrom: optionsBoxPayment,
        filterByPaymentToOptions,
        filterByPaymentFromOptions,
        EVENT_MENU,
        EVENT_TYPE,
        selectedEventMenu: EVENT_TYPE.CONFIRMED,
        selectedFilterOrderByOptionPaymentTo: {
            value: 'to',
            text: 'FROM',
        },
        selectedFilterOrderByOptionPaymentFrom: {
            value: 'from',
            text: 'FROM',
        },
        isEventModal: false,
        walletField,
        depositField,
        withdrawalField,
        orderByPaymentToOptions,
        orderByPaymentFromOptions,
        orderByOptions,
        currentPage: 1,
        currentDepositsPage: 1,
        currentWithdrawalsPage: 1,
        isExpandMoreInfo: false,
        isAddWalletModal: false,
        perPage: 5,
        perPageForDeposits: 5,
        perPageForWithdrawals: 5,
        selectedHotWallet: 'DEPOSIT_ONLY',
        walletOptions: [{ value: 'DEPOSIT_ONLY', text: 'Deposit Only' }],
        fieldMoreInfo: [
            {
                key: 'symbol',
                sortable: false,
                label: 'SYMBOL',
            },
            {
                key: 'balance',
                sortable: false,
                label: 'BALANCE',
            },
        ],
        itemMoreInfo: [
            {
                id: 0,
                symbol: 'BNB',
                balance: '0.2578',
            },
            {
                id: 1,
                symbol: '$ QUIZ',
                balance: '1.3546',
            },
            {
                id: 2,
                symbol: 'PRT',
                balance: '149764645',
            },
        ],
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' },
        ],

        selectedOrderByOption: {
            value: 'dataSource',
            text: 'DATA SOURCE',
        },
        selectedOrderByOptionPaymentTo: {
            value: 'to',
            text: 'To',
        },
        selectedOrderByOptionPaymentFrom: {
            value: 'from',
            text: 'FROM',
        },
        isShowDepositTable: false,
        isShowWithdrawalTable: false,
        eventField
    }),
    methods: {
        handleRowClick(item) {
            this.isExpandMoreInfo = !this.isExpandMoreInfo;
        },
        onDiscardChanges() {
            this.isAddWalletModal = false;
        },
        async handleCreateWallet(e) {
            e.preventDefault();
            await this.$store
                .dispatch('createCustomerWallet', {
                    usage: this.selectedHotWallet,
                })
                .then((data) => {
                    if (data.result && data.result.KeyId) {
                        this.isAddWalletModal = false;
                    }
                });
        },
        async openWithdrawalTable(item) {
            this.isShowWithdrawalTable = true;
            await this.getCustomerWithdrawals();
        },
        async openDepositTable(item) {
            this.isShowDepositTable = true;
            await this.getCustomerDeposits();
        },
        async handleOpenEventModal(data, type) {
            this.isEventModal = true;
            await this.getCustomerEvents();
        },
        handleChangeTab(id) {
            this.selectedEventMenu = id;
            this.EVENT_MENU = this.EVENT_MENU.map((item) => {
                if (item.id === id) {
                    item.isActive = true;
                } else item.isActive = false;

                return item;
            });
        },
        async getCustomerDeposits() {
            await this.$store.dispatch('getCustomerDeposits', {
                sort_by: this.selectedOrderByOptionPaymentTo.value,
                limit: this.perPageForDeposits,
                offset:
                    (this.currentDepositsPage - 1) * this.perPageForDeposits,
                filter: '',
            });
        },
        async handleChangeDepositsPageSize(size) {
            this.perPageForDeposits = size;
            this.currentDepositsPage = 1;
            await this.getCustomerDeposits();
        },
        async handleChangeDepositsPage(value) {
            this.currentDepositsPage = value;
            await this.getCustomerDeposits();
        },
        async getCustomerWithdrawals() {
            await this.$store.dispatch('getCustomerWithdrawals', {
                sort_by: this.selectedOrderByOptionPaymentFrom.value,
                limit: this.perPageForWithdrawals,
                offset:
                    (this.currentWithdrawalsPage - 1) *
                    this.perPageForWithdrawals,
                filter: '',
            });
        },
        async handleChangeWithdrawalsPageSize(size) {
            this.perPageForWithdrawals = size;
            this.currentWithdrawalsPage = 1;
            await this.getCustomerWithdrawals();
        },
        async handleChangeWithdrawalsPage(value) {
            this.currentWithdrawalsPage = value;
            await this.getCustomerWithdrawals();
        },
        async getCustomerEvents() {
            await this.$store.dispatch('getCustomerEvents');
        },
    },
    created() {
        this.$store.dispatch('getCustomerWallets');
    },
    computed: {
        ...mapGetters(['customerWallets', 'customerDeposits', 'customerWithdrawals', 'customerEvents']),
    },
};
</script>

<style lang="scss" scoped>
.eventModal {
    background-color: #f0f0f6;
}
.content {
    &__contentDetail {
        &-buttonGroup {
            &-button {
                &.active {
                    background-color: #f0f0f6;
                    font-weight: 700;
                }
            }
        }
    }
}
table {
    tbody {
        tr {
            .action-icon {
                cursor: pointer;

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
    .custom-modal-header {
        padding-bottom: 10px;
        .modal-title {
            color: #2f337f;
            font-weight: 800;
            font-size: 22px;
        }
    }
}
</style>
