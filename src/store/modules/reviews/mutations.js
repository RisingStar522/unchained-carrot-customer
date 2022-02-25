import Vue from 'vue';

export default {
    ADD_FOLDER(state, payload) {
        state.folders = [...state.folders, payload];
    },
    ADD_REVIEW_FOLDERS(state, data) {
        state.folders = [data, ...state.folders];
    },
    SET_FOLDERS(state, payload) {
        state.folders = payload;
    },
    SELECT_REVIEW_FOLDER(state, id) {
        state.selectedFolder = id;
    },
    CLEAR_REVIEW_LIST(state) {
        state.reviewList = [];
    },
    SET_REVIEW_LIST(state, data) {
        state.reviewList = data;
    },
    SET_REVIEWS(state, data) {
        for (let i in data) {
            Vue.set(state.reviews, data[i].id, data[i]);
        }
    },
    ADD_ICONSETS(state, data) {
        state.iconSets = data;
    },
    ADD_REVIEW_TO_REVIEW_LIST(state, review) {
        state.reviewList = [review, ...state.reviewList];
    },
    UPDATE_REVIEW_IN_REVIEW_LIST(state, updatedReview) {
        const reviewListWithoutOldreview = state.reviewList.filter(
            review => review.id !== updatedReview.id
        );
        state.reviewList = [updatedReview, ...reviewListWithoutOldreview];
    },
    REMOVE_REVIEW_FROM_REVIEW_LIST(state, review) {
        state.reviewList = state.reviewList.filter(
            item => item.id !== review.id
        );
    },
    REMOVE_REVIEW_FOLDER_FROM_FOLDERS_LIST(state, reviewFolder) {
        state.folders = state.folders.filter(
            item => item.id !== reviewFolder.id
        );
    }
};
