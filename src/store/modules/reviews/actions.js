import ReviewFoldersAPI from '../../../api/ReviewFoldersAPI';
import ReviewsAPI from '../../../api/ReviewsAPI';
import ReviewFoldersTransformer from '../../../transformers/ReviewFoldersTransformer';
import ReviewTransformer from '../../../transformers/ReviewTransformer';
export default {
    getReviewFromFolder({ commit }, folder) {
        commit('CLEAR_REVIEW_LIST');
        new ReviewsAPI()
            .getReviews({ folderId: folder })
            .then(resp => {
                commit(
                    'SET_REVIEWS',
                    ReviewFoldersTransformer.fetchCollections(resp.data)
                );
                commit(
                    'SET_REVIEW_LIST',
                    ReviewTransformer.fetchList(resp.data)
                );
            })
            .catch(err => {});
    },
    getAllReviewFolders({ commit }) {
        commit('CLEAR_REVIEW_LIST');
        new ReviewFoldersAPI()
            .getAllReviewFolders()
            .then(resp => {
                commit(
                    'SET_FOLDERS',
                    ReviewFoldersTransformer.fetchCollections(resp.data)
                );
                if (resp.data[0] && resp.data[0]._id) {
                    commit('SELECT_REVIEW_FOLDER', resp.data[0]._id);
                }
            })
            .catch(err => {});
    },
    createReviewFolder({ commit }, data) {
        const payload = ReviewFoldersTransformer.send(data);

        return new Promise((resolve, reject) => {
            new ReviewFoldersAPI()
                .createFolder(payload)
                .then(resp => {
                    const folder = ReviewFoldersTransformer.fetch(resp);

                    commit('ADD_REVIEW_FOLDERS', folder);
                    resolve(folder);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    getIconSets({ commit }) {
        new ReviewsAPI()
            .getIconSets()
            .then(resp => {
                commit('ADD_ICONSETS', resp.data);
            })
            .catch(err => {});
    },
    addReview({ commit }, data) {
        const review = ReviewTransformer.sendReview(data);
        return new Promise((resolve, reject) => {
            new ReviewsAPI()
                .addReview(review)
                .then(resp => {
                    const review = ReviewTransformer.fetch(resp);
                    commit('ADD_REVIEW_TO_REVIEW_LIST', review);
                    resolve(review);
                })
                .catch(err => reject(err));
        });
    },
    getReview({ commit }, id) {
        return new Promise((resolve, reject) => {
            new ReviewsAPI()
                .getReview(id)
                .then(resp => resolve(resp))
                .catch(err => {
                    reject(err);
                });
        });
    },
    updateReview({ commit }, { id, data }) {
        return new Promise((resolve, reject) => {
            new ReviewsAPI()
                .updateReview(id, data)
                .then(resp => {
                    const updatedReview = ReviewTransformer.fetch(resp);
                    commit('UPDATE_REVIEW_IN_REVIEW_LIST', updatedReview);
                    resolve(updatedReview);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deleteReview({ commit }, id) {
        return new Promise((resolve, reject) => {
            new ReviewsAPI()
                .deleteReview(id)
                .then(resp => {
                    const review = ReviewTransformer.fetch(resp);
                    commit('REMOVE_REVIEW_FROM_REVIEW_LIST', review);
                    resolve(review);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deleteReviewFolder({ commit }, reviewFolderId) {
        return new Promise((resolve, reject) => {
            new ReviewFoldersAPI()
                .deleteFolder(reviewFolderId)
                .then(resp => {
                    const reviewFolder = ReviewFoldersTransformer.fetch(resp);
                    commit(
                        'REMOVE_REVIEW_FOLDER_FROM_FOLDERS_LIST',
                        reviewFolder
                    );
                    resolve(reviewFolder);
                })
                .catch(err => reject(err));
        });
    }
};
