<template>
    <div class="content">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="page-header ">
                {{ !reviewId ? 'Add' : 'Edit' }} review
            </h3>

            <div class="d-flex justify-content-end  my-3" style="min-width:50%">
                <b-btn
                    v-if="reviewId"
                    @click="deleteReview"
                    variant="danger"
                    style="height:2.5rem"
                    class="mr-2"
                    >Delete review</b-btn
                >

                <b-btn
                    :disabled="!reviewSaved"
                    v-b-modal.generateHTML-modal
                    variant="brand"
                    :title="!reviewSaved ? 'Save the review first!' : ''"
                    style="height:2.5rem"
                    class="mr-2"
                    >Generate HTML</b-btn
                >
                <b-btn
                    variant="brand"
                    v-if="reviewId"
                    :to="{
                        name: 'QuicksightDashboard',
                        params: { id: $route.params.id }
                    }"
                    v-feature-flipping="'Quicksight'"
                    style="height:2.5rem"
                    >View Dashboard</b-btn
                >
            </div>
        </div>
        <b-form class>
            <div>
                <div class="row d-flex">
                    <div class="col-md-6 col-sm-12">
                        <b-form-group
                            label="Review Name"
                            label-for="review-name"
                            label-cols-sm="4"
                        >
                            <b-form-input
                                v-model="review.reviewName"
                                id="review-name"
                                v-validate="'required|alpha_spaces'"
                                name="review-name"
                            ></b-form-input>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect('review-name')"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b-form-group
                            label="Event Name"
                            label-for="event-name"
                            label-cols-sm="4"
                        >
                            <b-form-input
                                v-validate="'required|alpha_spaces'"
                                v-model="review.eventName"
                                id="event-name"
                                name="event-name"
                                placeholder="e.g. myreview-response"
                            ></b-form-input>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect('event-name')"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b-form-group
                            label="Language"
                            label-for="language"
                            label-cols-sm="4"
                        >
                            <b-form-select
                                v-validate="'required'"
                                v-model="review.language"
                                :options="language"
                                name="language"
                            ></b-form-select>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect('language')"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b-form-group
                            label="Review Type"
                            label-for="review-type"
                            label-cols-sm="4"
                        >
                            <b-form-select
                                v-validate="'required'"
                                v-model="review.reviewType"
                                :options="reviewType"
                                name="review-type"
                            ></b-form-select>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect('review-type')"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b-form-group
                            label="Options"
                            label-for="options"
                            label-cols-sm="4"
                        >
                            <b-form-select
                                v-validate="'required'"
                                name="review-option"
                                v-model="review.reviewOption"
                                :options="reviewOptions"
                                :disabled="!review.reviewType"
                            ></b-form-select>
                            <span
                                class="text-danger"
                                v-for="error in errors.collect('review-option')"
                                :key="error"
                                >{{ error }}</span
                            >
                        </b-form-group>
                    </div>

                    <div v-show="review.reviewType" class="col-md-6 col-sm-12">
                        <b-form-group
                            label="Icon Set"
                            label-for="icon-set"
                            label-cols-sm="4"
                        >
                            <Iconset
                                ref="iconsetComponent"
                                id="icon-set"
                                :icons="icons"
                                :setIcon="review.selectedIcon"
                                @iconSelected="iconSelected"
                            />
                        </b-form-group>
                    </div>
                </div>
                <div v-if="review.reviewOption">
                    <h3 class="page-header mb-3">
                        Configure where the user will be redirected to:
                    </h3>
                    <b-card bg-variant="light">
                        <div class="row d-flex">
                            <div class="col-md-6 col-sm-12">
                                <h4 class="page-header mb-3">Options:</h4>
                                <b-form-group>
                                    <template v-slot:label>
                                        <b-form-checkbox
                                            v-model="allSelected"
                                            :indeterminate="indeterminate"
                                            aria-describedby="optionsArray"
                                            aria-controls="optionsArray"
                                            @change="toggleAll"
                                        >
                                            {{
                                                allSelected
                                                    ? 'Un-select All'
                                                    : 'Select All'
                                            }}
                                        </b-form-checkbox>
                                    </template>

                                    <b-form-checkbox-group
                                        v-validate="'required'"
                                        id="options"
                                        name="options"
                                        v-model="selectedOptions"
                                        class="ml-4"
                                        aria-label="Individual options"
                                        stacked
                                        @change="chooseOption"
                                    >
                                        <b-form-checkbox
                                            v-for="(option, i) in optionsArray"
                                            :class="
                                                review.redirectTo[option]
                                                    ? 'was-validated'
                                                    : ''
                                            "
                                            :key="`option${i}`"
                                            :value="option"
                                        >
                                            {{ option }}
                                            <b-badge
                                                :id="`option${i}`"
                                                class="d-block"
                                                v-if="review.redirectTo[option]"
                                                variant="primary"
                                            >
                                                {{
                                                    `${
                                                        review.redirectTo[
                                                            option
                                                        ].redirectType
                                                    } - ${
                                                        review.redirectTo[
                                                            option
                                                        ].text.length > 50
                                                            ? review.redirectTo[
                                                                  option
                                                              ].text.substring(
                                                                  0,
                                                                  50
                                                              ) + '...'
                                                            : review.redirectTo[
                                                                  option
                                                              ].text
                                                    }`
                                                }}
                                                <b-tooltip
                                                    :target="`option${i}`"
                                                    triggers="hover"
                                                >
                                                    {{
                                                        review.redirectTo[
                                                            option
                                                        ].text
                                                    }}
                                                </b-tooltip>
                                            </b-badge>
                                        </b-form-checkbox>
                                    </b-form-checkbox-group>
                                    <template v-if="formSubmited">
                                        <span
                                            class="text-danger"
                                            v-for="error in errors.collect(
                                                'options'
                                            )"
                                            :key="error"
                                            >{{ error }}</span
                                        >
                                    </template>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div v-if="indeterminate || allSelected">
                                    <h4 class="page-header mb-3">
                                        Redirect to:
                                    </h4>
                                    <b-form-radio-group
                                        name="redirect-option"
                                        v-model="selectedRedirectType"
                                        :checked="selectedRedirectType"
                                    >
                                        <div class="d-flex mb-3">
                                            <b-form-radio
                                                class="mr-3"
                                                v-model="
                                                    review.selectedRedirectToOption
                                                "
                                                name="survey"
                                                value="survey"
                                            ></b-form-radio>

                                            <b-form-select
                                                v-model="review.survey"
                                                :options="surveys"
                                            >
                                                <template v-slot:first>
                                                    <b-form-select-option
                                                        :value="null"
                                                        disabled
                                                    >
                                                        -- Delivery survey --
                                                    </b-form-select-option>
                                                </template>
                                            </b-form-select>
                                        </div>

                                        <div class="d-flex mb-3">
                                            <b-form-radio
                                                class="mr-3"
                                                v-model="
                                                    review.selectedRedirectToOption
                                                "
                                                name="quiz"
                                                value="quiz"
                                            ></b-form-radio>

                                            <b-form-select
                                                v-model="review.quiz"
                                                :options="quizzes"
                                            >
                                                <template v-slot:first>
                                                    <b-form-select-option
                                                        :value="null"
                                                        disabled
                                                    >
                                                        -- Super Easy Quiz --
                                                    </b-form-select-option>
                                                </template>
                                            </b-form-select>
                                        </div>

                                        <div class="d-flex mb-3">
                                            <b-form-radio
                                                class="mr-3"
                                                v-model="
                                                    review.selectedRedirectToOption
                                                "
                                                name="url"
                                                value="url"
                                            ></b-form-radio>

                                            <b-form-input
                                                v-validate="'url'"
                                                name="url"
                                                v-model="review.url"
                                                id="url"
                                                type="url"
                                            ></b-form-input>
                                            <span
                                                class="text-danger"
                                                v-for="error in errors.collect(
                                                    'url'
                                                )"
                                                :key="error"
                                                >{{ error }}</span
                                            >
                                        </div>
                                    </b-form-radio-group>
                                </div>
                            </div>
                        </div>
                    </b-card>
                </div>

                <h3 class="page-header mb-3">Rewards</h3>

                <div class="row d-flex">
                    <div class="col-md-6 col-sm-12">
                        <b-card bg-variant="light">
                            <b-form-group
                                label="Reward Type"
                                label-for="reward-type"
                                label-cols-sm="4"
                            >
                                <b-form-select
                                    v-validate="'required'"
                                    v-model="review.rewardType"
                                    :options="rewardTypes"
                                    name="reward-type"
                                ></b-form-select>
                                <span
                                    class="text-danger"
                                    v-for="error in errors.collect(
                                        'reward-type'
                                    )"
                                    :key="error"
                                    >{{ error }}</span
                                >
                            </b-form-group>

                            <!-- <b-form-group
                                label="Point"
                                label-for="point"
                                label-cols-sm="4"
                            >
                                <b-form-select
                                    name="point"
                                    v-model="review.point"
                                    :options="rewardsList"
                                ></b-form-select>
                                <span
                                    class="text-danger"
                                    v-for="error in errors.collect('point')"
                                    :key="error"
                                    >{{ error }}</span
                                >
                            </b-form-group> -->

                            <b-form-group
                                label="Responded"
                                label-for="responded"
                                label-cols-sm="4"
                            >
                                <b-form-input
                                    v-validate="'required'"
                                    name="responded"
                                    v-model="review.rewardAmount"
                                    id="responded"
                                    type="number"
                                ></b-form-input>
                                <span
                                    class="text-danger"
                                    v-for="error in errors.collect('responded')"
                                    :key="error"
                                    >{{ error }}</span
                                >
                            </b-form-group>
                        </b-card>
                    </div>

                    <div
                        class="col-md-6 col-sm-12 d-flex flex-column justify-content-between align-items-end"
                    >
                        <div class="d-flex justify-items-end">
                            <b-btn
                                :to="{ name: 'ReviewByMe' }"
                                class="mr-4"
                                variant="outline-brand"
                                >Cancel</b-btn
                            >
                            <b-btn
                                :disabled="
                                    !review.reviewName ||
                                        errors.items.length > 0 ||
                                        loading
                                "
                                @click="submitReview"
                                variant="brand"
                            >
                                {{ !reviewId ? 'Save' : 'Update' }}
                                <b-spinner v-if="loading" small></b-spinner>
                                <span class="sr-only">Loading...</span>
                            </b-btn>
                        </div>
                    </div>
                </div>
            </div>
        </b-form>

        <GenerateHTMLModal
            @onIconSetChanged="onIconSetChanged"
            :setIcon="review.selectedIcon"
            :icons="icons"
            :optionsArray="optionsArray"
            :reviewId="$route.params.id"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Iconset from './components/Iconset';
import GenerateHTMLModal from '@/components/Modals/generate-html';

export default {
    name: 'review-editor-page',
    components: {
        Iconset,
        GenerateHTMLModal
    },
    data() {
        return {
            formSubmited: false,
            loading: false,
            reviewSaved: false,
            optionsArray: [],
            selectedOptions: [],
            selectedRedirectType: '',
            allSelected: false,
            indeterminate: false,
            review: {
                reviewName: '',
                language: 'English',
                folderId: '',
                images: [],
                reviewType: '',
                reviewOption: '',
                rewardType: '',
                // point: '',
                eventName: '',
                survey: null,
                quiz: null,
                url: null,
                selectedRedirectToOption: '',
                icons: [],
                selectedIcon: null,
                redirectTo: {}, // {option:  { redirectType: 'survey', id: 'sdd'}}
                quizIds: [],
                surveyIds: [],
                redirectUrls: [],
                rewardAmount: '',
                reviewId: ''
            },
            language: ['English', 'Dutch', 'Italian'],
            reviewType: ['NPS', 'UpDown', 'Stars', 'Happiness', 'Custom'],
            reviewOptions: [],
            surveys: [],
            quizzes: [],
            icons: []
        };
    },
    computed: {
        checkAllOptions() {
            const surveyIdsArrayLength = this.review.surveyIds.length;
            const quizIdsArrayLength = this.review.quizIds.length;
            const redirectUrlsArrayLength = this.review.redirectUrls.length;
            const options = this.review.options;
            return surveyIdsArrayLength === options &&
                quizIdsArrayLength === options &&
                redirectUrlsArrayLength === options
                ? true
                : false;
        },
        reviewId() {
            return this.$route.params.id;
        },
        ...mapGetters([
            'iconSets',
            'rewardTypes',
            'rewardsList',
            'selectedReviewFolder',
            'getAllSurveys',
            'allQuizzes'
        ])
    },
    watch: {
        ['reviewId'](newVal) {
            if (this.reviewId && this.reviewId.length > 0) {
                this.getReviewById(newVal);
            }
        },
        ['review.reviewType'](newVal) {
            this.toggleOptions(newVal);
            this.createOptionsArray();
        },
        ['review.url'](newVal) {
            this.chooseUrl(newVal);
        },
        ['review.survey'](newVal) {
            this.chooseRedirectType(newVal);
        },
        ['review.quiz'](newVal) {
            this.chooseRedirectType(newVal);
        },
        allSelected() {
            this.fetchRedirectToDropdowns();
        },
        indeterminate() {
            this.fetchRedirectToDropdowns();
        },

        ['review.language']() {
            if (this.review.selectedIcon && this.review.selectedIcon.images) {
                this.filterIconSetsByLanguage();
                this.createOptionsArray();
            }
        },
        ['review.reviewOption']() {
            this.filterIconSetsByLanguage();
            this.createOptionsArray();
        },
        selectedOptions(newVal) {
            // Handle changes in individual flavour checkboxes
            if (newVal.length === 0) {
                this.indeterminate = false;
                this.allSelected = false;
            } else if (newVal.length === this.optionsArray.length) {
                this.indeterminate = false;
                this.allSelected = true;
            } else {
                this.indeterminate = true;
                this.allSelected = false;
            }
        }
    },
    methods: {
        createRedirectToArrays() {
            const allRedirectToItems = Object.values(this.review.redirectTo);

            this.review.surveyIds = [];
            this.review.quizIds = [];
            this.review.redirectUrls = [];

            allRedirectToItems.map(item => {
                if (item.redirectType === 'survey') {
                    this.review.surveyIds.push(item.id);
                    this.review.quizIds.push('null');
                    this.review.redirectUrls.push('null');
                } else if (item.redirectType === 'quiz') {
                    this.review.quizIds.push(item.id);
                    this.review.surveyIds.push('null');
                    this.review.redirectUrls.push('null');
                } else if (item.redirectType === 'url') {
                    this.review.redirectUrls.push(item.url);
                    this.review.surveyIds.push('null');
                    this.review.quizIds.push('null');
                }
            });
        },
        deleteReview() {
            if (
                window.confirm(
                    'Are you sure you want to delete this review? It cannot be undone.'
                )
            ) {
                this.$store
                    .dispatch('deleteReview', this.reviewId)
                    .then(resp => {
                        this.$notify({
                            title: 'Success',
                            text: `${resp.name} deleted successfully!`,
                            type: 'success'
                        });
                        this.$router.push({ name: 'ReviewByMe' });
                    })
                    .catch(err => {
                        this.$notify({
                            title: err.response.data.name,
                            text: err.response.data.reason,
                            type: 'error'
                        });
                    });
            }
        },
        getReviewById(id) {
            this.$store
                .dispatch('getReview', id)
                .then(async resp => {
                    const {
                        redirectUrls,
                        surveyIds,
                        quizIds,
                        eventName,
                        folderId,
                        images,
                        options,
                        reviewName,
                        reviewType,
                        rewardAmount,
                        rewardName
                    } = resp;
                    this.review.redirectUrls = redirectUrls;
                    this.review.surveyIds = surveyIds;
                    this.review.quizIds = quizIds;
                    this.review.eventName = eventName;
                    this.review.folderId = folderId;
                    this.review.images = images;
                    this.review.options = options;
                    this.review.reviewName = reviewName;
                    this.review.reviewType = reviewType;
                    this.review.rewardAmount = rewardAmount;
                    this.review.rewardType = rewardName;

                    this.createOptionsArray();

                    for (let i = 0; i < this.optionsArray.length; i++) {
                        if (this.review.surveyIds[i] !== 'null') {
                            const { result } = await this.$store.dispatch(
                                'getSurvey',
                                this.review.surveyIds[i]
                            );

                            this.review.redirectTo[this.optionsArray[i]] = {
                                id: this.review.surveyIds[i],
                                redirectType: 'survey',
                                text: result.title
                            };
                        } else if (this.review.quizIds[i] !== 'null') {
                            const { result } = await this.$store.dispatch(
                                'getQuiz',
                                this.review.quizIds[i]
                            );
                            this.review.redirectTo[this.optionsArray[i]] = {
                                id: this.review.quizIds[i],
                                redirectType: 'quiz',
                                text: result.title
                            };
                        } else if (this.review.redirectUrls[i] !== 'null') {
                            this.review.redirectTo[this.optionsArray[i]] = {
                                url: this.review.redirectUrls[i],
                                redirectType: 'url',
                                text: this.review.redirectUrls[i]
                            };
                        }

                        this.$nextTick(() => {
                            this.selectedOptions = Object.keys(
                                this.review.redirectTo
                            );
                            this.$forceUpdate();
                        });
                    }
                })
                .catch(err => {
                    this.$notify({
                        title: err.response.data.name,
                        text: err.response.data.reason,
                        type: 'error'
                    });
                });
        },
        onIconSetChanged(payload) {
            this.review.selectedIcon = Object.assign(
                {},
                this.review.selectedIcon,
                payload
            );
        },
        iconSelected(iconset) {
            // Look for the entire iconset object
            const icon = this.icons.filter(
                obj => obj.iconsetId == iconset.iconsetId
            );
            this.review.selectedIcon = icon[0];
        },
        chooseUrl(url) {
            this.selectedRedirectType = 'url';
            // map each selected option
            this.selectedOptions.map(option => {
                this.review.redirectTo[option] = {
                    url,
                    redirectType: 'url',
                    text: url
                };
            });
        },
        fetchRedirectToDropdowns() {
            this.surveys = this.createSurveysList();

            this.quizzes = this.createQuizzesList();
        },
        createQuizzesList() {
            const modelQuizzesList = this.allQuizzes.map(({ _id, title }) => {
                return {
                    value: {
                        id: _id,
                        redirectType: 'quiz',
                        text: title
                    },
                    text: title
                };
            });

            return modelQuizzesList;
        },
        createSurveysList() {
            const modelAllSurveysList = this.getAllSurveys.map(
                ({ _id, title }) => {
                    return {
                        value: {
                            id: _id,
                            redirectType: 'survey',
                            text: title
                        },
                        text: title
                    };
                }
            );

            return modelAllSurveysList;
        },
        submitReview() {
            this.formSubmited = true;
            // If reviewId exists, update the review
            if (this.reviewId && this.reviewId.length > 0) {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.loading = true;

                        this.createRedirectToArrays();
                        this.$store
                            .dispatch('updateReview', {
                                id: this.reviewId,
                                data: this.review
                            })
                            .then(() => {
                                this.$notify({
                                    title: 'Success',
                                    text: 'Review updated successfully!',
                                    type: 'success'
                                });
                                this.reviewSaved = true;
                                this.loading = false;
                            })
                            .catch(err => {
                                this.$notify({
                                    title: err.response.data.name,
                                    text: err.response.data.reason,
                                    type: 'error'
                                });
                                this.loading = false;
                            });
                    }
                });
            } else {
                // else add new review
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.loading = true;
                        this.createRedirectToArrays();

                        this.$store
                            .dispatch('addReview', this.review)
                            .then(resp => {
                                this.review.reviewId = resp.id;
                                this.$notify({
                                    title: 'Success',
                                    text: `${resp.name} added successfully!`,
                                    type: 'success'
                                });
                                this.reviewSaved = true;
                                this.loading = false;
                                this.$router.push(resp.link);
                            })
                            .catch(err => {
                                this.$notify({
                                    title: err.response.data.name,
                                    text: err.response.data.reason,
                                    type: 'error'
                                });
                                this.loading = false;
                            });
                    }
                });
            }
        },
        chooseRedirectType({ id, redirectType, text }) {
            this.selectedRedirectType = redirectType;

            // map each selected option
            this.selectedOptions.map(option => {
                this.review.redirectTo[option] = {
                    id,
                    redirectType,
                    text
                };
            });
        },
        chooseOption() {
            this.selectedRedirectType = '';
        },
        filterIconSetsByLanguage() {
            const icons = this.iconSets.filter(
                iconset =>
                    iconset.options === this.review.reviewOption &&
                    iconset.reviewType === this.review.reviewType
            );
            this.icons = icons;
            let images = [];
            let tooltip = '';

            icons.map(icon => {
                return (images = icon.images.map(image => {
                    const imgUrl = image.url;
                    if (this.review.language === 'English') {
                        tooltip = image.label[0].en;
                        const imageItem = {
                            imgUrl,
                            tooltip
                        };
                        return imageItem;
                    } else if (this.review.language === 'Dutch') {
                        tooltip = image.label[1].nl;
                        const imageItem = {
                            imgUrl,
                            tooltip
                        };
                        return imageItem;
                    } else if (this.review.language === 'Italian') {
                        tooltip = image.label[1].it;
                        const imageItem = {
                            imgUrl,
                            tooltip
                        };

                        return imageItem;
                    }
                }));
            });

            this.review.images = images;
        },
        toggleAll(checked) {
            this.selectedOptions = checked ? this.optionsArray.slice() : [];
        },
        createOptionsArray() {
            this.optionsArray = [];
            this.selectedOptions = [];

            const iconsetWithMatchingOption = this.iconSets.filter(ic => {
                return ic.options == this.review.reviewOption;
            });

            iconsetWithMatchingOption.map(ic => {
                ic.images;
            });

            this.optionsArray = this.review.images.map(image => {
                return image.tooltip;
            });
        },
        toggleOptions(value) {
            switch (value) {
                case 'NPS':
                    this.review.reviewOption = 10;
                    this.reviewOptions = [10, 11];
                    this.createOptionsArray();
                    this.filterIconSetsByLanguage();
                    break;
                case 'UpDown':
                    this.review.reviewOption = 2;
                    this.reviewOptions = [2];
                    this.createOptionsArray();
                    this.filterIconSetsByLanguage();
                    break;
                case 'Stars':
                    this.review.reviewOption = 3;
                    this.reviewOptions = [3, 5];
                    this.createOptionsArray();
                    this.filterIconSetsByLanguage();
                    break;
                case 'Happiness':
                    this.review.reviewOption = 5;
                    this.reviewOptions = [3, 5];
                    this.createOptionsArray();
                    this.filterIconSetsByLanguage();
                    break;
                case 'Custom':
                    this.review.reviewOption = 2;
                    this.reviewOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                    this.createOptionsArray();
                    this.filterIconSetsByLanguage();
                    break;
                default:
                    this.review.reviewOption = '';
                    break;
            }
        }
    },
    created() {
        this.$store.dispatch('getIconSets');
        this.$store.dispatch('getAllSurveys');
        this.$store.dispatch('getAllQuizzes');
    },
    mounted() {
        this.createOptionsArray();
        this.review.folderId = this.selectedReviewFolder;
        if (this.reviewId) {
            this.getReviewById(this.reviewId);
            this.reviewSaved = true;
        }
    },
    updated() {
        if (this.reviewId) {
            this.reviewSaved = true;
        }
    }
};
</script>
