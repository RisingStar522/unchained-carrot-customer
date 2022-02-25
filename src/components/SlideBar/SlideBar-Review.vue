<template>
    <div class="app-slidebar">
        <div class="header">
            Review folders
            <span class="btn-icon btn-outline" v-b-modal.create-folder>
                <fa-icon class="addIcon" icon="plus-circle" />
            </span>
        </div>
        <div class="content">
            <ul class="nav">
                <SlideBarNavItem
                    v-for="item in reviewFolders"
                    :nav="item"
                    :children="reviewList"
                    :selected="item.id === selectedReviewFolder"
                    :key="item.id"
                />
            </ul>
        </div>
        <div class="footer">
            <b-btn
                :to="{ name: 'ReviewsNew' }"
                variant="outline-brand"
                size="lg"
                :disabled="selectedReviewFolder === ''"
            >
                {{ $route.params.id ? 'Copy Review' : 'Add Review' }}
            </b-btn>
        </div>
        <CreateFolder :dispatchAction="'createReviewFolder'" />
    </div>
</template>

<script>
import SlideBarNavItem from './SlideBarNavItem';
import CreateFolder from './modals/create-folder';
import { mapGetters } from 'vuex';

export default {
    name: 'slidebar-review-component',
    components: {
        SlideBarNavItem,
        CreateFolder
    },
    created() {
        this.$on('toggleFolder', this.toggleFolder);

        if (this.$store.getters['reviewFolders'].length === 0) {
            this.$store.dispatch('getAllReviewFolders');
        }
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'reviewFolders',
            'selectedReviewFolder',
            'reviewList',
            'reviewCompleting'
        ])
    },
    watch: {
        selectedReviewFolder(folder) {
            this.$store.dispatch('getReviewFromFolder', folder);
        }
    },
    methods: {
        toggleFolder(folder) {
            if (this.selectedReviewFolder !== folder && this.reviewCompleting) {
                if (confirm('Your changes are not stored, continue?')) {
                    this.$store.commit('SELECT_REVIEW_FOLDER', folder);
                    this.$router.push({
                        name: 'ReviewsFolder',
                        params: { folder }
                    });
                }
            } else if (this.selectedReviewFolder !== folder) {
                this.$store.commit('SELECT_REVIEW_FOLDER', folder);
                this.$router.push({
                    name: 'ReviewsFolder',
                    params: { folder }
                });
            }
        }
    }
};
</script>

<style scoped>
.app-slidebar .header .btn-icon:hover {
    color: #797a88;
}
</style>
