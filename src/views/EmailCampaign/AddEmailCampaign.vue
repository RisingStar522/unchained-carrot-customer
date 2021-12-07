<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            New Email Campaign
        </h3>
        <div class="form_numeric">
            <div
                class="form_numeric_index"
                :class="{ success: successTabs[0] }"
            >
                <span>1</span>
            </div>
            <div class="form_numeric_data">
                <email-details-tab @next-tab="nextTab(0)" />
            </div>
            <div
                class="form_numeric_index"
                :class="{ success: successTabs[1] }"
            >
                <span>2</span>
            </div>
            <div class="form_numeric_data">
                <select-template-tab
                    @next-tab="nextTab(1)"
                    :open.sync="openTabs[1]"
                />
            </div>
            <div
                class="form_numeric_index"
                :class="{ success: successTabs[2] }"
            >
                <span>3</span>
            </div>
            <div class="form_numeric_data">
                <review-send-tab
                    @next-tab="nextTab(2)"
                    :open.sync="openTabs[2]"
                />
            </div>
        </div>
        <div class="bottom-buttons">
            <b-button
                variant="outline-primary"
                class="min-width-button"
                size="lg"
            >
                Cancel
            </b-button>
            <b-button
                variant="primary"
                class="min-width-button"
                size="lg"
                :disabled="!validSubmit"
            >
                Send campaign
            </b-button>
        </div>
        <b-modal
            id="sendtest-modal"
            centered
            title="Send test email"
            hide-footer
        >
            <b-container fluid class="form_numeric_tab-form hidden-edit">
                <b-row>
                    <b-col sm="4" class="no-left-padding">
                        <label for="test">
                            Email addresses
                        </label>
                    </b-col>
                    <b-col sm="8" class="no-right-padding">
                        <div>
                            <b-form-input
                                id="test"
                                type="text"
                                placeholder="email@example.com, email1@example.com"
                            />
                            <small class="form-text text-muted">
                                Separate email addresses using comma
                            </small>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <div class="bottom-buttons no-left-padding">
                        <b-button
                            variant="outline-primary"
                            class="min-width-button"
                        >
                            Cancel
                        </b-button>
                        <b-button variant="primary" class="min-width-button">
                            Send
                        </b-button>
                    </div>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
import EmailDetailsTab from '@/components/EmailCampaign/newcampaign/EmailDetailsTab';
import SelectTemplateTab from '@/components/EmailCampaign/newcampaign/SelectTemplateTab.vue';
import ReviewSendTab from '@/components/EmailCampaign/newcampaign/ReviewSendTab.vue';

export default {
    components: {
        EmailDetailsTab,
        SelectTemplateTab,
        ReviewSendTab
    },
    data() {
        return {
            openTabs: [false, false, false],
            successTabs: [false, false, false]
        };
    },
    computed: {
        /** @return {boolean} Whether main submit button is not disabled */
        validSubmit() {
            let valid = true;
            this.successTabs.forEach(success => {
                valid = valid && success;
            });
            return valid;
        }
    },
    methods: {
        /**
         * Set success state for tab which sent an event and open the next one or open the "Send test email" modal
         * @param {number} index An index of tab which sends an event
         */
        nextTab(index) {
            this.$set(this.successTabs, index, true);
            setTimeout(() => {
                if (index > 1) {
                    this.$bvModal.show('sendtest-modal');
                } else {
                    this.$set(this.openTabs, index + 1, true);
                }
            }, 310);
        }
    }
};
</script>
