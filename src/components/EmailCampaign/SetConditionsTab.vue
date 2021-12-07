<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Set the conditions</h5>
            <a @click="editVisible = !editVisible">{{
                editVisible ? 'Close' : 'Edit'
            }}</a>
        </div>
        <transition name="fadeHeight">
            <div class="form_numeric_tab-form hidden-edit" v-if="editVisible">
                <p class="inline-text">Members match</p>
                <b-form-select
                    class="select-small in-text"
                    v-model="selected"
                    :options="options"
                />
                <p class="inline-text">of the following conditions</p>
                <div class="divider" />
                <div>
                    <template v-for="(condition, index) in conditionsCurrent">
                        <condition-row
                            :key="`conditionrow-${index}-${conditionPage}`"
                            :condition.sync="conditionsCurrent[index]"
                            @deleteMe="deleteRow(index)"
                        />
                    </template>
                    <b-container fluid>
                        <b-row align-v="center" class="action-row">
                            <b-col lg="6" class="no-left-padding">
                                <b-button
                                    class="transparent-button no-left-padding"
                                    variant="link"
                                    @click="addCondition"
                                >
                                    <span
                                        class="btn-icon btn-outline"
                                        style="margin-left: 0;"
                                    >
                                        <fa-icon
                                            class="addIcon"
                                            icon="plus-circle"
                                        /> </span
                                    >Add condition
                                </b-button>
                            </b-col>
                            <b-col lg="2">
                                <div class="small-pagination">
                                    <fa-icon
                                        icon="chevron-left"
                                        class="left-arrow"
                                        :class="{
                                            disabled:
                                                parseInt(conditionPage) === 1
                                        }"
                                        @click="prevPage"
                                    />
                                    <p>
                                        {{ conditionPage }} of
                                        {{ totalPages }}
                                    </p>
                                    <fa-icon
                                        icon="chevron-right"
                                        class="right-arrow"
                                        :class="{
                                            disabled:
                                                parseInt(conditionPage) ===
                                                parseInt(totalPages)
                                        }"
                                        @click="nextPage"
                                    />
                                </div>
                            </b-col>
                            <b-col lg="4" class="no-right-padding text-right">
                                <b-button
                                    variant="primary"
                                    class="min-width-button"
                                    @click="nextTab"
                                >
                                    Next
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </transition>
    </b-card>
</template>

<style lang="scss" scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 300px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>

<script>
import ConditionRow from '@/components/EmailCampaign/ConditionRow';

// Default condition model

export default {
    components: {
        ConditionRow
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            conditions: [
                {
                    condition: 'age',
                    is: 'is',
                    value: 'a'
                }
            ],
            conditionPage: 1,
            editVisible: false,
            selected: 'any',
            selectedTwo: null,
            options: [
                { value: 'any', text: 'any' },
                { value: 'none', text: 'none' }
            ]
        };
    },
    watch: {
        open: {
            immediate: true,
            handler(newOpen) {
                if (newOpen === true) {
                    this.editVisible = true;
                    this.$emit('update:open', false);
                }
            }
        }
    },
    computed: {
        /**
         * @return {array} All conditions for chosen page
         */
        conditionsCurrent() {
            const page = (this.conditionPage - 1) * 3;
            return this.conditions.slice(page, page + 3);
        },
        /**
         * @return {number} The total number of condition pages
         */
        totalPages() {
            let pages = this.conditions.length / 3;
            return Math.ceil(pages).toString();
        }
    },
    methods: {
        nextTab() {
            this.editVisible = false;
            this.$emit('next-tab');
        },
        /**
         * Add new condition to list
         * If the new condition is on a new page, switch to this page
         */
        addCondition() {
            this.conditions.push({
                condition: 'age',
                is: 'is',
                value: 'a'
            });
            if ((this.conditions.length - 1) % 3 === 0) {
                this.conditionPage += 1;
            }
        },
        /**
         * Delete a condition from list
         * If this action leave the current page blank, switch to previous page
         */
        deleteRow(index) {
            this.conditions.splice(index, 1);
            if (this.conditionPage > parseInt(this.totalPages)) {
                this.conditionPage -= 1;
            }
        },
        prevPage() {
            if (this.conditionPage !== 1) {
                this.conditionPage--;
            }
        },
        nextPage() {
            if (this.conditionPage !== parseInt(this.totalPages)) {
                this.conditionPage++;
            }
        }
    }
};
</script>
