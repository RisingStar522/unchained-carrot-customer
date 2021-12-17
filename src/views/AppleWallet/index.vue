<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>

        <div class="apple-wallet" v-else>
            <div class="py-4">
                <h4 class="text-brand">Apple Wallet</h4>
            </div>

            <b-card>
                <div
                    class="d-flex align-items-center py-3"
                    style="padding-left: 40px; padding-right: 30px"
                >
                    <div class="d-flex align-items-center">
                        <span class="text-brand mr-3">Order by</span>
                        <b-dropdown
                            :text="selectedOrderByOption"
                            block
                            variant="outline-primary"
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="option in orderByOptions"
                                :key="option.value"
                                :value="option.value"
                                @click="selectedOrderByOption = option.value"
                                >{{ option.text }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <div class="d-flex align-items-center ml-auto">
                        <router-link :to="{ name: 'AddTemplate' }">
                            <div class="mr-5">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="24"
                                        height="24"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
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
                                    >Add Template</span
                                >
                            </div>
                        </router-link>

                        <fa-icon class="text-secondary" icon="chevron-down" />
                    </div>
                </div>
                <b-table
                    hover
                    id="apple-wallet"
                    :fields="fieldsForAppleWallet"
                    :items="itemsForAppleWallet"
                    :per-page="perPageForAppleWallet"
                    :current-page="currentPageForAppleWallet"
                    caption-top
                    responsive
                    head-variant="light"
                    @row-clicked="handleClickAppleWalletTableRow"
                    ref="applewallettable"
                >
                    <template v-slot:cell(name)="data">
                        <div class="first-cell-overflow">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(passStyle)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(defaultLanguage)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(issued)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(redeemed)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(action)="data">
                        <div
                            class="d-flex align-items-center justify-content-end"
                        >
                            <a class="action-icon mr-2">
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
                                                    style="fill:#4d505d"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill:#4d505d"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill:#4d505d"
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
                                                    style="fill:#f49848"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill:#f49848"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill:#f49848"
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
                                                    style="fill:#fff"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill:#fff"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill:#fff"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <a
                                class="action-icon mr-2"
                                @click="editRow(data.index)"
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
                                                style="fill:#4d505d;fill-rule:evenodd"
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
                                                style="fill:#f49848;fill-rule:evenodd"
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
                                                style="fill:#fff;fill-rule:evenodd"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <a
                                class="action-icon mr-2"
                                @click="removeRow(data.index)"
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
                                                style="fill:#4d505d"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill:#4d505d"
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
                                                style="fill:#f49848"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill:#f49848"
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
                                                style="fill:#fff"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill:#fff"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </template>
                </b-table>
            </b-card>
            <b-pagination
                v-model="currentPageForAppleWallet"
                aria-controls="apple-wallet"
                align="right"
                :total-rows="
                    itemsForAppleWallet ? itemsForAppleWallet.length : 0
                "
                :per-page="perPageForAppleWallet"
            ></b-pagination>
        </div>

        <div
            class="recent-issued"
            v-bind:class="{
                hide: isShowRecentIssuedTable === false,
                show: isShowRecentIssuedTable === true
            }"
        >
            <div class="py-4">
                <h4 class="text-brand">Recently Issued</h4>
            </div>

            <b-card>
                <b-table
                    hover
                    id="recent-issued"
                    :fields="fieldsForRecentIssued"
                    :items="itemsForRecentIssued"
                    :per-page="perPageForRecentIssued"
                    :current-page="currentPageForRecentIssued"
                    caption-top
                    responsive
                    head-variant="light"
                >
                    <template v-slot:cell(date)="data">
                        <div class="first-cell-overflow">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(firstName)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(lastName)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(email)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(loyaltyProgram)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(referralProgram)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(campaign)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                </b-table>
            </b-card>
            <b-pagination
                v-model="currentPageForRecentIssued"
                aria-controls="recent-issued"
                align="right"
                :total-rows="itemsForRecentIssued.length"
                :per-page="perPageForRecentIssued"
            ></b-pagination>
        </div>

        <div
            class="recent-redeemed"
            v-bind:class="{
                hide: isShowRecentRedeemedTable === false,
                show: isShowRecentRedeemedTable === true
            }"
        >
            <div class="py-4">
                <h4 class="text-brand">Recently Redeemed</h4>
            </div>

            <b-card>
                <b-table
                    hover
                    id="recent-redeemed"
                    :fields="fieldsForRecentIssued"
                    :items="itemsForRecentRedeemed"
                    :per-page="perPageForRecentRedeemed"
                    :current-page="currentPageForRecentRedeemed"
                    caption-top
                    responsive
                    head-variant="light"
                >
                    <template v-slot:cell(date)="data">
                        <div class="first-cell-overflow">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(firstName)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(lastName)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(email)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(loyaltyProgram)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(referralProgram)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(campaign)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                </b-table>
            </b-card>
            <b-pagination
                v-model="currentPageForRecentRedeemed"
                aria-controls="recent-redeemed"
                align="right"
                :total-rows="itemsForRecentRedeemed.length"
                :per-page="perPageForRecentRedeemed"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'apple-wallet-page',
    data: () => ({
        loading: false,
        selectedOrderByOption: 'Issued',
        selectedAppleWallet: null,
        orderByOptions: [
            {
                value: 'Issued',
                text: 'Issued'
            },
            {
                value: 'Name',
                text: 'Name'
            },
            {
                value: 'Type',
                text: 'Type'
            }
        ],
        isShowRecentIssuedTable: false,
        isShowRecentRedeemedTable: false,
        perPageForAppleWallet: 5,
        currentPageForAppleWallet: 1,
        fieldsForAppleWallet: [
            {
                key: 'name',
                sortable: false,
                label: 'TITLE',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'passStyle',
                sortable: false,
                label: 'TYPE',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'defaultLanguage',
                sortable: false,
                label: 'LANGUAGES',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'issued',
                sortable: false,
                label: 'ISSUED',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'redeemed',
                sortable: false,
                label: 'REDEEMED',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        perPageForRecentIssued: 5,
        perPageForRecentRedeemed: 5,
        currentPageForRecentIssued: 1,
        currentPageForRecentRedeemed: 1,
        fieldsForRecentIssued: [
            {
                key: 'date',
                sortable: false,
                label: 'DATE',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'firstName',
                sortable: false,
                label: 'FIRST NAME',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'lastName',
                sortable: false,
                label: 'LAST NAME',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'email',
                sortable: false,
                label: 'EMAIL',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'loyaltyProgram',
                sortable: false,
                label: 'LOYALTY PROGRAM',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'referralProgram',
                sortable: false,
                label: 'REFERRAL PROGRAM',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'campaign',
                sortable: false,
                label: 'CAMPAIGN',
                thStyle: { textAlign: 'center' }
            }
        ],
        itemsForRecentIssued: [
            {
                date: '31-Jan-21 10:25',
                firstName: 'Walter',
                lastName: 'Thoen',
                email: 'walter@flashboys.nl',
                loyaltyProgram: 'n/a',
                referralProgram: 'n/a',
                campaign: 'Try This'
            },
            {
                date: '31-Jan-21 09:36',
                firstName: 'Mark',
                lastName: 'Noorlander',
                email: 'mark@flashboys.nl',
                loyaltyProgram: 'n/a',
                referralProgram: 'n/a',
                campaign: 'Try This 2'
            }
        ],
        itemsForRecentRedeemed: [
            {
                date: '31-Jan-21 10:25',
                firstName: 'Walter',
                lastName: 'Thoen',
                email: 'walter@flashboys.nl',
                loyaltyProgram: 'n/a',
                referralProgram: 'n/a',
                campaign: 'Try This'
            }
        ]
    }),
    methods: {
        handleClickAppleWalletTableRow(item) {
            for (var i = 0; i < this.itemsForAppleWallet.length; i++) {
                this.itemsForAppleWallet[i]._rowVariant = '';
            }
            item._rowVariant = 'active';

            this.isShowRecentIssuedTable = true;
            this.isShowRecentRedeemedTable = true;
            this.$refs.applewallettable.refresh();
        }
    },
    async mounted() {
        this.loading = true;
        this.$store.dispatch('getAllPassTemplates').then(() => {
            this.loading = false;
        });
    },
    computed: {
        ...mapGetters(['getAllPassTemplates']),
        itemsForAppleWallet() {
            return JSON.parse(JSON.stringify(this.getAllPassTemplates))[0];
        }
    }
};
</script>
<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

.show {
    display: block;
}

.first-cell-overflow {
    padding-left: 27px;
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

::v-deep .apple-wallet {
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
}
</style>
