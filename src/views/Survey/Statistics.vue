<template>
    <div class="content" v-if="currentSurvey">
        <h3 class="page-header">{{ currentSurvey.name }} - Statistics</h3>
        <div v-if="surveysStats.length === 0">
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
                <b-card title="Completed" class="overview-card">
                    <doughnut-chart
                        :chart-data="completedChartData"
                        :options="pieOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
            <b-col cols="12">
                <b-card title="Responses Details" class="overview-card">
                    <div class="overflow-auto">
                        <b-table
                            id="referral-table"
                            :items="surveysStats"
                            :per-page="perPage"
                            :current-page="currentPage"
                            striped
                            hover
                        ></b-table>
                        <b-pagination
                            v-model="currentPage"
                            :per-page="perPage"
                            :total-rows="rows"
                            :limit="10"
                            :hide-goto-end-buttons="true"
                            align="fill"
                            aria-controls="referral-table"
                        ></b-pagination>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BarChart from '../../components/Charts/bar-chart.vue';
import DoughnutChart from '../../components/Charts/doughnut-chart';
export default {
    name: 'survey-statistics-page',
    components: {
        BarChart,
        DoughnutChart
    },
    data() {
        return {
            perPage: 10,
            currentPage: 1,
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
        this.getStats();
    },
    watch: {
        surveyId() {
            setTimeout(() => this.getStats(), 200);
        }
    },
    computed: {
        ...mapGetters(['surveysStats']),
        surveyId() {
            return this.$route.params.id;
        },
        currentSurvey() {
            return this.$store.getters['surveyById'](this.surveyId);
        },
        rows() {
            return this.surveysStats.length;
        },
        responsesChartData() {
            if (!this.surveysStats) return {};
            return {
                labels: this.surveysStats.map(item => item.date),
                datasets: [
                    {
                        label: 'Responses',
                        backgroundColor: '#A3A1FB',
                        data: this.surveysStats.map(item => item.responses)
                    }
                ]
            };
        },
        completedChartData() {
            if (!this.surveysStats) return {};
            let total = this.surveysStats
                .map(item => item.responses)
                .reduce((a, b) => a + b);
            let fullCount = this.surveysStats
                .map(item => (item.completed ? item.responses : 0))
                .reduce((a, b) => a + b);
            return {
                labels: ['Full', 'Partial'],
                datasets: [
                    {
                        backgroundColor: ['#A3A0FB', '#FF8373'],
                        data: [fullCount, total - fullCount]
                    }
                ]
            };
        }
    },
    methods: {
        getStats() {
            if (this.surveyId) {
                this.$store.dispatch('getSurveyStats', this.surveyId);
            }
        }
    }
};
</script>
