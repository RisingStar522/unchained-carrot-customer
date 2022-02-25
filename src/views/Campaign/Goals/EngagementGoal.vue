<template>
    <div class="content with-sidebar py-4 fullheight-container">
        <div class="fullheight-container__body with-buttons">
            <b-card>
                <div>
                    <h1 class="card-headertext">Goals - Engagement Goal</h1>
                </div>
                <b-form data-vv-scope="engagementGoalForm">
                    <b-container class="form_numeric_tab-form" fluid>
                        <form-input-element
                            :value.sync="goal.target"
                            v-model="goal.target"
                            label="Campaign targets"
                            placeholder="Enter amount"
                            inputType="number"
                            name="target"
                            v-validate="'required'"
                            :sizes="{ lg: [3, 2] }"
                            :error="errors.first('engagementGoalForm.target')"
                        >
                            <template v-slot:after>
                                <b-col lg="3">
                                    <label class="text-brand"
                                        >positive engagements</label
                                    >
                                </b-col>
                            </template>
                        </form-input-element>
                        <form-tags-select
                            :value.sync="goal.positive"
                            label="Positive engagement tags"
                            placeholder="Select tags..."
                        />
                        <form-tags-select
                            :value.sync="goal.smart"
                            label="Tag smart fields"
                            placeholder="Select tags..."
                        />
                        <form-tags-select
                            :value.sync="goal.negative"
                            label="Negative egagement tags"
                            placeholder="Select tags..."
                        />
                        <form-tags-select
                            :value.sync="goal.smart_two"
                            label="Tag smart fields"
                            placeholder="Select tags..."
                        />
                    </b-container>
                </b-form>
            </b-card>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="outline-primary"
                    class="min-width-button"
                    size="lg"
                    @click="$router.push('/campaign/goals/incentivized-action')"
                >
                    Previous
                </b-button>
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    type="submit"
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
            goal: {
                target: 0,
                positive: [],
                smart: [],
                negative: [],
                smart_two: []
            }
        };
    }
};
</script>
