<template>
    <div class="content py-4 fullheight-container">
        <div class="fullheight-container__body with-buttons">
            <b-card>
                <div>
                    <h1 class="card-headertext">Create Campaign</h1>
                </div>
                <b-form data-vv-scope="performanceCreateCampaignForm">
                    <b-container class="form_numeric_tab-form" fluid>
                        <form-input-element
                            :value.sync="campaign.name"
                            v-model="campaign.name"
                            label="Name Campaign"
                            placeholder="Name..."
                            name="name"
                            v-validate="'required'"
                            :sizes="{ lg: [3, 4] }"
                            :error="
                                errors.first(
                                    'performanceCreateCampaignForm.name'
                                )
                            "
                        />
                        <b-row class="witherror">
                            <b-col lg="3" class="no-left-padding">
                                <label class="text-brand">Start Date</label>
                            </b-col>
                            <b-col lg="4" class="witherror-input">
                                <datetime
                                    format="MM/dd/yyyy"
                                    placeholder="MM/DD/YYYY"
                                    v-model="campaign.start"
                                    type="date"
                                ></datetime>
                            </b-col>
                        </b-row>
                        <b-row class="witherror">
                            <b-col lg="3" class="no-left-padding">
                                <label class="text-brand">Ending Date</label>
                            </b-col>
                            <b-col lg="4" class="witherror-input">
                                <datetime
                                    format="MM/dd/yyyy"
                                    placeholder="MM/DD/YYYY"
                                    v-model="campaign.end"
                                    type="date"
                                ></datetime>
                            </b-col>
                        </b-row>
                        <b-row class="witherror">
                            <b-col lg="3" class="no-left-padding">
                                <label class="text-brand"
                                    >Describe specifics</label
                                >
                            </b-col>
                            <b-col lg="4" class="witherror-input">
                                <b-form-textarea
                                    v-model="campaign.descr"
                                    placeholder="Description..."
                                    rows="3"
                                    max-rows="3"
                                    no-resize
                                ></b-form-textarea>
                            </b-col>
                        </b-row>
                    </b-container>
                    <div class="text-right">
                        <b-button
                            variant="primary"
                            class="min-width-button"
                            size="lg"
                            type="submit"
                        >
                            Save and Create
                        </b-button>
                    </div>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<style lang="scss">
@import '../../../assets/scss/campaign/main.scss';
</style>

<script>
import FormInputElement from '@/components/Forms/FormInputElement';

export default {
    components: {
        FormInputElement
    },
    data() {
        return {
            campaign: {
                name: '',
                start: null,
                end: null,
                descr: ''
            }
        };
    }
};
</script>
