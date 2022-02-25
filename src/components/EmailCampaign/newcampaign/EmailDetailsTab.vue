<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Add email details</h5>
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
                            To which campaign does this broadcast belong?
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-select v-model="selected" :options="options">
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose the campaign
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="test">
                            What should be the name of the broadcast?
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-input
                            id="test"
                            type="text"
                            placeholder="E.g. Welcome email"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="test">Who is sending this email?</label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-select :options="options" v-model="selectedtwo">
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose the sender
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="test">What’s the email subject line?</label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-input
                            id="test"
                            type="text"
                            placeholder="E.g. Up to 40% off this Black Friday!"
                        />
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
    max-height: 350px;
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
            selectedtwo: null,
            options: [
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                {
                    value: { C: '3PO' },
                    text: 'This is an option with object value'
                },
                { value: 'd', text: 'This one is disabled', disabled: true }
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
