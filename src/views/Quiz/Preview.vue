<template>
    <section class="survey">
        <div class="container">
            <div v-if="currentPage === 0" class="panel-body text-center">
                <h1 class="mb-5">{{ $t('QUIZ.READY') }}</h1>
                <h5 class="mb-5">
                    {{
                        $tc(
                            'QUIZ.YOU_HAVE_TO_COMPLETE',
                            quizStatistic.allowedTime,
                            { sec: quizStatistic.allowedTime }
                        )
                    }}
                </h5>
                <button class="yellow-button" @click="nextStep">
                    {{ $t('QUIZ.START') }}
                </button>
            </div>
            <div class="result-block" v-else-if="hasExpired">
                <div class="result-close" onclick="window.history.go(-1)">
                    <img :src="imageUrls.close" alt="X" />
                </div>
                <div class="result-title">
                    <h4 class="text-uppercase">{{ $t('QUIZ.ON_NO') }}</h4>
                    <p>
                        <small>{{ $t('QUIZ.SORRY_TIME_EXPIRED') }}</small>
                    </p>
                    <button class="yellow-button" @click="tryAgain">
                        {{ $t('QUIZ.TRY_AGAIN') }}
                    </button>
                </div>
            </div>
            <div
                class="result-block"
                v-else-if="currentPage === quizQuestions.length + 1"
            >
                <div class="result-close" onclick="window.history.go(-1)">
                    <img :src="imageUrls.close" alt="X" />
                </div>
                <div class="result-title">
                    <h4 class="text-uppercase">
                        {{ $t('QUIZ.COME_BACK_SOON') }}
                    </h4>
                    <p>{{ $t('QUIZ.NEW_WAYS_REDEEM_SOON') }}</p>
                    <p>
                        {{
                            $tc('QUIZ.YOU_GOT_CORRECT_TOTAL', 0, {
                                correct: quizCorrectCount,
                                total: quizStatistic.numberOfQuestions
                            })
                        }}
                    </p>
                </div>
            </div>
            <div v-else class="panel-body">
                <Statistic :currentPage="currentPage" />
                <div v-for="(question, ind) in quizQuestions" :key="ind">
                    <Question
                        v-if="ind === currentPage - 1"
                        :question="question"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Question from './components/question';
import Statistic from './components/statistic';

import { mapGetters } from 'vuex';

export default {
    name: 'quiz-preview-page',
    components: {
        Question,
        Statistic
    },
    data() {
        return {
            quizId: this.$route.params.id,
            imageUrls: {
                close: require('../../assets/images/quiz/close.png')
            },
            interval: null,
            totalInterval: null,
            totalTimeUsed: 0,
            currentPage: 0
        };
    },
    created() {
        this.totalInterval = setInterval(() => {
            this.totalTimeUsed++;
        }, 1000);
        this.$store.dispatch('getQuizById', {
            id: this.quizId,
            query: { language: this.locale }
        });
        this.$on('stopTimer', this.stopTimer);
        this.$on('nextStep', this.nextStep);
    },
    computed: {
        ...mapGetters([
            'quizMeta',
            'myProfileId',
            'quizAnswers',
            'quizQuestions',
            'quizStatistic',
            'quizCorrectCount'
        ]),
        hasExpired() {
            let status =
                this.quizStatistic.usedTime >= this.quizStatistic.allowedTime;
            if (status) {
                this.stopTimer();
            }
            return status;
        },
        locale() {
            return this.$i18n.locale;
        }
    },
    watch: {
        locale(val) {
            this.stopTimer();
            this.currentPage = 0;
            this.totalTimeUsed = 0;
            this.$store.dispatch('getQuizById', {
                id: this.quizId,
                query: { language: val }
            });
        }
    },
    methods: {
        nextStep() {
            this.currentPage++;
            if (this.currentPage < this.quizStatistic.numberOfQuestions + 1) {
                this.startTimer();
            } else {
                this.handleResults();
            }
        },
        startTimer() {
            this.interval = setInterval(() => {
                this.quizStatistic.usedTime++;
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.interval);
        },
        handleResults() {
            clearInterval(this.totalInterval);
        },
        tryAgain() {
            this.stopTimer();
            this.$store.commit('CLEAR_QUIZ_ANSWERS');
            this.currentPage = 0;
            this.quizStatistic.usedTime = 0;
            this.quizStatistic.answersCount = 0;
        }
    }
};
</script>
<style lang="scss">
@import '../../assets/scss/survey-preview';
</style>
