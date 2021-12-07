<template>
    <div class="content with-sidebar">
        <div class="py-4">
            <h4 class="text-brand">Attach Email Rules to Events</h4>
        </div>
        <div class="table-wrapper">
            <div class="table-preheader">
                <div />
                <div></div>
            </div>
            <b-table
                :items="items"
                :fields="fields"
                select-mode="single"
                selectable
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
                    <b-button class="table-action">
                        <OutlinePlusCircle />
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
    </div>
</template>

<script>
// Import icons for including as inline svg
import TrashIcon from '@/assets/icons/emailtemplates/TrashIcon.svg?raw';
import OutlinePlusCircle from '@/assets/icons/emailtemplates/OutlinePlusCircle.svg?raw';
import PencilIcon from '@/assets/icons/emailtemplates/PencilIcon.svg?raw';

export default {
    components: {
        TrashIcon,
        OutlinePlusCircle,
        PencilIcon
    },
    data() {
        return {
            fields: [
                {
                    key: 'displayName',
                    label: 'Event Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'status',
                    label: 'Status'
                },
                { key: 'actions', label: 'Actions', thClass: 'th-actions' }
            ],
            items: [
                { displayName: 'Product added to cart', status: 'Detected' },
                { displayName: 'Product added to cart', status: 'Unpublished' },
                { displayName: 'Product added to cart', status: 'Published' }
            ]
        };
    },
    created() {
        // new EmailEngineAPI()
        //     .getEmailEvents('WOOCOMMERCE', '607c0b9def2fa1001c3b5096')
        //     .then(resp => {
        //         console.log(resp);
        //     });
    },
    filters: {
        statusClass(status) {
            let innerStatus = status.toString().toLowerCase();
            switch (innerStatus) {
                case 'published':
                    innerStatus = 'validated';
                    break;
                case 'unpublished':
                    innerStatus = 'not-validated';
                    break;
                default:
                    innerStatus = 'default';
                    break;
            }
            return `class-${innerStatus}`;
        }
    }
};
</script>
