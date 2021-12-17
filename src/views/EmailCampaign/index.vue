<template>
    <div class="content with-sidebar" style="min-height: 90vh;">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <!-- If no items in broadcast list -->
        <template v-else>
            <div class="center-flex full-height" v-if="listEmpty === true">
                <div class="no-emailbroadcasts">
                    <img
                        src="@/assets/images/emailcampaign/mail-image.png"
                        alt="Mail Image"
                    />
                    <h2>You don’t have any email broadcasts yet</h2>
                    <p>
                        After you create your first email broadcast here you
                        will see the list of all email broadcasts created and
                        their details.
                    </p>
                    <b-button
                        variant="primary"
                        :to="{ name: 'EmailBroadcastsAddCampaign' }"
                    >
                        Create Email Broadcast
                    </b-button>
                </div>
            </div>
            <!-- If broadcast list contains items -->
            <div v-else>
                <div class="py-4">
                    <h4 class="text-brand">Email Campaigns</h4>
                </div>
                <div class="table-wrapper">
                    <div class="table-preheader">
                        <div>
                            <b-container fluid class="left-part">
                                <b-row>
                                    <b-col sm="3" class="no-left-padding">
                                        <h5>Sort&nbsp;by</h5>
                                    </b-col>
                                    <b-col sm="8">
                                        <b-form-select
                                            v-model="sortSelected"
                                            :options="sortOptions"
                                        >
                                        </b-form-select>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                        <div>
                            <b-button
                                class="transparent-button"
                                variant="link"
                                :to="{ name: 'EmailBroadcastsAddCampaign' }"
                            >
                                <span class="btn-icon btn-outline">
                                    <fa-icon
                                        class="addIcon"
                                        icon="plus-circle"
                                    /> </span
                                >Create Email Broadcast
                            </b-button>
                        </div>
                    </div>
                    <b-table :items="items" :fields="fields">
                        <template #cell(status)="row">
                            <span
                                class="status-circle"
                                :class="row.value | statusClass"
                            ></span>
                            {{ row.value }}
                        </template>
                        <!-- Manually create cell for actions -->
                        <template #cell(actions)>
                            <b-button
                                class="table-action"
                                to="/emailbroadcasts/1"
                            >
                                <DashboardIcon />
                            </b-button>
                            <b-button class="table-action">
                                <CopyIcon />
                            </b-button>
                            <b-button class="table-action">
                                <TrashIcon />
                            </b-button>
                        </template>
                    </b-table>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { DateTime } from 'luxon';
// Import icons for including as inline svg
import TrashIcon from '@/assets/icons/emailtemplates/TrashIcon.svg?raw';
import DashboardIcon from '@/assets/icons/emailtemplates/DashboardIcon.svg?raw';
import CopyIcon from '@/assets/icons/emailtemplates/CopyIcon.svg?raw';

export default {
    components: {
        TrashIcon,
        DashboardIcon,
        CopyIcon
    },
    data() {
        return {
            loading: false,
            sortSelected: 'campaign',
            sortOptions: [
                { value: 'name', text: 'Name' },
                { value: 'campaign', text: 'Related Campaign' }
            ],
            // Items should be fetched by API
            items: [
                {
                    name: 'Valentine’s Day discount',
                    campaign: 'March Campaign',
                    status: 2,
                    date: DateTime.fromJSDate(new Date())
                },
                {
                    name: 'Valentine’s Day discount',
                    campaign: 'March Campaign',
                    status: 1,
                    date: DateTime.fromJSDate(new Date())
                },
                {
                    name: 'Valentine’s Day discount',
                    campaign: 'March Campaign',
                    status: 0,
                    date: DateTime.fromJSDate(new Date())
                }
            ],
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'campaign',
                    label: 'Related Campaign',
                    sortable: false
                },
                {
                    key: 'status',
                    label: 'Status',
                    formatter: value => {
                        let returnedString = '';
                        switch (value) {
                            case 0:
                                returnedString = 'Draft';
                                break;
                            case 1:
                                returnedString = 'Scheduled';
                                break;
                            case 2:
                                returnedString = 'Sent';
                                break;
                        }
                        return returnedString;
                    },
                    sortable: false,
                    sortByFormatted: true
                },
                {
                    key: 'date',
                    label: 'Date',
                    formatter: (value, key, item) => {
                        const status = item.status;
                        let prepend = '';
                        switch (status) {
                            case 0:
                                prepend = 'Created on';
                                break;
                            case 1:
                                prepend = 'Scheduled for';
                                break;
                            case 2:
                                prepend = 'Sent on';
                                break;
                        }
                        return `${prepend} ${value.toFormat(
                            'dd/MM/yyyy HH:mm'
                        )}`;
                    },
                    sortable: false
                },
                { key: 'actions', label: 'Actions', thClass: 'th-actions' }
            ]
        };
    },
    filters: {
        /**
         * @param {number} status A status to create class from
         * @return {string} A string representing class of status cell
         */
        statusClass(status) {
            return `class-${status.toString().toLowerCase()}`;
        }
    },
    computed: {
        /** @return {boolean} A boolean which represent whether a list of items is empty */
        listEmpty() {
            const listTrue = this.$route.query.list;
            let listEmpty = true;
            if (listTrue === 'true') {
                listEmpty = false;
            }
            return listEmpty;
        }
    }
};
</script>
