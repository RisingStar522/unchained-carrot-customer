<template>
    <div class="content" v-if="currentQuiz">
        <h3 class="page-header">{{ currentQuiz.name }} - Statistics</h3>
        <div v-if="quizzesStats.dates && quizzesStats.dates.length === 0">
            Not found
        </div>
        <b-row v-else>
            <b-col cols="12" lg="6">
                <b-card title="Responses per day" class="overview-card">
                    <bar-chart
                        :chart-data="responsesChartData"
                        :options="barOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
            <b-col cols="12" lg="6">
                <b-card title="Correct answers" class="overview-card">
                    <pie-chart
                        :chart-data="correctChartData"
                        :options="pieOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
            <b-col cols="12">
                <md-field class="mb-5">
                    <label>Select question</label>
                    <md-select v-model="currentQuestion">
                        <md-option
                            v-for="item in quizzesStats.questions"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.title }}</md-option
                        >
                    </md-select>
                </md-field>
            </b-col>
            <b-col cols="12" lg="6" v-if="currentQuestion">
                <b-card title="Used helps" class="overview-card">
                    <bar-chart
                        :chart-data="questionsChartData"
                        :options="barOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
            <b-col cols="12" lg="6" v-if="currentQuestion">
                <b-card title="Answers" class="overview-card">
                    <doughnut-chart
                        :chart-data="answersChartData"
                        :options="pieOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BarChart from '../../components/Charts/bar-chart.vue';
import PieChart from '../../components/Charts/pie-chart';
import DoughnutChart from '../../components/Charts/doughnut-chart';
export default {
    name: 'quiz-statistics-page',
    components: {
        BarChart,
        PieChart,
        DoughnutChart
    },
    data() {
        return {
            currentQuestion: null,
            barOptions: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{ stacked: true, beginAtZero: true, stepSize: 1 }]
                }
            },
            pieOptions: {
                legend: {
                    display: true
                }
            },
            chartHeight: 200
        };
    },
    created() {
        this.currentQuestion = null;
        this.getStats();
    },
    watch: {
        quizId() {
            setTimeout(() => this.getStats(), 200);
        }
    },
    computed: {
        ...mapGetters(['quizzesStats']),
        quizId() {
            return this.$route.params.id;
        },
        currentQuiz() {
            return this.$store.getters['quizById'](this.quizId);
        },
        responsesChartData() {
            if (
                !this.quizzesStats ||
                (this.quizzesStats && !this.quizzesStats.dates)
            )
                return { datasets: [] };
            return {
                labels: this.quizzesStats.dates.map(item => item.date),
                datasets: [
                    {
                        label: 'Responses',
                        backgroundColor: '#A3A1FB',
                        data: this.quizzesStats.dates.map(
                            item => item.responses
                        )
                    }
                ]
            };
        },
        correctChartData() {
            if (
                !this.quizzesStats ||
                (this.quizzesStats && !this.quizzesStats.dates)
            )
                return { datasets: [] };
            return {
                labels: ['Fully correct', 'Partially correct'],
                datasets: [
                    {
                        backgroundColor: ['#A3A0FB', '#FF8373'],
                        data: [
                            this.quizzesStats.dates
                                .map(item => item.fullyAnswers)
                                .reduce((a, b) => a + b),
                            this.quizzesStats.dates
                                .map(item => item.partiallyCorrect)
                                .reduce((a, b) => a + b)
                        ]
                    }
                ]
            };
        },
        questionsChartData() {
            if (
                !this.quizzesStats ||
                (this.quizzesStats && !this.quizzesStats.questions)
            )
                return { datasets: [] };
            return {
                labels: ['Fifty-fifty', 'Hint', 'Both'],
                datasets: [
                    {
                        label: 'Used',
                        backgroundColor: ['#A3A0FB', '#FF8373', '#2AECEE'],
                        data: [
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).fiftyFiftyUsed,
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).hintUsed,
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).bothUsed
                        ]
                    }
                ]
            };
        },
        answersChartData() {
            if (
                !this.quizzesStats ||
                (this.quizzesStats && !this.quizzesStats.questions)
            )
                return { datasets: [] };
            return {
                labels: ['A', 'B', 'C', 'D'],
                datasets: [
                    {
                        backgroundColor: [
                            '#A3A0FB',
                            '#FF8373',
                            '#2AECEE',
                            '#2F3380'
                        ],
                        data: [
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).answerA,
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).answerB,
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).answerC,
                            this.quizzesStats.questions.find(
                                item => item.id === this.currentQuestion
                            ).answerD
                        ]
                    }
                ]
            };
        }
    },
    methods: {
        getStats() {
            if (this.quizId) {
                this.$store.dispatch('getQuizzesStats', this.quizId);
            }
        }
    }
};
</script>
