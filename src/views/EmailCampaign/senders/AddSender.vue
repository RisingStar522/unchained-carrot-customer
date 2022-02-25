<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            Create sender
        </h3>
        <div class="form_numeric">
            <div
                class="form_numeric_index"
                :class="{ success: successTabs[0] }"
            >
                <span>1</span>
            </div>
            <div class="form_numeric_data">
                <sender-details-tab
                    @next-tab="nextTab(0)"
                    :open.sync="openTabs[0]"
                />
            </div>
            <div
                class="form_numeric_index"
                :class="{ success: successTabs[1] }"
            >
                <span>2</span>
            </div>
            <div class="form_numeric_data">
                <validation-set-up-tab
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
                <validate-sender-tab
                    :open.sync="openTabs[2]"
                    @success="setSuccess(2)"
                />
            </div>
        </div>
        <div class="bottom-buttons">
            <b-button
                variant="outline-primary"
                class="min-width-button"
                size="lg"
                :to="{ name: 'EmailSenders' }"
            >
                Cancel
            </b-button>
            <b-button
                variant="primary"
                class="min-width-button"
                size="lg"
                :to="{ name: 'EmailSenders' }"
                :disabled="!validSubmit"
            >
                Save segment
            </b-button>
        </div>
    </div>
</template>

<script>
import SenderDetailsTab from '@/components/EmailCampaign/senders/SenderDetailsTab';
import ValidationSetUpTab from '@/components/EmailCampaign/senders/ValidationSetUpTab';
import ValidateSenderTab from '@/components/EmailCampaign/senders/ValidateSenderTab';

export default {
    components: {
        SenderDetailsTab,
        ValidationSetUpTab,
        ValidateSenderTab
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
        nextTab(index) {
            this.$set(this.successTabs, index, true);
            setTimeout(() => {
                this.$set(this.openTabs, index + 1, true);
            }, 310);
        },
        /**
         * Set success state for tab without closing it
         * @param {number} index Index of target tab
         */
        setSuccess(index) {
            this.$set(this.successTabs, index, true);
        }
    }
};
</script>
