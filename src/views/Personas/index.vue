<template>
    <div class="content mt-5">
        <b-card>
            <!-- <div
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
            </div> -->

            <b-table
                hover
                id="traffic-routes"
                :fields="fieldsForBillings"
                :items="getAllPersonas"
                :per-page="perPageForPersonas"
                :current-page="currentPageForPersonas"
                caption-top
                responsive
                head-variant="light"
                ref="traffictable"
            >
                <template v-slot:cell(firstName)="data">
                    <div class="first-cell-overflow">
                        {{
                            data.item.personalData &&
                                data.item.personalData.firstName
                        }}
                    </div>
                </template>
                <template v-slot:cell(lastName)="data">
                    <div class="text-center">
                        {{
                            data.item.personalData &&
                                data.item.personalData.lastName
                        }}
                    </div>
                </template>
                <template v-slot:cell(email)="data">
                    <div class="text-center">
                        {{
                            data.item.personalData &&
                                data.item.personalData.email
                        }}
                    </div>
                </template>
                <template v-slot:cell(creationDate)="data">
                    <div class="text-center">
                        {{
                            data.item.lifeCycle &&
                                dayjs(data.item.lifeCycle.creationDate).format(
                                    'DD/MM/YYYY'
                                )
                        }}
                    </div>
                </template>
                <template v-slot:cell(active)="data">
                    <div class="text-center">
                        {{ data.item.lifeCycle && data.item.lifeCycle.active }}
                    </div>
                </template>
            </b-table>
        </b-card>

        <b-pagination
            v-model="currentPageForPersonas"
            aria-controls="user-personas"
            align="right"
            :total-rows="getAllPersonas ? getAllPersonas.length : 0"
            :per-page="perPageForPersonas"
        ></b-pagination>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'personas',
    data() {
        return {
            fieldsForBillings: [
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
                {
                    key: 'creationDate',
                    sortable: false,
                    label: 'CREATED DATE',
                    thStyle: { textAlign: 'center' }
                },
                {
                    key: 'active',
                    sortable: false,
                    label: 'ACTIVE',
                    thStyle: { textAlign: 'center' }
                }
            ],
            personaItems: [],
            perPageForPersonas: 5,
            currentPageForPersonas: 1
        };
    },
    computed: {
        ...mapGetters(['getAllPersonas'])
    },
    methods: {
        ...mapActions(['getUserProfilePersonas']),
        dayjs(...args) {
            return dayjs(...args);
        }
    },
    async mounted() {
        await this.getUserProfilePersonas();
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
