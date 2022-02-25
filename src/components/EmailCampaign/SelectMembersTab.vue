<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Select the members</h5>
            <a @click="editVisible = !editVisible">{{
                editVisible ? 'Close' : 'Edit'
            }}</a>
        </div>
        <transition name="fadeHeight">
            <b-container
                fluid
                class="form_numeric_tab-form hidden-edit"
                v-if="editVisible"
            >
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="test">
                            What should be the name of the segment?
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-input
                            id="test"
                            type="text"
                            placeholder="E.g. Survey group non buyers"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="members">
                            Which members of the loyalty program should be
                            included?
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-select v-model="selected" :options="options">
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose members of the loyalty program
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="members">
                            Which members of the referral program should be
                            included?
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-select v-model="selectedTwo" :options="options">
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose members of the referral program
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="no-right-padding text-right">
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
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editVisible: false,
            selected: null,
            selectedTwo: null,
            options: [
                { value: 'a', text: 'First Option' },
                { value: 'b', text: 'Second Option' },
                { value: 'c', text: 'Third Option' }
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
    methods: {
        nextTab() {
            this.editVisible = false;
            this.$emit('next-tab');
        }
    }
};
</script>
