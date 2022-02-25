<template>
    <div class="app-slidebar">
        <div class="header">
            Quizzes folders
            <span class="btn-icon" v-b-modal.create-folder>
                <fa-icon icon="plus-circle" />
            </span>
        </div>
        <div class="content">
            <ul class="nav">
                <SlideBarNavItem
                    v-for="item in quizFolders"
                    :nav="item"
                    :children="quizzesList"
                    :selected="item.id === selectedQuizFolder"
                    :key="item.id"
                />
            </ul>
        </div>
        <div class="footer">
            <b-btn
                :to="{ name: 'QuizzesNew' }"
                variant="outline-brand"
                size="lg"
                :disabled="selectedQuizFolder === ''"
            >
                Create quiz
            </b-btn>
        </div>
        <CreateFolder :dispatchAction="'createQuizFolder'" />
    </div>
</template>
<script>
import SlideBarNavItem from './SlideBarNavItem';
import CreateFolder from './modals/create-folder';
import { mapGetters } from 'vuex';
export default {
    name: 'slidebar-quiz-component',
    components: {
        SlideBarNavItem,
        CreateFolder
    },
    created() {
        this.$on('toggleFolder', this.toggleFolder);
    },
    computed: {
        ...mapGetters([
            'quizFolders',
            'selectedQuizFolder',
            'quizCompleting',
            'quizzesList'
        ])
    },
    watch: {
        selectedQuizFolder(folder) {
            this.$store.dispatch('getQuizFromFolder', folder);
        }
    },
    methods: {
        toggleFolder(folder) {
            if (this.selectedQuizFolder !== folder && this.quizCompleting) {
                if (confirm('Your changes are not stored, continue?')) {
                    this.$store.commit('SELECT_QUIZ_FOLDER', folder);
                    this.$router.push({ name: 'Quizzes' });
                }
            } else if (this.selectedQuizFolder !== folder) {
                this.$store.commit('SELECT_QUIZ_FOLDER', folder);
                this.$router.push({ name: 'Quizzes' });
            }
        }
    }
};
</script>
