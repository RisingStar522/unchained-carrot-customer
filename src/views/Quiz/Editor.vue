<template>
    <div class="content">
        <b-form @submit.prevent="validateForm" data-vv-scope="quizForm">
            <h3 class="page-header mb-4">
                {{ !quizId ? 'New' : 'Edit' }} quiz
            </h3>
            <b-row class="flex-row-reverse">
                <b-col
                    cols="12"
                    lg="4"
                    offset-lg="2"
                    class="flex-wrap d-flex d-lg-block justify-content-around text-right"
                >
                    <b-btn
                        class="btn-w200 mb-3"
                        variant="outline-brand"
                        :to="
                            quizId
                                ? {
                                      name: 'QuizzesActivate',
                                      params: { id: quizId }
                                  }
                                : {
                                      name: 'Quizzes'
                                  }
                        "
                    >
                        Cancel
                    </b-btn>
                    <b-btn class="btn-w200 mb-3" variant="brand" type="submit">
                        Save
                    </b-btn>
                    <b-btn
                        class="btn-w200 mb-3"
                        variant="outline-brand"
                        @click="previewQuiz"
                    >
                        Preview
                    </b-btn>
                </b-col>
                <b-col cols="12" lg="6">
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('quizForm.name')
                        }"
                    >
                        <label>Quiz name</label>
                        <md-input
                            type="text"
                            name="name"
                            autocomplete="off"
                            v-model="formData.name"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('quizForm.name') }}
                        </span>
                    </md-field>
                    <b-row>
                        <b-col cols="12" md="4">
                            <md-field
                                v-bind:class="{
                                    'md-invalid': errors.has(
                                        'quizForm.timeLimit'
                                    )
                                }"
                            >
                                <label>Time limit (sec)</label>
                                <md-input
                                    type="number"
                                    name="timeLimit"
                                    autocomplete="off"
                                    min="1"
                                    v-model="formData.timeLimit"
                                    v-validate="'required'"
                                />
                                <span class="md-error">
                                    {{ errors.first('quizForm.timeLimit') }}
                                </span>
                            </md-field>
                        </b-col>
                        <b-col cols="12" md="4" class="pt-md-3 text-center">
                            <md-checkbox
                                name="terms"
                                :value="true"
                                v-model="formData.useFiftyFifty"
                                class="md-primary"
                            >
                                Fifty fifty
                            </md-checkbox>
                        </b-col>
                        <b-col cols="12" md="4" class="pt-md-3 text-center">
                            <md-checkbox
                                name="terms"
                                :value="true"
                                v-model="formData.useHint"
                                class="md-primary"
                            >
                                Hint
                            </md-checkbox>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="mt-3" v-if="currentQuiz">
                <b-col cols="12" md="4">
                    <md-field>
                        <label>Language</label>
                        <md-select name="language" v-model="selectLanguage">
                            <md-option
                                v-for="item in languages"
                                :value="item.id"
                                :key="item.id"
                            >
                                {{ item.label }}
                            </md-option>
                        </md-select>
                    </md-field>
                </b-col>
            </b-row>
            <b-row class="mt-3" v-if="currentQuiz">
                <b-col cols="12" md="8">
                    <Question
                        v-for="(item, ind) in formData.questions[
                            selectLanguage
                        ]"
                        :data="item"
                        :active="editQuestionInd === ind"
                        :index="ind"
                        :key="ind"
                    />
                </b-col>
            </b-row>
        </b-form>
        <QuestionEdit
            :itemId="currentQuiz ? currentQuiz.id : null"
            :data="formData.questions[selectLanguage]"
            :index="editQuestionInd"
            v-show="currentQuiz"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Question from '../../components/Question';
import QuestionEdit from '../../components/QuestionEdit';
export default {
    name: 'quiz-editor-page',
    components: {
        Question,
        QuestionEdit
    },
    data() {
        return {
            languages: this.$store.state.locales,
            editQuestionInd: 0,
            selectLanguage: this.$store.state.locales[0].id,
            formData: {
                name: null,
                timeLimit: null,
                useFiftyFifty: null,
                useHint: null,
                questions: this.$store.state.locales.reduce((acc, cur) => {
                    acc[cur.id] = [];
                    return acc;
                }, {})
            }
        };
    },
    computed: {
        ...mapGetters(['selectedQuizFolder', 'quizQuestionTemplate']),
        currentQuiz() {
            return this.$store.getters['quizById'](this.quizId);
        },
        quizId() {
            return this.$route.params.id;
        }
    },
    beforeDestroy() {
        this.$store.commit('SET_QUIZ_COMPLETING', false);
        this.clearFormData();
    },
    watch: {
        currentQuiz() {
            this.loadQuizData();
        },
        quizId() {
            this.loadQuizData();
        },
        selectLanguage(val) {
            this.editQuestionInd = 0;
            this.$emit(
                'setQuestionData',
                this.formData.questions[val][this.editQuestionInd] || {}
            );
        }
    },
    updated() {
        this.$store.commit('SET_QUIZ_COMPLETING', true);
    },
    created() {
        this.clearFormData();
        if (this.selectedQuizFolder === '') {
            return this.$router.push({ name: 'Quizzes' });
        }
        this.loadQuizData();
        this.$on('addQuestion', () => {
            this.formData.questions[this.selectLanguage].push(
                this.quizQuestionTemplate
            );
            this.editQuestionInd =
                this.formData.questions[this.selectLanguage].length - 1;
            this.$emit(
                'setQuestionData',
                this.formData.questions[this.selectLanguage][
                    this.editQuestionInd
                ]
            );
        });
        this.$on('openQuestionEditor', index => {
            this.editQuestionInd = index;
            this.$emit(
                'setQuestionData',
                this.formData.questions[this.selectLanguage][
                    this.editQuestionInd
                ]
            );
        });
        this.$on('deleteQuestion', index => {
            this.formData.questions[this.selectLanguage].splice(index, 1);
            this.editQuestionInd =
                this.formData.questions[this.selectLanguage].length - 1;
            this.$emit(
                'setQuestionData',
                this.formData.questions[this.selectLanguage][
                    this.editQuestionInd
                ]
            );
        });
        this.$on('updateQuestion', question => {
            this.formData.questions[this.selectLanguage].splice(
                question.index,
                1,
                question.data
            );
        });
    },
    methods: {
        validateForm() {
            return this.$validator.validateAll('quizForm').then(result => {
                if (result) {
                    if (!this.quizId) {
                        let data = Object.assign({}, this.formData);
                        data.name = this.formData.name;
                        data.timeLimit = this.formData.timeLimit;
                        data.useFiftyFifty = this.formData.useFiftyFifty;
                        data.useHint = this.formData.useHint;
                        data.questions = [];
                        this.$store.dispatch(
                            'createQuiz',
                            Object.assign(
                                {
                                    folder: this.selectedQuizFolder
                                },
                                data
                            )
                        );
                        this.$validator.reset();
                    } else {
                        if (!this.isQuestionsValid()) {
                            return this.$notify({
                                type: 'error',
                                title: 'Some questions have not completed'
                            });
                        }
                        let data = Object.assign({}, this.currentQuiz);
                        data.name = this.formData.name;
                        data.timeLimit = this.formData.timeLimit;
                        data.useFiftyFifty = this.formData.useFiftyFifty;
                        data.useHint = this.formData.useHint;
                        data.questions = this.formData.questions;
                        this.$store.dispatch('updateQuiz', {
                            id: this.currentQuiz.id,
                            data: data
                        });
                    }
                }
                return result;
            });
        },
        isQuestionsValid() {
            let isValid = true;
            this.formData.questions[this.selectLanguage].forEach(question => {
                question.answers.forEach(item => {
                    Object.keys(item).forEach(field1 => {
                        if (item[field1] === null || item[field1] === '') {
                            isValid = false;
                        }
                    });
                });
                Object.keys(question.links).forEach(field1 => {
                    if (
                        question.links[field1] === null ||
                        question.links[field1] === ''
                    ) {
                        isValid = false;
                    }
                });
                if (
                    question.questionText === null ||
                    question.questionText === ''
                ) {
                    isValid = false;
                }
            });
            return isValid;
        },
        loadQuizData() {
            this.$store.dispatch('getQuizImages', this.quizId);
            if (!this.currentQuiz && this.quizId !== undefined) {
                this.$store.dispatch('getQuiz', this.quizId);
            } else {
                this.formData.name =
                    this.currentQuiz && this.currentQuiz.id
                        ? this.currentQuiz.name
                        : null;
                this.formData.timeLimit =
                    this.currentQuiz && this.currentQuiz.id
                        ? this.currentQuiz.timeLimit
                        : null;
                this.formData.useFiftyFifty =
                    this.currentQuiz && this.currentQuiz.id
                        ? this.currentQuiz.useFiftyFifty
                        : null;
                this.formData.useHint =
                    this.currentQuiz && this.currentQuiz.id
                        ? this.currentQuiz.useHint
                        : null;
                this.formData.questions =
                    this.currentQuiz && this.currentQuiz.questions
                        ? this.currentQuiz.questions
                        : this.formData.questions;
                setTimeout(() => {
                    this.$emit(
                        'setQuestionData',
                        this.formData.questions[this.selectLanguage][
                            this.editQuestionInd
                        ] || {}
                    );
                }, 0);
                this.$validator.reset();
            }
        },
        clearFormData() {
            this.editQuestionInd = 0;
            this.selectLanguage = this.languages[0].id;
            this.formData = {
                name: null,
                timeLimit: null,
                useFiftyFifty: null,
                useHint: null,
                questions: this.$store.state.locales.reduce((acc, cur) => {
                    acc[cur.id] = [];
                    return acc;
                }, {})
            };
        },
        async previewQuiz() {
            let isValid = await this.validateForm();
            if (isValid) {
                this.$router.push({
                    name: 'QuizzesPreview',
                    params: {
                        id: this.quizId
                    }
                });
            }
        }
    }
};
</script>
