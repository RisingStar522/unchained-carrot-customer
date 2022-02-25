<template>
    <b-form
        class="content"
        @submit.prevent="validateForm"
        data-vv-scope="quizActivateForm"
        v-if="currentQuiz"
    >
        <h3 class="page-header mb-3">
            {{ currentQuiz.name }}
            <b-btn
                :to="{ name: 'QuizzesEdit', params: { id: quizId } }"
                variant="brand"
                size="sm"
                class="float-right btn-w100"
            >
                Edit
            </b-btn>
        </h3>
        <b-row>
            <b-col cols="12" md="6">
                <b-card>
                    <h3 class="text-center mb-3 text-brand">Activate Quiz</h3>
                    <md-datepicker
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.startDate'
                            )
                        }"
                        v-model="formData.startDate"
                        name="startDate"
                        md-immediately
                        v-validate="'required'"
                    >
                        <label>Start date</label>
                        <span class="md-error">
                            {{ errors.first('quizActivateForm.startDate') }}
                        </span>
                    </md-datepicker>
                    <md-datepicker
                        v-bind:class="{
                            'md-invalid': errors.has('quizActivateForm.endDate')
                        }"
                        v-model="formData.endDate"
                        name="endDate"
                        md-immediately
                        v-validate="'required'"
                    >
                        <label>End date</label>
                        <span class="md-error">
                            {{ errors.first('quizActivateForm.endDate') }}
                        </span>
                    </md-datepicker>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.maximumResponses'
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
                                    'quizActivateForm.maximumResponses'
                                )
                            }}
                        </span>
                    </md-field>
                </b-card>
                <b-card>
                    <h3 class="text-center mb-3 text-brand">Costs</h3>
                    <dl class="text-brand row">
                        <dt class="col-12 col-lg-8">Max reward per player</dt>
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
            </b-col>
            <b-col cols="12" md="6">
                <b-card>
                    <h3 class="text-center mb-1 text-brand">
                        Rewards
                    </h3>
                    <small class="text-center mb-3 text-brand d-block">
                        The rewards set per question
                    </small>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardType'
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
                            {{ errors.first('quizActivateForm.rewardType') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardPoints'
                            )
                        }"
                    >
                        <label>Reward</label>
                        <md-select
                            name="rewardPoints"
                            v-model="formData.rewardPoints"
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
                            {{ errors.first('quizActivateForm.rewardPoints') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardCorrect'
                            )
                        }"
                    >
                        <label>Correct</label>
                        <md-input
                            type="number"
                            name="rewardCorrect"
                            autocomplete="off"
                            v-model="formData.rewardCorrect"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('quizActivateForm.rewardCorrect') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardWith50'
                            )
                        }"
                    >
                        <label>Correct, with 50:50</label>
                        <md-input
                            type="number"
                            name="rewardWith50"
                            autocomplete="off"
                            v-model="formData.rewardWith50"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('quizActivateForm.rewardWith50') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardWithHint'
                            )
                        }"
                    >
                        <label>Correct, with hint</label>
                        <md-input
                            type="number"
                            name="rewardWithHint"
                            autocomplete="off"
                            v-model="formData.rewardWithHint"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{
                                errors.first('quizActivateForm.rewardWithHint')
                            }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardWithAllHelp'
                            )
                        }"
                    >
                        <label>Correct, all help</label>
                        <md-input
                            type="number"
                            name="rewardWithAllHelp"
                            autocomplete="off"
                            v-model="formData.rewardWithAllHelp"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{
                                errors.first(
                                    'quizActivateForm.rewardWithAllHelp'
                                )
                            }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardWrong'
                            )
                        }"
                    >
                        <label>Wrong</label>
                        <md-input
                            type="number"
                            name="rewardWrong"
                            autocomplete="off"
                            v-model="formData.rewardWrong"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('quizActivateForm.rewardWrong') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardMaxScoreBonus'
                            )
                        }"
                    >
                        <label>Max score bonus</label>
                        <md-input
                            type="number"
                            name="rewardMaxScoreBonus"
                            autocomplete="off"
                            v-model="formData.rewardMaxScoreBonus"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{
                                errors.first(
                                    'quizActivateForm.rewardMaxScoreBonus'
                                )
                            }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has(
                                'quizActivateForm.rewardLottery'
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
                            {{ errors.first('quizActivateForm.rewardLottery') }}
                        </span>
                    </md-field>
                </b-card>
            </b-col>
        </b-row>
        <div class="mt-3">
            <b-btn
                type="submit"
                variant="brand"
                size="lg"
                :disabled="isDisabled"
                class="float-right btn-w200 mb-3"
            >
                Activate
            </b-btn>
            <b-btn
                :to="{ name: 'Quizzes' }"
                variant="outline-brand"
                size="lg"
                class="float-right btn-w200 mr-5 mb-3"
            >
                Cancel
            </b-btn>
            <b-btn
                :to="{ name: 'QuizzesStatistics', props: { id: quizId } }"
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
    name: 'quiz-activate-page',
    data() {
        return {
            rewardLotteries: [],
            formData: {
                startDate: null,
                endDate: null,
                maximumResponses: null,
                rewardType: null,
                rewardPoints: null,
                rewardCorrect: null,
                rewardWith50: null,
                rewardWithHint: null,
                rewardWithAllHelp: null,
                rewardWrong: null,
                rewardMaxScoreBonus: null,
                rewardLottery: null
            }
        };
    },
    computed: {
        ...mapGetters(['selectedQuizFolder', 'rewardTypes', 'rewardsList']),
        currentQuiz() {
            return this.$store.getters['quizById'](this.quizId);
        },
        quizId() {
            return this.$route.params.id;
        },
        maxRewardPlayer() {
            let questionsArr = Object.keys(this.currentQuiz.questions).map(
                key => this.currentQuiz.questions[key].length
            );
            return (
                Math.max(...questionsArr) *
                    parseInt(this.formData.rewardCorrect) +
                    parseInt(this.formData.rewardMaxScoreBonus) || 0
            );
        },
        maxRewardCampaign() {
            return this.maxRewardPlayer * this.formData.maximumResponses;
        },
        allowance() {
            // TODO get by reward type
            return 10000;
        },
        isDisabled() {
            return !(
                this.maxRewardCampaign < this.allowance &&
                new Date(this.formData.startDate) <
                    new Date(this.formData.endDate) &&
                new Date(new Date().toDateString()) <=
                    new Date(this.formData.startDate)
            );
        }
    },
    watch: {
        currentQuiz() {
            this.loadQuizData();
        }
    },
    created() {
        if (this.selectedQuizFolder === '') {
            return this.$router.push({ name: 'Quizzes' });
        }
        this.loadQuizData();
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('quizActivateForm').then(result => {
                if (result) {
                    let data = Object.assign({}, this.currentQuiz);
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
                            rewardPoints: this.formData.rewardPoints,
                            rewardCorrect: this.formData.rewardCorrect,
                            rewardWith50: this.formData.rewardWith50,
                            rewardWithHint: this.formData.rewardWithHint,
                            rewardWithAllHelp: this.formData.rewardWithAllHelp,
                            rewardWrong: this.formData.rewardWrong,
                            rewardMaxScoreBonus: this.formData
                                .rewardMaxScoreBonus,
                            rewardLottery: this.formData.rewardLottery
                        }
                    );
                    this.$store.dispatch('updateQuiz', {
                        id: this.currentQuiz.id,
                        data: data
                    });
                }
            });
        },
        loadQuizData() {
            if (!this.currentQuiz && this.quizId !== undefined) {
                this.$store.dispatch('getQuiz', this.quizId);
            } else {
                this.formData.startDate =
                    this.currentQuiz &&
                    this.currentQuiz.lifeCycle &&
                    this.currentQuiz.lifeCycle.startDate
                        ? new Date(this.currentQuiz.lifeCycle.startDate)
                        : null;
                this.formData.endDate =
                    this.currentQuiz &&
                    this.currentQuiz.lifeCycle &&
                    this.currentQuiz.lifeCycle.endDate
                        ? new Date(this.currentQuiz.lifeCycle.endDate)
                        : null;
                this.formData.maximumResponses =
                    this.currentQuiz && this.currentQuiz.lifeCycle
                        ? this.currentQuiz.lifeCycle.maximumResponses
                        : null;
                this.formData.rewardType = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardType
                    : null;
                this.formData.rewardPoints = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardPoints
                    : null;
                this.formData.rewardCorrect = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardCorrect
                    : null;
                this.formData.rewardWith50 = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardWith50
                    : null;
                this.formData.rewardWithHint = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardWithHint
                    : null;
                this.formData.rewardWithAllHelp = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardWithAllHelp
                    : null;
                this.formData.rewardWrong = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardWrong
                    : null;
                this.formData.rewardMaxScoreBonus = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardMaxScoreBonus
                    : null;
                this.formData.rewardLottery = this.currentQuiz
                    ? this.currentQuiz.rewards.rewardLottery
                    : null;
                this.$validator.reset();
            }
        }
    }
};
</script>
