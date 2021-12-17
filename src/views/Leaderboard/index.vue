<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div class="leaderboards-wrapper" v-else>
            <div class="py-4">
                <h4 class="text-brand">Leaderboards</h4>
            </div>

            <div>
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
                                    @click="
                                        selectedOrderByOption = option.value
                                    "
                                    >{{ option.text }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                        <div class="d-flex align-items-center ml-auto">
                            <router-link :to="{ name: 'AddLeaderboard' }">
                                <div class="mr-5">
                                    <img
                                        src="../../assets/icons/OutlinePlusCircle.svg"
                                        alt=""
                                    />
                                    <span
                                        class="text-brand ml-2"
                                        style="text-decoration: underline"
                                        >Add Leaderboard</span
                                    >
                                </div>
                            </router-link>

                            <fa-icon
                                class="text-secondary"
                                icon="chevron-down"
                            />
                        </div>
                    </div>
                    <b-table
                        hover
                        id="leaderboards"
                        :fields="fieldsForLeaderboard"
                        :items="leaderboardsList"
                        :per-page="perPageForleaderboards"
                        :current-page="currentPageForleaderboards"
                        caption-top
                        responsive
                        head-variant="light"
                        @row-clicked="handleClickLeaderboardsTableRow"
                        ref="leaderboardstable"
                    >
                        <template v-slot:cell(name)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(type)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(program)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(primaryscoretype)="data">
                            <div class="text-center">
                                {{ data.value.count }}
                                <span
                                    v-if="data.value.status === 'up'"
                                    class="icon"
                                    ><fa-icon icon="arrow-up" class="mr-3"
                                /></span>
                                <span
                                    v-if="data.value.status === 'down'"
                                    class="icon"
                                    ><fa-icon icon="arrow-down" class="mr-3"
                                /></span>
                            </div>
                        </template>
                        <template v-slot:cell(secondaryscoretype)="data">
                            <div class="text-center">
                                {{ data.value.count }}
                                <span
                                    v-if="data.value.status === 'up'"
                                    class="icon"
                                    ><fa-icon icon="arrow-up" class="mr-3"
                                /></span>
                                <span
                                    v-if="data.value.status === 'down'"
                                    class="icon"
                                    ><fa-icon icon="arrow-down" class="mr-3"
                                /></span>
                            </div>
                        </template>
                        <template v-slot:cell(action)="data">
                            <div
                                class="d-flex align-items-center justify-content-end"
                            >
                                <a
                                    class="action-icon mr-2"
                                    @click="openLiveModal(data.index)"
                                >
                                    <img
                                        class="default"
                                        src="../../assets/icons/broadcast_default_icon.svg"
                                        alt=""
                                    />
                                    <img
                                        class="hover"
                                        src="../../assets/icons/broadcast_hover_icon.svg"
                                        alt=""
                                    />
                                    <img
                                        class="active"
                                        src="../../assets/icons/broadcast_active_icon.svg"
                                        alt=""
                                    />
                                </a>
                                <a
                                    class="action-icon mr-2"
                                    @click="editRow(data.index)"
                                >
                                    <img
                                        class="default"
                                        src="../../assets/icons/pencil_default_icon.svg"
                                        alt=""
                                    />
                                    <img
                                        class="hover"
                                        src="../../assets/icons/pencil_hover_icon.svg"
                                        alt=""
                                    />
                                    <img
                                        class="active"
                                        src="../../assets/icons/pencil_active_icon.svg"
                                        alt=""
                                    />
                                </a>
                                <a
                                    class="action-icon mr-2"
                                    @click="removeRow(data.index)"
                                >
                                    <img
                                        class="default"
                                        src="../../assets/icons/trash_default_icon.svg"
                                        alt=""
                                    />
                                    <img
                                        class="hover"
                                        src="../../assets/icons/trash_hover_icon.svg"
                                        alt=""
                                    />
                                    <img
                                        class="active"
                                        src="../../assets/icons/trash_active_icon.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </template>
                    </b-table>
                </b-card>
                <b-pagination
                    v-model="currentPageForleaderboards"
                    aria-controls="leaderboards"
                    align="right"
                    :total-rows="leaderboardsRows"
                    :per-page="perPageForleaderboards"
                ></b-pagination>
            </div>

            <div
                id="designOption"
                v-bind:class="{
                    hide: isShowDesignOptions === false,
                    show: isShowDesignOptions === true
                }"
            >
                <DesignOptions />
            </div>

            <LiveModal />
        </div>
    </div>
</template>

<script>
import DesignOptions from './components/DesignOptions.vue';
import LiveModal from './components/LiveModal.vue';
export default {
    name: 'leaderboard-page',
    components: {
        DesignOptions,
        LiveModal
    },
    data: () => ({
        loading: false,
        isShowDesignOptions: false,
        selectedOrderByOption: 'name',
        selectedLeaderboard: null,
        orderByOptions: [
            {
                value: 'Name',
                text: 'name'
            },
            {
                value: 'Type',
                text: 'type'
            },
            {
                value: 'Program',
                text: 'program'
            }
        ],
        fieldsForLeaderboard: [
            {
                key: 'name',
                sortable: false,
                label: 'NAME',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'type',
                sortable: false,
                label: 'TYPE',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'program',
                sortable: false,
                label: 'PROGRAM',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'primaryscoretype',
                sortable: false,
                label: 'PRIMARY SCORE TYPE',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'secondaryscoretype',
                sortable: false,
                label: 'SECONDARY SCORE TYPE',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        leaderboardsList: [
            {
                name: 'Friends',
                type: 'Referral',
                program: '',
                primaryscoretype: { count: 9, status: 'down' },
                secondaryscoretype: { count: 10, status: 'down' }
            },
            {
                name: 'Products',
                type: 'Quiz',
                program: 'Employee',
                primaryscoretype: { count: 15, status: 'up' },
                secondaryscoretype: { count: 5, status: 'up' }
            },
            {
                name: 'Points',
                type: 'Loyalty',
                program: 'JuiceBro Family',
                primaryscoretype: 0,
                secondaryscoretype: ''
            }
        ],
        perPageForleaderboards: 5,
        currentPageForleaderboards: 1
    }),
    computed: {
        leaderboardsRows() {
            return this.leaderboardsList.length;
        }
    },
    methods: {
        handleClickLeaderboardsTableRow(item) {
            for (var i = 0; i < this.leaderboardsList.length; i++) {
                this.leaderboardsList[i]._rowVariant = '';
            }
            item._rowVariant = 'active';

            this.isShowDesignOptions = true;
            this.$refs.leaderboardstable.refresh();
        },
        editRow(index) {
            this.selectedLeaderboard = this.leaderboardsList[index];
        },
        removeRow(index) {
            this.leaderboardsList.splice(index, 1);
        },
        openLiveModal(index) {
            this.selectedLeaderboard = this.leaderboardsList[index];
            this.$bvModal.show('live-design-modal');
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

.first-cell-overflow {
    padding-left: 27px;
}

.hide {
    display: none;
}

.show {
    display: block;
}

#leaderboards {
    span.icon {
        font-size: 13px;
        color: #4d4f5c;
    }
}

.table.b-table > tbody > .table-active {
    span.icon {
        color: #ffffff !important;
    }
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

::v-deep .leaderboards-wrapper {
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
