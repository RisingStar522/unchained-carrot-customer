<template>
    <div id="surveyCreatorContainer" class="col-12"></div>
</template>

<script>
import * as SurveyCreator from 'survey-creator';
import './survey-creator.css';

import * as SurveyKo from 'survey-knockout';
import * as widgets from 'surveyjs-widgets';

widgets.icheck(SurveyKo);
widgets.select2(SurveyKo);
widgets.jquerybarrating(SurveyKo);
//widgets.jqueryuidatepicker(SurveyKo);
widgets.select2tagbox(SurveyKo);

export default {
    name: 'survey-creator',
    data() {
        return {
            options: {
                showEmbededSurveyTab: false,
                showTestSurveyTab: false,
                showJSONEditorTab: false,
                showOptions: false,
                questionTypes: [
                    'boolean',
                    'checkbox',
                    'comment',
                    'dropdown',
                    'expression',
                    'file',
                    'html',
                    'matrix',
                    'matrixdropdown',
                    'multipletext',
                    'radiogroup',
                    'rating',
                    'text'
                ],
                isAutoSave: true
            }
        };
    },
    created() {
        this.$parent.$on('setSurveyModel', model => {
            this.surveyCreator.text = JSON.stringify(model);
        });
        window.handleSaveSurvey = val => {
            this.$parent.$emit('surveyChanged', val);
        };
    },
    mounted() {
        this.surveyCreator = new SurveyCreator.SurveyCreator(
            'surveyCreatorContainer',
            this.options
        );
        this.surveyCreator.saveSurveyFunc = function() {
            window.handleSaveSurvey(this.text);
        };
    }
};
</script>

<style>
.svd_container .svd_content .svd_toolbar {
    position: relative;
}
</style>
