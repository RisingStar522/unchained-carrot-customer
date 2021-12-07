<template>
    <div class="content">
        <!-- programs -->
        <div class="py-4">
            <h4 class="text-brand">Loyalty Programs</h4>
        </div>
        <div class="table-wrapper">
            <div class="table-preheader">
                <div />
                <div>
                    <b-button
                        class="transparent-button"
                        variant="link"
                        :to="{ name: 'LoyaltyProgramsAddProgram' }"
                    >
                        <span class="btn-icon btn-outline">
                            <fa-icon
                                class="addIcon"
                                icon="plus-circle"
                            /> </span
                        >Add program
                    </b-button>
                </div>
            </div>
            <b-table
                :items="loyaltyPrograms"
                :fields="fields"
                select-mode="single"
                selectable
                @row-selected="onRowSelected"
                empty-text="You have no Loyalty Programs yet"
                show-empty
            >
                <!-- Manually create cell for actions -->
                <template #cell(actions)="row">
                    <b-button class="table-action">
                        <DashboardIcon />
                    </b-button>
                    <b-button
                        class="table-action"
                        :to="{
                            name: 'LoyaltyProgramsEditProgram',
                            params: { id: row.item._id }
                        }"
                    >
                        <PencilIcon />
                    </b-button>
                    <b-button
                        class="table-action"
                        @click="openDeleteProgram(row)"
                    >
                        <TrashIcon />
                    </b-button>
                </template>
            </b-table>
        </div>
        <div class="clearfix">
            <b-pagination
                v-model="currentPage"
                :total-rows="loyaltyProgramsPagination.total"
                :per-page="3"
                first-number
                last-number
            ></b-pagination>
        </div>
        <!-- members -->
        <template v-if="selectedProgram !== null">
            <div class="py-4">
                <h4 class="text-brand">Members</h4>
            </div>
            <div class="table-wrapper">
                <div class="table-preheader">
                    <div>
                        <b-container
                            fluid
                            class="left-part"
                            style="min-width: 550px;"
                        >
                            <b-row>
                                <b-col sm="2" class="no-left-padding">
                                    <h5>Order&nbsp;by</h5>
                                </b-col>
                                <b-col sm="5">
                                    <b-form-select
                                        v-model="orderSelected"
                                        :options="orderOptions"
                                    >
                                    </b-form-select>
                                </b-col>
                                <b-col sm="5">
                                    <b-form-checkbox
                                        id="checkbox-1"
                                        name="checkbox-1"
                                        value="accepted"
                                        unchecked-value="not_accepted"
                                    >
                                        Include inactive
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                    <div>
                        <b-button
                            class="transparent-button"
                            variant="link"
                            :to="{
                                name: 'LoyaltyProgramsMemberAdd',
                                params: { programId: selectedProgram }
                            }"
                        >
                            <span class="btn-icon btn-outline">
                                <fa-icon
                                    class="addIcon"
                                    icon="plus-circle"
                                /> </span
                            >Add member
                        </b-button>
                    </div>
                </div>
                <b-table
                    :items="loyaltyProgramMembers"
                    :fields="memberFields"
                    select-mode="single"
                    selectable
                    empty-text="There are no members for selected loyalty program"
                    show-empty
                >
                    <template #cell(status)="row">
                        <span
                            class="status-circle"
                            :class="row.value | statusClass"
                        ></span>
                        {{ row.value }}
                    </template>
                    <!-- Manually create cell for actions -->
                    <template #cell(actions)="row">
                        <b-button
                            class="table-action"
                            :to="{
                                name: 'LoyaltyProgramsMemberEdit',
                                params: { programId: row.item.memberId }
                            }"
                        >
                            <PencilIcon />
                        </b-button>
                        <b-button
                            class="table-action"
                            @click="openDeactivateMember()"
                        >
                            <TrashIcon />
                        </b-button>
                    </template>
                </b-table>
            </div>
            <div class="clearfix">
                <b-pagination
                    v-model="currentMemberPage"
                    :total-rows="loyaltyProgramMembersPagination.total"
                    :per-page="3"
                    first-number
                    last-number
                ></b-pagination>
            </div>
        </template>
        <!-- delete modal -->
        <modal-deactivate-loyalty-program
            :program="programForDeactivation"
            @deleted="updateProgramsList"
        />
        <!-- delete member modal -->
        <b-modal
            id="deactivate-member"
            centered
            title="Set Mark Noorlander as inactive?"
            hide-footer
        >
            <b-container fluid class="form_numeric_tab-form hidden-edit">
                <b-row class="center-flex">
                    <b-button variant="primary" class="min-width-button">
                        Set inactive
                    </b-button>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
import { DateTime } from 'luxon';
// Import icons for including as inline svg
import TrashIcon from '@/assets/icons/emailtemplates/TrashIcon.svg?raw';
import DashboardIcon from '@/assets/icons/emailtemplates/DashboardIcon.svg?raw';
import PencilIcon from '@/assets/icons/emailtemplates/PencilIcon.svg?raw';
// import mapGetters for data
import { mapGetters } from 'vuex';
import ModalDeactivateLoyaltyProgram from '@/components/LoyaltyPrograms/ModalDeactivateLoyaltyProgram';
// test
// import LoyaltyProgramsAPI from '@/api/LoyaltyProgramsAPI';

export default {
    name: 'LoyaltyProgramsPage',
    components: {
        TrashIcon,
        DashboardIcon,
        PencilIcon,
        // modals
        ModalDeactivateLoyaltyProgram
    },
    created() {
        this.updateProgramsList();
    },
    data() {
        return {
            // object to send to deactivation modal component
            selectedProgram: null,
            programForDeactivation: {},
            orderSelected: 'name',
            orderOptions: [
                { value: 'name', text: 'Name' },
                { value: 'startdate', text: 'Start Date' },
                { value: 'expdate', text: 'Expiration Date' }
            ],
            currentPage: 1,
            currentMemberPage: 1,
            fields: [
                {
                    key: 'displayName',
                    label: 'Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'startDate',
                    label: 'Start date',
                    sortable: false,
                    sortDirection: 'desc',
                    formatter: (value, key, item) => {
                        if (value === null) return '-';
                        const date = DateTime.fromISO(value);
                        return date.toFormat('dd MMM yyyy');
                        // return value.toFormat('dd MMM yyyy');
                    }
                },
                {
                    key: 'expirationDate',
                    label: 'Expiration date',
                    sortable: false,
                    sortDirection: 'desc',
                    formatter: (value, key, item) => {
                        if (value === null) return '-';
                        const date = DateTime.fromISO(value);
                        return date.toFormat('dd MMM yyyy');
                    }
                },
                { key: 'actions', label: 'Actions', thClass: 'th-actions' }
            ],
            memberFields: [
                {
                    key: 'displayName',
                    label: 'Display Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'email',
                    label: 'Email',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'startdate',
                    label: 'Start date',
                    sortable: false,
                    sortDirection: 'desc',
                    formatter: (value, key, item) => {
                        return value.toFormat('dd MMM yyyy');
                    }
                },
                {
                    key: 'level',
                    label: 'Level',
                    sortable: false,
                    sortDirection: 'desc'
                },
                { key: 'actions', label: 'Actions', thClass: 'th-actions' }
            ]
        };
    },
    watch: {
        currentPage(page) {
            this.$store.dispatch('getLoyaltyPrograms', {
                limit: 3,
                offset: (page - 1) * 3
            });
        }
    },
    computed: {
        ...mapGetters([
            'loyaltyPrograms',
            'loyaltyProgramsPagination',
            'loyaltyProgramMembers',
            'loyaltyProgramMembersPagination'
        ]),
        currentOffset() {
            return (this.currentPage - 1) * 3;
        }
    },
    methods: {
        openDeleteProgram(row) {
            if (typeof row.item.displayName === 'undefined') {
                row.item.displayName = 'My Loyalty Program';
            }
            this.programForDeactivation = row.item;
            this.$bvModal.show('deactivate-program');
        },
        openDeactivateMember() {
            this.$bvModal.show('deactivate-member');
        },
        onRowSelected(items) {
            if (items.length > 0) {
                const programId = items[0]._id;
                this.selectedProgram = programId;
                this.$store.dispatch('getMembers', programId);
            } else {
                this.selectedProgram = null;
            }
        },
        updateProgramsList() {
            const offset = this.currentOffset;
            const limit = 3;
            this.$store.dispatch('getLoyaltyPrograms', { limit, offset });
        }
    }
};
</script>
