<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Review and send</h5>
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
                    <b-col sm="4" md="3" class="no-left-padding">
                        <template-grid-item :item="layout" :nobottom="true" />
                    </b-col>
                    <b-col sm="8" md="9">
                        <b-container fluid class="reviewdata-container">
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Sender email address</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <p class="no-margin">walter@flashboys.nl</p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Subject</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        Valentine’s Day discount
                                    </p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Target Audience</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <b-form-select
                                        v-model="selected"
                                        :options="options"
                                    >
                                        <template #first>
                                            <b-form-select-option
                                                :value="null"
                                                disabled
                                            >
                                                Choose the audience
                                            </b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>When to send</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <b-form-group v-slot="{ ariaDescribedby }">
                                        <b-form-radio
                                            v-model="send"
                                            :aria-describedby="ariaDescribedby"
                                            name="some-radios"
                                            :value="0"
                                        >
                                            Send immediately
                                        </b-form-radio>
                                        <b-form-radio
                                            v-model="send"
                                            :aria-describedby="ariaDescribedby"
                                            name="some-radios"
                                            :value="1"
                                        >
                                            Schedule campaign
                                        </b-form-radio>
                                    </b-form-group>
                                    <datetime
                                        v-if="send === 1"
                                        format="MM/dd/yyyy   HH:mm"
                                        placeholder="MM/DD/YYYY   HH:MM"
                                        v-model="startDate"
                                        type="datetime"
                                    ></datetime>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="no-right-padding text-right">
                        <b-button
                            variant="outline-primary"
                            class="min-width-button inline-button"
                            @click="nextTab"
                        >
                            Save as draft
                        </b-button>
                        <b-button
                            variant="primary"
                            class="min-width-button inline-button"
                            @click="nextTab"
                        >
                            Send test email
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
    max-height: 450px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>

<script>
import TemplateGridItem from './parts/TemplateGridItem';

export default {
    components: {
        TemplateGridItem
    },
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
            startDate: null,
            send: 0,
            layout: {
                id: 2,
                html: '/templates/test.html',
                title: 'Standard'
            },
            options: [
                { value: 'layouts', text: 'Audience 1' },
                { value: 'saved', text: 'Audience 2' }
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
