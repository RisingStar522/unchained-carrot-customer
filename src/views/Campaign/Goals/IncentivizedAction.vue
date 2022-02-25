<template>
    <div class="content with-sidebar py-4 fullheight-container">
        <div class="fullheight-container__body with-buttons">
            <b-card>
                <div>
                    <h1 class="card-headertext">Goals - Incentivized Action</h1>
                </div>
                <b-form data-vv-scope="targetAudienceForm">
                    <b-container class="form_numeric_tab-form" fluid>
                        <form-tags-select
                            :value.sync="action.funnel"
                            label="Pirate Funnel"
                        />
                        <b-row>
                            <b-col lg="3" class="no-left-padding">
                                <label class="text-brand"
                                    >The campaign incentivizes</label
                                >
                            </b-col>
                            <b-col lg="2">
                                <b-form-select
                                    :options="incTypes"
                                    :value="action.incType"
                                    class="form-control"
                                />
                            </b-col>
                            <b-col lg="2" class="no-left-padding">
                                <b-form-select
                                    :options="incTargets"
                                    :value="action.incTarget"
                                    class="form-control"
                                />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col lg="3" class="no-left-padding">
                                <label class="text-brand"
                                    >Describe specifics</label
                                >
                            </b-col>
                            <b-col lg="4" class="witherror-input">
                                <b-form-textarea
                                    v-model="action.specifics"
                                    placeholder="Describe specifics..."
                                    rows="6"
                                    max-rows="6"
                                    no-resize
                                ></b-form-textarea>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-form>
            </b-card>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="outline-primary"
                    class="min-width-button"
                    size="lg"
                    @click="$router.push('/campaign/goals/target-audience')"
                >
                    Previous
                </b-button>
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    type="submit"
                    @click="$router.push('/campaign/goals/engagement-goal')"
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
import FormTagsSelect from '@/components/Forms/FormTagsSelect';

export default {
    components: {
        FormTagsSelect
    },
    data() {
        return {
            action: {
                funnel: [],
                incType: 0,
                incTarget: 0
            },
            incTypes: [
                { value: 0, text: 'read' },
                { value: 1, text: 'write' }
            ],
            incTargets: [
                { value: 0, text: 'newsletter' },
                { value: 1, text: 'mail' },
                { value: 2, text: 'something' }
            ]
        };
    }
};
</script>
