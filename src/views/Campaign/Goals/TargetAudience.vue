<template>
    <div class="content with-sidebar py-4 fullheight-container">
        <div class="fullheight-container__body with-buttons">
            <b-card>
                <div>
                    <h1 class="card-headertext">Goals - Target Audience</h1>
                </div>
                <b-form
                    class="fullheight-container__body with-buttons"
                    data-vv-scope="targetAudienceForm"
                >
                    <b-container class="form_numeric_tab-form" fluid>
                        <form-tags-select
                            :value.sync="audience.target"
                            label="Campaign target"
                        />
                        <form-input-element
                            :value.sync="audience.loyalty"
                            v-model="audience.loyalty"
                            label="Members of Loyalty Program"
                            placeholder="Choose loyalty program"
                            :options="membersLoyalty"
                            name="membersLoyalty"
                            v-validate="'required'"
                            :sizes="{ lg: [3, 4] }"
                            :error="
                                errors.first('emailRuleAddForm.membersLoyalty')
                            "
                        />
                        <form-input-element
                            :value.sync="audience.referral"
                            v-model="audience.referral"
                            label="Members of Referral Program"
                            placeholder="Choose referral program"
                            :options="membersReferral"
                            name="membersReferral"
                            v-validate="'required'"
                            :sizes="{ lg: [3, 4] }"
                            :error="
                                errors.first('emailRuleAddForm.membersReferral')
                            "
                        />
                        <form-input-element
                            :value.sync="audience.size"
                            v-model="audience.size"
                            label="Estimated audience size"
                            placeholder="0"
                            name="size"
                            inputType="number"
                            v-validate="'required'"
                            :error="errors.first('targetAudienceForm.size')"
                            :sizes="{ lg: [3, 4] }"
                        />
                    </b-container>
                </b-form>
            </b-card>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    type="submit"
                    @click="$router.push('/campaign/goals/incentivized-action')"
                >
                    Next
                </b-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../../../assets/scss/campaign/main.scss';
</style>

<script>
import FormInputElement from '@/components/Forms/FormInputElement';
import FormTagsSelect from '@/components/Forms/FormTagsSelect';

export default {
    components: {
        FormInputElement,
        FormTagsSelect
    },
    data() {
        return {
            audience: {
                size: 0,
                target: []
            },
            membersLoyalty: [
                { value: 0, text: 'Test 1' },
                { value: 1, text: 'Test 2' }
            ],
            membersReferral: [
                { value: 2, text: 'Test 3' },
                { value: 3, text: 'Test 4' }
            ]
        };
    }
};
</script>
