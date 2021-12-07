<template>
    <b-form
        class="content"
        @submit.prevent="validateForm"
        data-vv-scope="surveyActivateForm"
        v-if="currentSurvey"
    >
        <h3 class="page-header mb-3">
            {{ currentSurvey.name }}
            <b-btn
                :to="{ name: 'SurveysEdit', params: { id: surveyId } }"
                variant="brand"
                size="sm"
                class="float-right btn-w100"
            >
                Edit
            </b-btn>
        </h3>
        <b-row>
            <b-col cols="12" :md="this.showRewards ? 6 : 12">
                <b-card>
                    <h3 class="text-center mb-3 text-brand">Activate Survey</h3>
                    <md-datepicker
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'surveyActivateForm.startDate'
                            )
                        }"
                        v-model="formData.startDate"
                        name="startDate"
                        md-immediately
                        v-validate="'required'"
                    >
                        <label>Start date</label>
                        <span class="md-error">
                            {{ errors.first('surveyActivateForm.startDate') }}
                        </span>
                    </md-datepicker>
                    <md-datepicker
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'surveyActivateForm.endDate'
                            )
                        }"
                        v-model="formData.endDate"
                        name="endDate"
                        md-immediately
                        v-validate="'required'"
                    >
                        <label>End date</label>
                        <span class="md-error">
                            {{ errors.first('surveyActivateForm.endDate') }}
                        </span>
                    </md-datepicker>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'surveyActivateForm.maximumResponses'
                            )
                        }"
                    >
                        <label>Maximum number of responses</label>
                        <md-input
                            type="number"
                            name="maximumResponses"
                            autocomplete="off"
                            v-model="formData.maximumResponses"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{
                                errors.first(
                                    'surveyActivateForm.maximumResponses'
                                )
                            }}
                        </span>
                    </md-field>
                    <b-btn
                        type="submit"
                        variant="brand"
                        size="lg"
                        :disabled="canActivated"
                        class="float-right btn-w200 mb-3"
                    >
                        Activate
                    </b-btn>
                </b-card>
                <template v-if="showCost">
                    <b-card>
                        <h3 class="text-center mb-3 text-brand">Costs</h3>
                        <dl class="text-brand row">
                            <dt class="col-12 col-lg-8">
                                Max reward per player
                            </dt>
                            <dd class="col-12 col-lg-4 text-right">
                                {{ maxRewardPlayer }}
                            </dd>
                            <dt class="col-12 col-lg-8">Max reward campaign</dt>
                            <dd class="col-12 col-lg-4 text-right">
                                {{ maxRewardCampaign }}
                            </dd>
                        </dl>
                        <div v-show="maxRewardCampaign > allowance">
                            <p class="text-danger">
                                Insufficient Reward Allowance
                            </p>
                            <div class="text-center mt-5">
                                <b-btn variant="brand">
                                    Increase Allowance
                                </b-btn>
                            </div>
                        </div>
                    </b-card>
                </template>
            </b-col>
            <template v-if="showRewards">
                <b-col cols="12" md="6">
                    <b-card>
                        <h3 class="text-center mb-3 text-brand">Rewards</h3>
                        <md-field
                            v-bind:class="{
                                'md-invalid': errors.has(
                                    'surveyActivateForm.rewardType'
                                )
                            }"
                        >
                            <label>Reward type</label>
                            <md-select
                                name="rewardType"
                                v-model="formData.rewardType"
                                v-validate="'required'"
                            >
                                <md-option
                                    v-for="item in rewardTypes"
                                    :value="item"
                                    :key="item"
                                >
                                    {{ item }}
                                </md-option>
                            </md-select>
                            <span class="md-error">
                                {{
                                    errors.first(
                                        'surveyActivateForm.rewardType'
                                    )
                                }}
                            </span>
                        </md-field>
                        <md-field
                            v-bind:class="{
                                'md-invalid': errors.has(
                                    'surveyActivateForm.rewardPoints'
                                )
                            }"
                        >
                            <label>Point</label>
                            <md-select
                                name="rewardPoints"
                                v-model="formData.rewardPoints"
                                v-validate="'required'"
                            >
                                <md-option
                                    v-for="item in rewardsList"
                                    :value="item.id"
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </md-option>
                            </md-select>
                            <span class="md-error">
                                {{
                                    errors.first(
                                        'surveyActivateForm.rewardPoints'
                                    )
                                }}
                            </span>
                        </md-field>
                        <md-field
                            v-bind:class="{
                                'md-invalid': errors.has(
                                    'surveyActivateForm.rewardComplete'
                                )
                            }"
                        >
                            <label>Completed</label>
                            <md-input
                                type="number"
                                name="rewardComplete"
                                autocomplete="off"
                                v-model="formData.rewardComplete"
                                v-validate="'required'"
                            />
                            <span class="md-error">
                                {{
                                    errors.first(
                                        'surveyActivateForm.rewardComplete'
                                    )
                                }}
                            </span>
                        </md-field>
                        <md-field
                            v-bind:class="{
                                'md-invalid': errors.has(
                                    'surveyActivateForm.rewardPartialy'
                                )
                            }"
                        >
                            <label>Partially completed</label>
                            <md-input
                                type="number"
                                name="rewardPartialy"
                                autocomplete="off"
                                v-model="formData.rewardPartialy"
                                v-validate="'required'"
                            />
                            <span class="md-error">
                                {{
                                    errors.first(
                                        'surveyActivateForm.rewardPartialy'
                                    )
                                }}
                            </span>
                        </md-field>
                        <md-field
                            v-bind:class="{
                                'md-invalid': errors.has(
                                    'surveyActivateForm.rewardLottery'
                                )
                            }"
                        >
                            <label>Lottery</label>
                            <md-select
                                name="rewardLottery"
                                v-model="formData.rewardLottery"
                            >
                                <md-option
                                    v-for="item in rewardLotteries"
                                    :value="item"
                                    :key="item"
                                >
                                    {{ item }}
                                </md-option>
                            </md-select>
                            <span class="md-error">
                                {{
                                    errors.first(
                                        'surveyActivateForm.rewardLottery'
                                    )
                                }}
                            </span>
                        </md-field>
                    </b-card>
                </b-col>
            </template>
        </b-row>
        <div class="mt-3">
            <b-btn
                :to="{ name: 'Surveys' }"
                variant="outline-brand"
                size="lg"
                class="float-right btn-w200 mr-5 mb-3"
            >
                Cancel
            </b-btn>
            <b-btn
                :to="{ name: 'SurveysStatistics', props: { id: surveyId } }"
                variant="outline-brand"
                size="lg"
                class="float-right btn-w200 mr-5 mb-3"
            >
                Statistics
            </b-btn>
        </div>
    </b-form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'survey-activate-page',
    data() {
        return {
            showCost: false,
            showRewards: false,
            rewardLotteries: ['Available', 'Not available'],
            formData: {
                startDate: null,
                endDate: null,
                maximumResponses: null,
                rewardType: null,
                rewardComplete: null,
                rewardLottery: null,
                rewardPartialy: null,
                rewardPoints: null
            }
        };
    },
    computed: {
        ...mapGetters(['selectedSurveyFolder', 'rewardTypes', 'rewardsList']),
        currentSurvey() {
            return this.$store.getters['surveyById'](this.surveyId);
        },
        surveyId() {
            return this.$route.params.id;
        },
        maxRewardPlayer() {
            return this.formData.rewardComplete;
        },
        maxRewardCampaign() {
            return this.maxRewardPlayer * this.formData.maximumResponses;
        },
        allowance() {
            // TODO get by reward type
            return 10000;
        },
        canActivated() {
            return !(
                this.maxRewardCampaign < this.allowance &&
                +this.formData.startDate < +this.formData.endDate &&
                +new Date() < +this.formData.startDate
            );
        }
    },
    watch: {
        currentSurvey() {
            this.loadSurveyData();
        }
    },
    created() {
        if (this.selectedSurveyFolder === '') {
            return this.$router.push({ name: 'Surveys' });
        }
        this.loadSurveyData();
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('surveyActivateForm').then(result => {
                if (result) {
                    let data = Object.assign({}, this.currentSurvey);
                    data.lifeCycle = Object.assign(
                        {},
                        {
                            startDate: this.formData.startDate,
                            endDate: this.formData.endDate,
                            maximumResponses: this.formData.maximumResponses
                        }
                    );
                    data.rewards = Object.assign(
                        {},
                        {
                            rewardType: this.formData.rewardType,
                            rewardComplete: this.formData.rewardComplete,
                            rewardLottery: this.formData.rewardLottery,
                            rewardPartialy: this.formData.rewardPartialy,
                            rewardPoints: this.formData.rewardPoints
                        }
                    );
                    this.$store.dispatch('updateSurvey', {
                        id: this.currentSurvey.id,
                        data: data
                    });
                }
            });
        },
        loadSurveyData() {
            if (!this.currentSurvey && this.surveyId !== undefined) {
                this.$store.dispatch('getSurvey', this.surveyId);
            } else {
                this.formData.startDate =
                    this.currentSurvey &&
                    this.currentSurvey.lifeCycle &&
                    this.currentSurvey.lifeCycle.startDate
                        ? new Date(this.currentSurvey.lifeCycle.startDate)
                        : null;
                this.formData.endDate =
                    this.currentSurvey &&
                    this.currentSurvey.lifeCycle &&
                    this.currentSurvey.lifeCycle.endDate
                        ? new Date(this.currentSurvey.lifeCycle.endDate)
                        : null;
                this.formData.maximumResponses = this.currentSurvey
                    ? this.currentSurvey.lifeCycle.maximumResponses
                    : null;
                this.formData.rewardType = this.currentSurvey
                    ? this.currentSurvey.rewards.rewardType
                    : null;
                this.formData.rewardComplete = this.currentSurvey
                    ? this.currentSurvey.rewards.rewardComplete
                    : null;
                this.formData.rewardLottery = this.currentSurvey
                    ? this.currentSurvey.rewards.rewardLottery
                    : null;
                this.formData.rewardPartialy = this.currentSurvey
                    ? this.currentSurvey.rewards.rewardPartialy
                    : null;
                this.formData.rewardPoints = this.currentSurvey
                    ? this.currentSurvey.rewards.rewardPoints
                    : null;
                this.$validator.reset();
            }
        }
    }
};
</script>
