<template>
    <b-form @submit.prevent="validateQuestion" data-vv-scope="questionEdit">
        <b-row>
            <b-col cols="12" md="6" class="mt-3">
                <md-field
                    v-bind:class="{
                        'md-invalid': errors.has('questionEdit.questionText')
                    }"
                >
                    <label>Question</label>
                    <md-input
                        data-vv-as="question"
                        type="text"
                        name="questionText"
                        autocomplete="off"
                        :disabled="isDisabled"
                        v-model="formData.questionText"
                        v-validate="'required'"
                    />
                    <span class="md-error">
                        {{ errors.first('questionEdit.questionText') }}
                    </span>
                </md-field>
            </b-col>
            <b-col cols="12" md="6" class="mt-3">
                <md-field
                    v-bind:class="{
                        'md-invalid': errors.has(
                            'questionEdit.imageQuestionUrl'
                        )
                    }"
                >
                    <label>Question image</label>
                    <md-select
                        data-vv-as="image URL"
                        name="imageQuestionUrl"
                        v-model="formData.imageQuestionUrl"
                        :disabled="isDisabled"
                        v-validate="'required'"
                    >
                        <md-option
                            v-for="item in images"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.label }}</md-option
                        >
                    </md-select>
                    <span class="md-error">
                        {{ errors.first('questionEdit.imageQuestionUrl') }}
                    </span>
                </md-field>
            </b-col>
            <b-col cols="12" md="6" class="mt-3">
                <div class="d-flex align-items-center">
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('questionEdit.answerA')
                        }"
                    >
                        <label>Answer A</label>
                        <md-input
                            data-vv-as="answer A"
                            type="text"
                            name="answerA"
                            autocomplete="off"
                            :disabled="isDisabled"
                            v-model="formData.answerA"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('questionEdit.answerA') }}
                        </span>
                    </md-field>
                    <md-radio
                        v-model="formData.correctAnswer"
                        name="correctAnswer"
                        :disabled="isDisabled"
                        value="A"
                    />
                </div>
                <div class="d-flex align-items-center">
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('questionEdit.answerB')
                        }"
                    >
                        <label>Answer B</label>
                        <md-input
                            data-vv-as="answer B"
                            type="text"
                            name="answerB"
                            autocomplete="off"
                            :disabled="isDisabled"
                            v-model="formData.answerB"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('questionEdit.answerB') }}
                        </span>
                    </md-field>
                    <md-radio
                        v-model="formData.correctAnswer"
                        :disabled="isDisabled"
                        name="correctAnswer"
                        value="B"
                    />
                </div>
                <div class="d-flex align-items-center">
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('questionEdit.answerC')
                        }"
                    >
                        <label>Answer C</label>
                        <md-input
                            data-vv-as="answer C"
                            type="text"
                            name="answerC"
                            autocomplete="off"
                            :disabled="isDisabled"
                            v-model="formData.answerC"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('questionEdit.answerC') }}
                        </span>
                    </md-field>
                    <md-radio
                        v-model="formData.correctAnswer"
                        :disabled="isDisabled"
                        name="correctAnswer"
                        value="C"
                    />
                </div>
                <div class="d-flex align-items-center">
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('questionEdit.answerD')
                        }"
                    >
                        <label>Answer D</label>
                        <md-input
                            data-vv-as="answer D"
                            type="text"
                            name="answerD"
                            autocomplete="off"
                            :disabled="isDisabled"
                            v-model="formData.answerD"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('questionEdit.answerD') }}
                        </span>
                    </md-field>
                    <md-radio
                        v-model="formData.correctAnswer"
                        :disabled="isDisabled"
                        name="correctAnswer"
                        value="D"
                    />
                </div>
            </b-col>
            <b-col cols="12" md="6" class="mt-3">
                <md-field>
                    <label>Text hint</label>
                    <md-input
                        type="text"
                        name="textHint"
                        autocomplete="off"
                        :disabled="isDisabled"
                        v-model="formData.textHint"
                    />
                </md-field>
                <md-field
                    v-bind:class="{
                        'md-invalid': errors.has('questionEdit.learnMoreUrl')
                    }"
                >
                    <label>Learn more</label>
                    <md-input
                        data-vv-as="learn more URL"
                        type="text"
                        name="learnMoreUrl"
                        autocomplete="off"
                        :disabled="isDisabled"
                        v-model="formData.learnMoreUrl"
                        v-validate="'required|url'"
                    />
                    <span class="md-error">
                        {{ errors.first('questionEdit.learnMoreUrl') }}
                    </span>
                </md-field>
                <div class="d-flex align-items-center justify-content-between">
                    <md-checkbox
                        name="terms"
                        :value="true"
                        :disabled="isDisabled"
                        v-model="formData.sponsored"
                        class="md-primary"
                    >
                        Sponsored
                    </md-checkbox>
                    <b-link class="text-brand">
                        <fa-icon icon="question-circle" class="mr-2" />
                        <span class="">Help</span>
                    </b-link>
                </div>
                <b-row class="mt-5">
                    <b-col cols="6" class="mb-3">
                        <b-btn
                            variant="outline-brand"
                            class="w-100"
                            @click="createNewQuestion"
                        >
                            New
                        </b-btn>
                    </b-col>
                    <b-col cols="6" class="mb-3">
                        <b-btn
                            variant="brand"
                            class="w-100"
                            type="submit"
                            :disabled="isDisabled"
                        >
                            Update
                        </b-btn>
                    </b-col>
                    <b-col cols="12" class="mb-3">
                        <b-btn
                            variant="outline-brand"
                            class="w-100"
                            @click="$emit('showUploader')"
                        >
                            <fa-icon icon="plus-circle" class="mr-1" />
                            Upload Image
                        </b-btn>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <UploadImages :urlPath="'/quizzes/upload?quizId=' + itemId" />
    </b-form>
</template>
<script>
import UploadImages from './UploadImages';
export default {
    name: 'question-edit',
    props: ['index', 'data', 'itemId'],
    components: {
        UploadImages
    },
    data() {
        return {
            isDisabled: false,
            formData: {
                questionText: null,
                imageQuestionUrl: null,
                answerA: null,
                answerB: null,
                answerC: null,
                answerD: null,
                textHint: null,
                correctAnswer: 'A',
                imageCorrectAnswerUrl: null,
                imageWrongAnswerUrl: null,
                learnMoreUrl: null,
                sponsored: null
            }
        };
    },
    created() {
        this.$parent.$on('setQuestionData', this.setData);
    },
    computed: {
        images() {
            return this.$store.getters['quizImages'].map(item => {
                let arr = item.split('/');
                return { id: item, label: arr[arr.length - 1] };
            });
        }
    },
    methods: {
        validateQuestion() {
            this.$validator.validateAll('questionEdit').then(result => {
                if (result) {
                    this.$parent.$emit('updateQuestion', {
                        index: this.index,
                        data: {
                            questionText: this.formData.questionText,
                            isSponsored: this.formData.sponsored || false,
                            answers: [
                                {
                                    answerText: this.formData.answerA,
                                    correct:
                                        this.formData.correctAnswer === 'A',
                                    label: 'A'
                                },
                                {
                                    answerText: this.formData.answerB,
                                    correct:
                                        this.formData.correctAnswer === 'B',
                                    label: 'B'
                                },
                                {
                                    answerText: this.formData.answerC,
                                    correct:
                                        this.formData.correctAnswer === 'C',
                                    label: 'C'
                                },
                                {
                                    answerText: this.formData.answerD,
                                    correct:
                                        this.formData.correctAnswer === 'D',
                                    label: 'D'
                                }
                            ],
                            textHint: this.formData.textHint || '',
                            correctAnswer: this.formData.correctAnswer,
                            links: {
                                imageQuestionUrl: this.formData
                                    .imageQuestionUrl,
                                learnMoreUrl: this.formData.learnMoreUrl
                            }
                        }
                    });
                }
            });
        },
        createNewQuestion() {
            this.$parent.$emit('addQuestion');
        },
        setData(data) {
            this.isDisabled = !data.questionText;
            this.formData.questionText = data.questionText;
            this.formData.imageQuestionUrl = data.links
                ? data.links.imageQuestionUrl
                : '';
            this.formData.answerA = data.answers
                ? data.answers[0].answerText
                : '';
            this.formData.answerB = data.answers
                ? data.answers[1].answerText
                : '';
            this.formData.answerC = data.answers
                ? data.answers[2].answerText
                : '';
            this.formData.answerD = data.answers
                ? data.answers[3].answerText
                : '';
            this.formData.textHint = data.textHint;
            this.formData.correctAnswer = data.correctAnswer;
            this.formData.learnMoreUrl = data.links
                ? data.links.learnMoreUrl
                : '';
            this.formData.sponsored = data.isSponsored;
            this.$validator.reset();
        }
    }
};
</script>
