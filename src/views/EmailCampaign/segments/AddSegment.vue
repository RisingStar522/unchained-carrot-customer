<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            Create a segment
        </h3>
        <div class="form_numeric">
            <div
                class="form_numeric_index"
                :class="{ success: successTabs[0] }"
            >
                <span>1</span>
            </div>
            <div class="form_numeric_data">
                <select-members-tab
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
                <set-conditions-tab
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
                <review-segment-tab
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
                :to="{ name: 'AudienceSegments' }"
            >
                Cancel
            </b-button>
            <b-button
                variant="primary"
                class="min-width-button"
                size="lg"
                :to="{ name: 'AudienceSegments' }"
                :disabled="!validSubmit"
            >
                Save segment
            </b-button>
        </div>
    </div>
</template>

<script>
import SelectMembersTab from '@/components/EmailCampaign/SelectMembersTab';
import SetConditionsTab from '@/components/EmailCampaign/SetConditionsTab';
import ReviewSegmentTab from '@/components/EmailCampaign/ReviewSegmentTab';

export default {
    components: {
        SelectMembersTab,
        SetConditionsTab,
        ReviewSegmentTab
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
            this.successTabs.forEach((success, index) => {
                if (index !== 2) {
                    valid = valid && success;
                }
            });
            return valid;
        }
    },
    methods: {
        /**
         * Set success state for tab which sent an event and open the next one
         * @param {number} index An index of tab which sends an event
         */
        nextTab(index) {
            this.$set(this.successTabs, index, true);
            setTimeout(() => {
                this.$set(this.openTabs, index + 1, true);
            }, 310);
        }
    }
};
</script>
