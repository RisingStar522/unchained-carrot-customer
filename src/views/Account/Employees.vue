<template>
    <div class="content mt-5">
        <b-card>
            <div
                class="d-flex align-items-center py-3"
                style="padding-left: 40px; padding-right: 30px"
            >
                <div class="d-flex align-items-center">
                    <div>
                        <b-input-group>
                            <b-form-input
                                class="LoginInput"
                                size="lg"
                                placeholder="Search by name..."
                                @focus="blur"
                                ref="input"
                            >
                            </b-form-input>
                            <b-input-group-append>
                                <span class="input-group-text"
                                    ><b-icon-search class="icon"></b-icon-search
                                ></span>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </div>

                <div class="d-flex align-items-center ml-auto">
                    <a href="#" @click="openAddEmployeeModal">
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
                                >Add Employee</span
                            >
                        </div>
                    </a>

                    <fa-icon class="text-secondary" icon="chevron-down" />
                </div>
            </div>

            <b-table
                hover
                id="traffic-routes"
                :fields="fieldsForEmployees"
                :items="itemsForEmployees"
                :per-page="perPageForEmployees"
                :current-page="currentPageForEmployees"
                caption-top
                responsive
                head-variant="light"
                ref="traffictable"
            >
                <template v-slot:cell(firstName)="data">
                    <div class="first-cell-overflow">
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

                <template v-slot:cell(action)="">
                    <div class="d-flex align-items-center justify-content-end">
                        <a class="action-icon mr-2">
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

                        <a class="action-icon mr-2">
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
            aria-controls="traffic-routes"
            align="right"
            :total-rows="1"
            :per-page="perPageForEmployees"
        ></b-pagination>

        <add-employee-modal></add-employee-modal>
    </div>
</template>

<script>
import AddEmployeeModal from './AddEmployeeModal.vue';
export default {
    name: 'employees',
    components: { AddEmployeeModal },
    data() {
        return {
            fieldsForEmployees: [
                {
                    key: 'firstName',
                    sortable: false,
                    label: 'FIRST NAME',
                    thStyle: { paddingLeft: '40px' }
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
                { key: 'action', label: '' }
            ],
            itemsForEmployees: [
                {
                    firstName: 'Emmanuel',
                    lastName: 'Raymond',
                    email: 'emma@ray.com'
                }
            ],
            perPageForEmployees: 5,
            currentPageForEmployees: 1
        };
    },
    methods: {
        blur() {
            // this.$refs.input.focus();
        },
        openAddEmployeeModal() {
            this.$bvModal.show('add-employee-modal');
        }
    }
};
</script>

<style lang="scss" scoped>
.input-group-text {
    width: 48px;
    // border-right: none;
    border-left: none;
    background-color: #ffffff;
}
.icon {
    display: inline-block;
    width: 100%;
}
.LoginInput {
    border-right: none;
    box-shadow: none;
}

input.LoginInput:focus {
    outline: none;
    box-shadow: none;
}

input.form-control:focus,
input[type='text']:focus {
    box-shadow: inset 0 -1px 0 #ddd;
}

.disable--pointer {
    cursor: not-allowed !important;
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
    .daterangepicker {
        .calendars {
            flex-wrap: nowrap;
        }
    }
}
</style>
