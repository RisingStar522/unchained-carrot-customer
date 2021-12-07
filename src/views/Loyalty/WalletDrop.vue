<template>
    <div class="content" v-if="!hasSetUp">
        <h3 class="page-header">
            You have not setup any airdrop
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
        <h3 class="page-header">
            Overview
        </h3>
        <b-row>
            <b-col cols="12" lg="6">
                <b-card title="Registration per day" class="overview-card">
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
                            :items="items"
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
import BarChart from '@/components/Charts/bar-chart';
export default {
    name: 'wallet-drop',
    components: {
        BarChart
    },
    data() {
        return {
            perPage: 2,
            currentPage: 1,
            items: [
                { location: 'google.com', views: '10311', sales: '$12,123' },
                { location: 'twitter.com', views: '8382', sales: '$13,879' },
                { location: 'linkedin.com', views: '6312', sales: '$8,142' },
                { location: 'facebook.com', views: '12311', sales: '$10,891' },
                { location: 'dribble.com', views: '9421', sales: '11,391' }
            ],
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
    computed: {
        hasSetUp() {
            return true;
        },
        rows() {
            return this.items.length;
        },
        referralsChartData() {
            return {
                labels: ['first', 'second', 'third'],
                datasets: [
                    {
                        label: 'Registrations',
                        backgroundColor: '#39CB89',
                        data: [1, 21, 12]
                    }
                ]
            };
        },
        rewardsChartData() {
            return {
                labels: ['first', 'second', 'third'],
                datasets: [
                    {
                        label: 'Rewards',
                        backgroundColor: '#F79946',
                        data: [1, 15, 2]
                    }
                ]
            };
        }
    }
};
</script>
