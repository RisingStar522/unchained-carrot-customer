<template>
    <div class="content" v-if="customerPrograms.length === 0">
        <h3 class="page-header">
            You have not setup a referral program
        </h3>
        <b-embed type="video" aspect="16by9" controls poster="">
            <source src="" type="video/webm" />
            <source src="" type="video/mp4" />
        </b-embed>
        <div class="mt-5 text-center">
            <b-btn variant="brand" size="lg" class="btn-w200">
                Manage
            </b-btn>
        </div>
    </div>
    <div class="content" v-else>
        <h3 class="page-header mb-3">
            Overview
        </h3>
        <md-field class="mb-4">
            <label>Select program</label>
            <md-select v-model="currentProgram" @md-selected="getProgramStat">
                <md-option
                    v-for="item in customerPrograms"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.title }}</md-option
                >
            </md-select>
        </md-field>
        <b-row v-if="currentProgram">
            <b-col cols="12" lg="6">
                <b-card title="Referral per day" class="overview-card">
                    <bar-chart
                        :chart-data="referralsChartData"
                        :options="chartOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
            <b-col cols="12" lg="6">
                <b-card title="Rewards per day" class="overview-card">
                    <bar-chart
                        :chart-data="rewardsChartData"
                        :options="chartOptions"
                        :height="chartHeight"
                    />
                </b-card>
            </b-col>
            <b-col cols="12">
                <b-card title="Referral Details" class="overview-card">
                    <div class="overflow-auto">
                        <b-table
                            id="referral-table"
                            :items="programsStats"
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
export default {
    name: 'ref-by-me-page',
    components: {
        BarChart
    },
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            currentProgram: null,
            chartOptions: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{ stacked: true, beginAtZero: true, stepSize: 1 }]
                }
            },
            chartHeight: 200
        };
    },
    created() {
        this.$store.dispatch('getCustomerPrograms');
    },
    computed: {
        ...mapGetters(['customerPrograms', 'programsStats']),
        rows() {
            return this.programsStats.length;
        },
        referralsChartData() {
            return {
                labels: this.programsStats.map(item => item.date),
                datasets: [
                    {
                        label: 'Referral',
                        backgroundColor: '#A3A1FB',
                        data: this.programsStats.map(item => item.referrals)
                    }
                ]
            };
        },
        rewardsChartData() {
            return {
                labels: this.programsStats.map(item => item.date),
                datasets: [
                    {
                        label: 'Rewards',
                        backgroundColor: '#2AECEE',
                        data: this.programsStats.map(item => item.rewards)
                    }
                ]
            };
        }
    },
    methods: {
        getProgramStat(id) {
            this.$store.dispatch('getProgramsStats', id);
        }
    }
};
</script>
