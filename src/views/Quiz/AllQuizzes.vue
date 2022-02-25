<template>
    <div class="content">
        <h3 class="page-header">
            Please select a quiz or create a new one
        </h3>
    </div>
</template>

<script>
export default {
    name: 'quizzes-page',
    components: {},
    created() {
        this.$store.dispatch('getAllQuizFolders');
    }
};
</script>
