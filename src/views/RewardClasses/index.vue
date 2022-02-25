<template>
    <div class="content">
        <div class="">
            <h4 class="text-brand">Reward Classes</h4>
        </div>
        <b-card>
            <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-brand mt-2">Order By</p>
                    <b-form-select
                        v-model="sortBy"
                        :options="options"
                        style="width: 70%"
                    ></b-form-select>
                </div>
                <div class="">
                    <b-button
                        variant="link"
                        class="text-brand"
                        @click="$router.push({ name: 'AddRewardClass' })"
                        ><fa-icon icon="plus-circle" class="mr-2" />Add Reward
                        Class</b-button
                    >
                </div>
            </div>
            <b-table
                :fields="fields"
                :items="items"
                select-mode="multi"
                selectable
                @row-selected="onRowSelected"
                caption-top
                responsive
                outlined
                head-variant="light"
                :sort-by.sync="sortBy"
                :per-page="perPage"
                :current-page="currentPage"
            >
                <template #cell(rowSelection)="{ rowSelected }">
                    <template v-if="rowSelected">
                        <b-form-checkbox v-model="checked" :disabled="true">
                        </b-form-checkbox>
                    </template>
                    <template v-else>
                        <b-form-checkbox :disabled="true"> </b-form-checkbox>
                    </template>
                </template>
                <template v-slot:cell(actions)="data">
                    <div class="d-flex">
                        <div variant="light"><fa-icon icon="chart-bar" /></div>
                        <div variant="light" class="ml-3">
                            <fa-icon icon="pencil-alt" />
                        </div>
                        <div
                            class="ml-3"
                            v-b-modal.deleteClass
                            @click="modalSubTitle = data.item.provider"
                        >
                            <fa-icon icon="trash-alt" />
                        </div>
                    </div>
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
        <div class="d-flex justify-content-end">
            <b-button variant="brand">Create Set</b-button>
        </div>
        <Modal
            modalId="deleteClass"
            title="Are you sure to delete Reward class"
            :modalSubTitle="modalSubTitle"
        />
        <RewardSets />
    </div>
</template>

<script>
import RewardSets from './components/RewardSets';
import Modal from './components/modal';
export default {
    name: 'reward-classes',
    components: {
        RewardSets,
        Modal,
    },
    data: () => ({
        modalSubTitle: '',
        sortBy: null,
        checked: true,
        selectedItems: [],
        options: [
            { value: 'rewardClassName', text: 'Name' },
            { value: 'provider', text: 'Provider' },
            { value: 'valueProposition', text: 'Value Proposition' },
        ],
        fields: [
            {
                key: 'rowSelection',
                label: '',
            },
            {
                key: 'rewardClassName',
                label: 'NAME',
            },
            {
                key: 'provider',
                label: 'PROVIDER',
            },
            {
                key: 'valueProposition',
                label: 'VALUE PREPOSITION',
            },
            { key: 'actions', label: '' },
        ],
        items: [
            {
                rewardClassName: 'Coupon',
                provider: 'WooCommerce',
                valueProposition: 'Saving',
                bars: 'chart-bar',
            },
            {
                rewardClassName: 'Points',
                provider: 'Unchained carrote',
                valueProposition: 'Saving',
                bars: 'chart-bar',
            },
            {
                rewardClassName: 'Skin',
                provider: 'WooCommerce',
                valueProposition: 'Saving',
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

    methods: {
        onRowSelected(items) {
            this.selectedItems = items;
        },
    },
    created() {
        this.$store.dispatch('getRewardClasses');
    },
};
</script>
