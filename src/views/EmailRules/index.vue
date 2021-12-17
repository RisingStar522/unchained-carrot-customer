<template>
    <div class="content with-sidebar">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <template v-else>
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
                        <b-button
                            class="table-action"
                            :to="{
                                name: 'EmailRulesEventAdd',
                                params: { id: row.item._id }
                            }"
                        >
                            <div class="d-flex">
                                <p class="text-primary mx-2 my-0">Add</p>
                                <div>
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
                                </div>
                            </div>
                        </b-button>
                    </template>
                </b-table>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
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

<style scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
