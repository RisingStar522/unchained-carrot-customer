<template>
    <b-form
        class="content"
        @submit.prevent="validateForm"
        data-vv-scope="surveyForm"
    >
        <h3 class="page-header mb-3">
            {{ !surveyId ? 'New' : 'Edit' }} survey
        </h3>
        <b-row>
            <b-col cols="12" md="6">
                <md-field
                    v-bind:class="{
                        'md-invalid': errors.has('surveyForm.name')
                    }"
                >
                    <label>Survey name</label>
                    <md-input
                        type="text"
                        name="surveyName"
                        autocomplete="off"
                        v-model="formData.name"
                        v-validate="'required'"
                    />
                    <span class="md-error">
                        {{ errors.first('surveyForm.surveyName') }}
                    </span>
                </md-field>
            </b-col>
            <b-col cols="12" md="6">
                <md-field
                    v-bind:class="{
                        'md-invalid': errors.has('surveyForm.language')
                    }"
                >
                    <label>Language</label>
                    <md-select
                        name="language"
                        v-model="formData.language"
                        v-validate="'required'"
                    >
                        <md-option
                            v-for="item in languages"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.label }}</md-option
                        >
                    </md-select>
                    <span class="md-error">
                        {{ errors.first('surveyForm.language') }}
                    </span>
                </md-field>
            </b-col>
        </b-row>
        <b-collapse v-model="formDateNameInjection">
            <SurveyCreator />
        </b-collapse>
        <div class="mt-3">
            <b-btn
                type="submit"
                variant="brand"
                size="lg"
                class="float-right btn-w200 mb-3"
            >
                Save
            </b-btn>
            <b-btn
                :to="
                    surveyId
                        ? { name: 'SurveysActivate', params: { id: surveyId } }
                        : { name: 'Surveys' }
                "
                variant="outline-brand"
                size="lg"
                class="float-right btn-w200 mr-5 mb-3"
            >
                Cancel
            </b-btn>
            <b-btn
                @click="previewSurvey"
                variant="outline-brand"
                size="lg"
                class="float-right btn-w200 mr-5 mb-3"
            >
                Preview
            </b-btn>
        </div>
    </b-form>
</template>

<script>
import { mapGetters } from 'vuex';
import SurveyCreator from '../../components/SurveyCreator';

export default {
    name: 'survey-editor-page',
    components: {
        SurveyCreator
    },
    data() {
        const languages = this.$store.state.locales;
        const EnglishId = this.$store.state.locales.filter(
            item => item.label === 'English'
        )[0].id;

        return {
            formDateNameInjection: false,
            languages,
            EnglishId,
            formData: {
                name: null,
                language: EnglishId,
                survey: {}
            }
        };
    },
    computed: {
        ...mapGetters(['selectedSurveyFolder', 'surveyCompleting']),
        currentSurvey() {
            return this.$store.getters['surveyById'](this.surveyId);
        },
        surveyId() {
            return this.$route.params.id;
        }
    },
    beforeDestroy() {
        this.$store.commit('SET_SURVEY_COMPLETING', false);
    },
    updated() {
        this.$store.commit('SET_SURVEY_COMPLETING', true);
    },
    watch: {
        currentSurvey() {
            this.loadSurveyData();
        },
        surveyId() {
            this.loadSurveyData();
        },
        'formData.name': function(val) {
            this.formDateNameInjection = !!val;
        }
    },
    created() {
        if (this.selectedSurveyFolder === '') {
            return this.$router.push({ name: 'Surveys' });
        }
        this.loadSurveyData();
        this.$on('surveyChanged', survey => {
            this.formData.survey = JSON.parse(survey);
        });
    },
    methods: {
        validateForm() {
            return this.$validator.validateAll('surveyForm').then(result => {
                if (result) {
                    if (!this.surveyId) {
                        this.$store.dispatch(
                            'createSurvey',
                            Object.assign(
                                {
                                    folder: this.selectedSurveyFolder
                                },
                                this.formData
                            )
                        );
                        this.$validator.reset();
                    } else {
                        let data = Object.assign({}, this.currentSurvey);
                        data.name = this.formData.name;
                        data.language = this.formData.language;
                        data.survey = this.formData.survey;
                        this.$store.dispatch('updateSurvey', {
                            id: this.currentSurvey.id,
                            data: data
                        });
                    }
                }
                return result;
            });
        },
        loadSurveyData() {
            if (!this.currentSurvey && this.surveyId !== undefined) {
                this.$store.dispatch('getSurvey', this.surveyId);
            } else {
                this.formData.name =
                    this.currentSurvey && this.currentSurvey.id
                        ? this.currentSurvey.name
                        : null;
                this.formData.language =
                    this.currentSurvey && this.currentSurvey.id
                        ? this.currentSurvey.language
                        : this.EnglishId || null;
                this.formData.survey =
                    this.currentSurvey && this.currentSurvey.id
                        ? this.currentSurvey.survey
                        : {};
                setTimeout(() => {
                    this.$emit('setSurveyModel', this.formData.survey);
                }, 0);
                this.$validator.reset();
            }
        },
        async previewSurvey() {
            let isValid = await this.validateForm();
            if (isValid) {
                this.$router.push({
                    name: 'SurveysPreview',
                    params: {
                        id: this.surveyId
                    }
                });
            }
        }
    }
};
</script>
