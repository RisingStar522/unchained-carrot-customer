<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Points</h3>
        </div>
        <b-card>
            <b-table
                :fields="fields"
                :items="items"
                caption-top
                responsive
                outlined
                head-variant="light"
            >
                <template v-slot:cell(actions)="">
                    <fa-icon icon="chart-bar" />
                    <fa-icon icon="pencil-alt" class="ml-3" />
                    <fa-icon icon="trash-alt" class="ml-3" />
                </template>
            </b-table>
        </b-card>
        <div class="d-flex justify-content-end">
            <b-button variant="brand"> Upload</b-button>
        </div>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 200px"
        >
            <div class="d-flex justify-content-end w-100 mt-auto p-2">
                <div
                    class="d-flex justify-content-between"
                    style="width: 24.5%"
                >
                    <b-btn
                        variant="outline-brand"
                         style="width:100px"
                        @click="$router.push({ name: 'AddRewardClass' })"
                    >
                        Cancel
                    </b-btn>
                    <b-btn
                        variant="brand"
                        style="width:100px"
                        @click="
                            $router.push({
                                name: 'Rewards-Points-Distribution',
                            })
                        "
                    >
                        Next
                    </b-btn>
                </div>
            </div>
        </div>
        <!-- <Modal
            modalId="deleteClassSet"
            title="Are you sure to delete Reward set"
            :modalSubTitle="modalSubTitle"
        /> -->
    </b-container>
</template>

<script>
//import Modal from './modal';
export default {
    name: 'reward-point-images',
    components: {
        //   Modal,
    },
    data: () => ({
        modalSubTitle: '',
        // options: [
        //     { value: 'name', text: 'FILEName' },
        //     { value: 'type', text: 'TYPE' },
        //     { value: 'language', text: 'LANGUAGE' },
        //     { value: 'mergeTags', text: 'MERGE TAGS' },
        // ],
        fields: [
            {
                key: 'name',
                label: 'FILEName',
            },
            {
                key: 'type',
                label: 'TYPE',
            },
            {
                key: 'language',
                label: 'LANGUAGE',
            },
            {
                key: 'mergeTags',
                label: 'MERGE TAGS',
            },
            { key: 'actions', label: '' },
        ],
        items: [
            {
                name: 'WooCoupon.png',
                type: 'thumbnail',
                language: 'EN',
                mergeTags: '[50,50]',
            },
            {
                name: 'WOI_GH.png',
                type: 'offer',
                language: 'IT',
                mergeTags: 'FNAME,LNAME,PERCENTAGE',
            },
        ],
    }),
};
</script>
