<template>
    <div class="content">
        <h3 class="page-header">
            Please select a survey or create a new one
        </h3>
    </div>
</template>

<script>
export default {
    name: 'surveys-page',
    components: {},
    created() {
        if (this.$store.getters['surveyFolders'].length === 0) {
            this.$store.dispatch('getAllSurveyFolders');
        }
    }
};
</script>
