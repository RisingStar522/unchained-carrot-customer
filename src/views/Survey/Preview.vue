<template>
    <section class="survey">
        <div class="container">
            <survey :survey="survey" v-if="survey"></survey>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import * as SurveyVue from 'survey-vue';
let Survey = SurveyVue.Survey;
Survey.cssType = 'bootstrap';

import { mapGetters } from 'vuex';

export default {
    name: 'survey-preview-page',
    components: {
        Survey
    },
    data() {
        return {
            surveyId: this.$route.params.id,
            survey: null,
            imageUrls: {
                close: require('../../assets/images/survey/close.png')
            }
        };
    },
    created() {
        this.$store.dispatch('getSurveyById', this.surveyId);
    },
    computed: {
        ...mapGetters(['getSurveyModel', 'getSurveyId', 'myProfileId'])
    },
    watch: {
        getSurveyModel(model) {
            let survey = new SurveyVue.Model(model);
            survey.showProgressBar = 'top';
            survey.showQuestionNumbers = 'off';
            survey.requiredText = '';
            survey.completedHtml = this.getCompletedHtml();
            Vue.set(this, 'survey', survey);
        }
    },
    methods: {
        getCompletedHtml() {
            return (
                "<div class='result-block'>" +
                "<div class='result-close' onclick='window.history.go(-1)'>" +
                "<img src='" +
                this.imageUrls.close +
                "' alt='X'/>" +
                '</div>' +
                "<div class='result-title text-uppercase'>" +
                this.$options.filters.translate(
                    'SURVEY.THANKS_FOR_COMPLETING_SURVEY'
                ) +
                '</div>' +
                '</div>'
            );
        }
    }
};
</script>
<style lang="scss">
@import '../../assets/scss/survey-preview';
</style>
