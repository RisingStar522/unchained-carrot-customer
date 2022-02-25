<template>
    <div class="content">
        <div class="py-4">
            <h4 class="text-brand">Rules</h4>
        </div>

        <b-card>
            <div class="d-flex">
                <div class="ml-auto ">
                    <b-btn
                        v-b-modal.addEvent
                        variant="light"
                        class="mr-2 text-brand"
                    >
                        <fa-icon icon="plus-circle" class="mr-2" />Add
                        event</b-btn
                    >
                    <b-btn variant="light" class="text-brand"
                        ><fa-icon icon="sync-alt" class="mr-2" />Refresh
                        engine</b-btn
                    >
                </div>
            </div>
            <b-table
                :fields="fields"
                :items="items"
                caption-top
                responsive
                outlined
                head-variant="light"
            >
                <template v-slot:table-caption>Eligible Events</template>

                <template v-slot:cell(edit)="data">
                    <fa-icon :icon="data.value" class="mr-2" />
                </template>

                <template v-slot:cell(delete)="data">
                    <fa-icon :icon="data.value" class="mr-2" />
                </template>
            </b-table>
        </b-card>

        <AddEventModal />
    </div>
</template>

<script>
import AddEventModal from './components/addEventModal';
export default {
    name: 'reward-engine-page',
    components: {
        AddEventModal
    },
    data: () => ({
        fields: [
            {
                key: 'event',
                sortable: true,
                label: 'EVENT'
            },
            {
                key: 'type',
                sortable: true,
                label: 'TYPE'
            },
            {
                key: 'source',
                sortable: true,
                label: 'SOURCE'
            },
            {
                key: 'project',
                sortable: true,
                label: 'PROJECT'
            },
            { key: 'edit', label: '' },
            { key: 'delete', label: '' }
        ],
        items: [
            {
                event: 40,
                type: 'Dickerson',
                source: 'Macdonald',
                project: 'Prom',
                edit: 'pencil-alt',
                delete: 'trash-alt'
            }
        ]
    })
};
</script>
