<template>
    <div class="app-slidebar">
        <div class="header">
            Survey folders
            <span class="btn-icon" v-b-modal.create-folder>
                <fa-icon icon="plus-circle" />
            </span>
        </div>
        <div class="content">
            <ul class="nav">
                <SlideBarNavItem
                    v-for="item in surveyFolders"
                    :nav="item"
                    :children="surveyList"
                    :selected="item.id === selectedSurveyFolder"
                    :key="item.id"
                />
            </ul>
        </div>
        <div class="footer">
            <b-btn
                :to="{ name: 'SurveysNew' }"
                variant="outline-brand"
                size="lg"
                :disabled="selectedSurveyFolder === ''"
            >
                Create survey
            </b-btn>
        </div>
        <CreateFolder :dispatchAction="'createSurveyFolder'" />
    </div>
</template>
<script>
import SlideBarNavItem from './SlideBarNavItem';
import CreateFolder from './modals/create-folder';
import { mapGetters } from 'vuex';
export default {
    name: 'slidebar-survey-component',
    components: {
        SlideBarNavItem,
        CreateFolder
    },
    created() {
        this.$on('toggleFolder', this.toggleFolder);
    },
    computed: {
        ...mapGetters([
            'surveyFolders',
            'selectedSurveyFolder',
            'surveyCompleting',
            'surveyList'
        ])
    },
    watch: {
        selectedSurveyFolder(folder) {
            this.$store.dispatch('getSurveyFromFolder', folder);
        }
    },
    methods: {
        toggleFolder(folder) {
            if (this.selectedSurveyFolder !== folder && this.surveyCompleting) {
                if (confirm('Your changes are not stored, continue?')) {
                    this.$store.commit('SELECT_SURVEY_FOLDER', folder);
                    this.$router.push({ name: 'Surveys' });
                }
            } else if (this.selectedSurveyFolder !== folder) {
                this.$store.commit('SELECT_SURVEY_FOLDER', folder);
                this.$router.push({ name: 'Surveys' });
            }
        }
    }
};
</script>
