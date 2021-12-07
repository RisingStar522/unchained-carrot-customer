<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            Email Senders
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
                        :to="{ name: 'EmailSendersAdd' }"
                    >
                        <span class="btn-icon btn-outline">
                            <fa-icon
                                class="addIcon"
                                icon="plus-circle"
                            /> </span
                        >Create Sender
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
                <template #cell(actions)>
                    <b-button class="table-action">
                        <img
                            aria-label="trash"
                            src="../../../assets/icons/emailtemplates/PencilIcon.svg"
                            alt="trash"
                        />
                    </b-button>
                    <b-button class="table-action">
                        <img
                            aria-label="edit"
                            src="../../../assets/icons/emailtemplates/TrashIcon.svg"
                            alt="edit"
                        />
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sortSelected: 'name',
            sortOptions: [
                { value: 'name', text: 'Name' },
                { value: 'email', text: 'Email' },
                { value: 'status', text: 'Status' }
            ],
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'email',
                    label: 'Email',
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
                                returnedString = 'Not validated';
                                break;
                            case 2:
                                returnedString = 'Validated';
                                break;
                            case 3:
                                returnedString = 'Blocked';
                                break;
                        }
                        return returnedString;
                    },
                    sortable: false
                },
                { key: 'actions', label: 'Actions', thClass: 'th-actions' }
            ],
            items: [
                {
                    name: 'Walter',
                    contacts: 210,
                    status: 3,
                    email: 'walter@flashboys.nl'
                },
                {
                    name: 'Unchained Carrot',
                    contacts: 210,
                    status: 2,
                    email: 'sandbox123@unchainedcarrot.com'
                },
                {
                    name: 'Walter UC',
                    contacts: 210,
                    status: 1,
                    email: 'walter@flashboys.nl'
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
            return `class-${status
                .toString()
                .toLowerCase()
                .split(' ')
                .join('-')}`;
        }
    }
};
</script>
