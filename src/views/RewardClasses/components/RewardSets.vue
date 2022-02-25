<template>
    <div class="">
        <div class="">
            <h4 class="text-brand">Reward Sets</h4>
        </div>
        <b-card>
            <b-table
                :fields="fields"
                :items="items"
                caption-top
                responsive
                outlined
                head-variant="light"
                :per-page="perPage"
                :current-page="currentPage"
            >
                <template v-slot:cell(actions)="data">
                    <fa-icon icon="chart-bar" />
                    <fa-icon icon="pencil-alt" class="ml-3" />
                    <fa-icon
                        icon="trash-alt"
                        class="ml-3"
                        v-b-modal.deleteClassSet
                        @click="modalSubTitle = data.item.provider"
                    />
                </template>
            </b-table>
            <div class="d-flex justify-content-end">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>
            </div>
        </b-card>
        <Modal
            modalId="deleteClassSet"
            title="Are you sure to delete Reward set"
            :modalSubTitle="modalSubTitle"
        />
    </div>
</template>

<script>
import Modal from './modal';
export default {
    name: 'reward-sets',
    components: {
        Modal,
    },
    data: () => ({
        modalSubTitle: '',
        options: [
            { value: 'Name', text: 'Name' },
            { value: 'Provider', text: 'Provider' },
            { value: 'Value Proposition', text: 'Value Proposition' },
        ],
        fields: [
            {
                key: 'rowSelection',
                label: '',
            },
            {
                key: 'name',
                label: 'NAME',
            },
            {
                key: 'provider',
                label: 'PROVIDER',
            },
            {
                key: 'valuePreposition',
                label: 'VALUE PREPOSITION',
            },
            { key: 'actions', label: '' },
        ],
        items: [
            {
                name: 'Coupon',
                provider: 'WooCommerce',
                valuePreposition: 'Saving',
                bars: 'chart-bar',
            },
            {
                name: 'Soupon',
                provider: 'WooCommerce',
                valuePreposition: 'Saving',
                bars: 'chart-bar',
            },
            {
                name: 'Coupon',
                provider: 'WooCommerce',
                valuePreposition: 'Saving',
                bars: 'chart-bar',
            },
        ],
        perPage: 2,
        currentPage: 1,
    }),
    computed: {
        rows() {
            return this.items.length;
        },
    },
    created() {
        this.$store.dispatch('getRewardSets');
    },
};
</script>
