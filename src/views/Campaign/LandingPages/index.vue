<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            Landing Pages - Pages
        </h3>
        <b-container fluid>
            <b-row>
                <b-col lg="2" class="no-left-padding">
                    <label for="" class="text-brand">
                        Select landing pages
                    </label>
                </b-col>
                <b-col lg="3" class="no-left-padding no-right-padding">
                    <b-form-input
                        list="landingpages-list"
                        class="mr-1"
                        v-model="search"
                    ></b-form-input>
                    <datalist id="landingpages-list">
                        <!-- This one shows -->
                        <option v-for="(page, index) in pages" :key="index">
                            {{ page.title }}
                        </option>
                    </datalist>
                </b-col>
                <b-col>
                    <b-button variant="primary">Search</b-button>
                </b-col>
            </b-row>
        </b-container>
        <h4 class="text-brand py-4">Selected Landing Pages</h4>
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
                        :to="{ name: 'SavedTemplatesAdd' }"
                    >
                        <span class="btn-icon btn-outline">
                            <fa-icon
                                class="addIcon"
                                icon="plus-circle"
                            /> </span
                        >Add Template
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
                    <b-button class="table-action" to="/emailbroadcasts/1">
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
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-number
            last-number
        ></b-pagination>
    </div>
</template>

<script>
import { DateTime } from 'luxon';
import { mapState } from 'vuex';
import TrafficRoutesAPI from '../../../api/TrafficRoutesAPI';

export default {
    data() {
        return {
            currentPage: 1,
            rows: 6,
            perPage: 3,
            search: '',
            sortSelected: 'title',
            sortOptions: [
                { value: 'title', text: 'Title' },
                { value: 'status', text: 'Status' },
                { value: 'createdAt', text: 'Date Creation' },
                { value: 'updatedAt', text: 'Last Edited' }
            ],
            items: [
                {
                    name: 'Valentine’s Day discount',
                    campaign: 'March Campaign',
                    status: 'published',
                    createdAt: DateTime.fromJSDate(new Date()),
                    updatedAt: DateTime.fromJSDate(new Date())
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
                    key: 'status',
                    label: 'Status',
                    formatter: value => {
                        let returnedString = '';
                        switch (value) {
                            case 'draft':
                                returnedString = 'Draft';
                                break;
                            default:
                                returnedString = 'Published';
                                break;
                        }
                        return returnedString;
                    },
                    sortable: false,
                    sortByFormatted: true
                },
                {
                    key: 'createdAt',
                    label: 'Date creation',
                    formatter: (value, key, item) => {
                        return `${value.toFormat('dd MMM yyyy')}`;
                    },
                    sortable: false
                },
                {
                    key: 'updatedAt',
                    label: 'Last edited',
                    formatter: (value, key, item) => {
                        return `${value.toFormat('dd MMM yyyy')}`;
                    },
                    sortable: false
                }
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
    mounted() {
        this.$store.dispatch('landingpages/getAllLandingPages');
        new TrafficRoutesAPI().getTrafficRoutes({}).then(resp => {
        });
    },
    computed: {
        ...mapState({ pages: state => state.landingpages.pages })
    }
};
</script>
