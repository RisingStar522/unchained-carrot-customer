<template>
    <div>
        <div v-if="!showResult">
            <div
                class="help-block"
                v-if="quizMeta.fiftyFiftyAvailable || quizMeta.hintAvailable"
            >
                <button
                    v-if="quizMeta.fiftyFiftyAvailable"
                    :class="'help-button' + (fiftyFiftyUsed ? ' checked' : '')"
                    @click="setFiftyFiftyUsed"
                >
                    50:50
                </button>
                <button
                    v-if="quizMeta.hintAvailable"
                    :class="'help-button' + (hintUsed ? ' checked' : '')"
                    @click="setHintUsed"
                >
                    {{ $t('QUIZ.HINT') }}
                </button>
            </div>
            <div class="image-block">
                <img :src="question.imageQuestionUrl" alt="Image question" />
            </div>
            <div class="p-3">
                <h5 class="mb-3">{{ question.questionText }}</h5>
                <div
                    v-if="quizMeta.hintAvailable && hintUsed"
                    class="alert alert-info"
                >
                    {{ question.textHint }}
                </div>
                <div v-if="showError" class="alert alert-danger">
                    {{ $t('QUIZ.SELECT_ANSWER') }}
                </div>

                <b-form-group label="">
                    <b-form-radio
                        v-for="(item, ind) in question.answers"
                        :key="ind"
                        v-model="answer"
                        name="answers"
                        :value="item.value"
                        :disabled="fiftyFiftyUsed && item.hide"
                        >{{ item.text }}</b-form-radio
                    >
                </b-form-group>
                <!-- <fieldset class="form-inline">
                    <div
                        v-for="(item, ind) in question.answers"
                        :key="ind"
                        :class="
                            'radio' + (item.value === answer ? ' checked' : '')
                        "
                    >
                        <label
                            @click="changeAnswer(item.value)"
                            :class="
                                fiftyFiftyUsed && item.hide ? 'disabled' : ''
                            "
                        >
                            <span class="circle"></span>
                            <span class="check"></span>
                            <span class="">
                                {{ item.answerText }}
                            </span>
                        </label>
                    </div>
                </fieldset> -->
            </div>
            <div class="text-center p-1">
                <button @click="handleAnswer" class="yellow-button">
                    {{ $t('QUIZ.SUBMIT') }}
                </button>
            </div>
        </div>
        <div v-else>
            <div :class="'image-block' + (isCorrect !== null ? ' show' : '')">
                <img :src="question.imageQuestionUrl" alt="Answer image" />
                <div
                    v-if="isCorrect === true"
                    class="image-block-correct text-uppercase"
                >
                    <img src="@/assets/images/quiz/check.svg" alt="" />
                    {{ $t('QUIZ.CORRECT_ANSWER') }}
                </div>
                <div
                    v-if="isCorrect === false"
                    class="image-block-wrong text-uppercase"
                >
                    <img src="@/assets/images/quiz/times.svg" alt="" />
                    {{ $t('QUIZ.WRONG_ANSWER') }}
                </div>
            </div>
            <div class="text-center p-3">
                <a
                    v-if="question.learnMoreUrl"
                    class="link-btn"
                    @click="handleLearnMore"
                    role="button"
                >
                    {{ $t('QUIZ.LEARN_MORE') }}
                </a>
            </div>
            <div class="text-center p-3">
                <button @click="nextQuestion" class="yellow-button">
                    <span
                        v-if="
                            quizStatistic.answersCount ===
                                quizStatistic.numberOfQuestions
                        "
                    >
                        {{ $t('QUIZ.COMPLETE') }}
                    </span>
                    <span v-else>
                        {{ $t('QUIZ.NEXT') }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'QuizQuestion',
    props: ['question'],
    data() {
        return {
            showResult: false,
            showError: false,
            isCorrect: null,
            answer: null,
            fiftyFiftyUsed: false,
            hintUsed: false
        };
    },
    computed: {
        ...mapGetters(['quizMeta', 'quizStatistic'])
    },
    watch: {},
    methods: {
        changeAnswer(val) {
            this.answer = val;
        },
        handleAnswer() {
            if (!this.answer) {
                return (this.showError = true);
            }
            this.$parent.$emit('stopTimer');
            this.$store.commit('SET_QUIZ_ANSWER', {
                questionId: this.question.questionId,
                answer: this.answer,
                fiftyFiftyUsed: this.fiftyFiftyUsed,
                hintUsed: this.hintUsed
            });
            this.showResult = true;
            this.showError = false;
            this.isCorrect = this.answer === this.question.correctAnswer;
        },
        setFiftyFiftyUsed() {
            this.fiftyFiftyUsed = true;
        },
        setHintUsed() {
            this.hintUsed = true;
        },
        nextQuestion() {
            this.$parent.$emit('nextStep');
        },
        handleLearnMore() {
            window.open(this.question.learnMoreUrl, '_blank');
        }
    }
};
</script>
