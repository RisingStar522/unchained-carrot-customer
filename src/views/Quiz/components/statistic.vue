<template>
    <div class="statistic-block">
        <div class="timer-block">
            <svg width="130" height="130" xmlns="http://www.w3.org/2000/svg">
                <text :dx="textPosition" dy="-55">{{ leftTime }}</text>
                <circle
                    id="circle"
                    class="animation"
                    r="55"
                    cy="65"
                    cx="65"
                    stroke-width="10"
                    stroke="#E4E700"
                    :stroke-dashoffset="leftTimeProgress"
                    fill="none"
                ></circle>
                <circle
                    id="circle"
                    r="55"
                    cy="65"
                    cx="65"
                    stroke-width="10"
                    stroke="#e4e70033"
                    fill="none"
                ></circle>
            </svg>
        </div>
        <div class="steps-block">
            <div
                v-for="i in quizStatistic.numberOfQuestions"
                :key="i"
                :class="
                    'step' +
                        (i <= quizStatistic.answersCount ? ' marked' : '') +
                        (i === currentPage ? ' current' : '')
                "
            ></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'QuizStatistic',
    props: ['currentPage'],
    data() {
        return {
            circleOffset: 346
        };
    },
    computed: {
        ...mapGetters(['quizStatistic']),
        leftTime() {
            return this.quizStatistic.allowedTime - this.quizStatistic.usedTime;
        },
        leftTimeProgress() {
            return (
                this.circleOffset -
                (this.leftTime / this.quizStatistic.allowedTime) *
                    this.circleOffset
            );
        },
        textPosition() {
            return parseInt(this.leftTime) / 100 >= 1
                ? 40
                : parseInt(this.leftTime) / 10 >= 1
                ? 48
                : 58;
        }
    },
    methods: {}
};
</script>
