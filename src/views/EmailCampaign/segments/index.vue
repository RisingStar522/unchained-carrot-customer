<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            Audience segments
        </h3>
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
                        :to="{ name: 'AudienceSegmentsAdd' }"
                    >
                        <span class="btn-icon btn-outline">
                            <fa-icon
                                class="addIcon"
                                icon="plus-circle"
                            /> </span
                        >Create New Segment
                    </b-button>
                </div>
            </div>
            <b-table :items="items" :fields="fields">
                <!-- Manually create cell for actions -->
                <template #cell(actions)>
                    <b-button class="table-action">
                        <fa-icon icon="eye" />
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

<script>
import { DateTime } from 'luxon';
// Import icons for including as inline svg
import TrashIcon from '@/assets/icons/emailtemplates/TrashIcon.svg?raw';
import CopyIcon from '@/assets/icons/emailtemplates/CopyIcon.svg?raw';

export default {
    components: {
        TrashIcon,
        CopyIcon
    },
    data() {
        return {
            sortSelected: 'name',
            sortOptions: [
                { value: 'name', text: 'Name' },
                { value: 'contacts', text: 'Number of contacts' },
                { value: 'date', text: 'Created date' }
            ],
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'contacts',
                    label: 'Number of contacts',
                    sortable: false
                },
                {
                    key: 'date',
                    label: 'Created date',
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
            ],
            items: [
                {
                    name: 'Female 20 - 45 years',
                    contacts: 210,
                    status: 2,
                    date: DateTime.fromJSDate(new Date())
                }
            ]
        };
    }
};
</script>
