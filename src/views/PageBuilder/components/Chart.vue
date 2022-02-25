<template>
    <div>
        <div
            class="d-flex  justify-content-between align-items-center mb-3 mt-5"
        >
            <div class="d-flex align-items-center ">
                <div class=" mr-5 my-auto">
                    <h2 class="text-brand mb-0">
                        Charts
                    </h2>
                    <p class="text-md p-0 subtile-color">
                        Thank you
                    </p>
                </div>
                <date-range-picker
                    ref="picker"
                    class="my-auto py-4 date-picker"
                    :opens="open"
                    :locale-data="{
                        firstDay: 1,
                        format: 'dd/mm/yyyy'
                    }"
                    :showDropdowns="showDropdowns"
                    v-model="dateRange"
                    :linkedCalendars="linkedCalendars"
                    :dateFormat="dateFormat"
                >
                </date-range-picker>
            </div>
        </div>

        <b-card class="pt-4 mt-3 mb-4">
            <div class="row p-5">
                <div class="col-md-12">
                    <h4 class="text-brand font-weight-bold">
                        {{ '123123' }}
                    </h4>
                    <p class="font-weight-bold mb-2">
                        Total Clicks
                    </p>
                    <div class="bar-container">
                        <BarChart
                            v-if="chartData.monthDatasets"
                            :chartData="chartData.monthDatasets"
                            :options="options"
                            :height="200"
                        />
                    </div>
                    <p class="text-right p-font">Data in UTC</p>
                </div>
            </div>
        </b-card>

        <b-card class="py-4 mt-3">
            <div class="row p-5">
                <div class="col-md-4">
                    <h4 class="text-brand font-weight-bold mb-2">
                        Browsers
                    </h4>
                    <div class="doughnut-container">
                        <Doughnut
                            v-if="chartData.browserDatasets"
                            :chartData="chartData.browserDatasets"
                            :options="doughnutChartoptions"
                        />
                    </div>
                </div>
                <div class="col-md-4">
                    <h4 class="text-brand font-weight-bold mb-2">
                        Countries
                    </h4>
                    <div class="doughnut-container">
                        <Doughnut
                            v-if="chartData.countryDatasets"
                            :chartData="chartData.countryDatasets"
                            :options="doughnutChartoptions"
                        />
                    </div>
                </div>
                <div class="col-md-4">
                    <h4 class="text-brand font-weight-bold mb-2">
                        Cities
                    </h4>
                    <div class="doughnut-container">
                        <Doughnut
                            v-if="chartData.cityDatasets"
                            :chartData="chartData.cityDatasets"
                            :options="doughnutChartoptions"
                        />
                    </div>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import BarChart from './BarChart';
import Doughnut from './DoughnutChart';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import _ from 'lodash';
export default {
    name: 'chart-component',
    components: {
        BarChart,
        Doughnut,
        DateRangePicker
    },
    data: () => ({
        chartData: {
            browserDatasets: null,
            cityDatasets: null,
            countryDatasets: null,
            monthDatasets: null
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItems) {
                        return tooltipItems.yLabel.toString() + ' clicks';
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        barPercentage: 0.4,
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }
                ],
                yAxes: [
                    {
                        position: 'right',
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        },
        doughnutChartoptions: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    afterLabel: function(tooltipItems) {
                        return tooltipItems.yLabel.toString() + ' clicks';
                    }
                }
            },
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 10
                }
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        },
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: ''
    }),
    computed: {
        dateRange() {
            const date = new Date();
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
            );
            return { startDate, endDate };
        }
    },
    methods: {
        dateFormat(classes, date) {
            if (!classes.disabled) {
                classes.disabled = date.getTime() < new Date();
            }
            return classes;
        },
        async getChartData(routeId = 0) {
            try {
                // const { data } = await new TrafficRoutesAPI().getChartData(
                //     routeId
                // );
                const data = {
                    week: [
                        {
                            year: 2021,
                            weekNumber: 43,
                            redirects: 1
                        },
                        {
                            year: 2022,
                            weekNumber: 43,
                            redirects: 1
                        }
                    ],
                    day: [
                        {
                            year: 2021,
                            month: 10,
                            day: 19,
                            redirects: 1
                        },
                        {
                            year: 2021,
                            month: 11,
                            day: 18,
                            redirects: 1
                        }
                    ],
                    hour: [
                        {
                            year: 2021,
                            month: 10,
                            day: 19,
                            hour: 8,
                            redirects: 1
                        },
                        {
                            year: 2021,
                            month: 11,
                            day: 19,
                            hour: 8,
                            redirects: 1
                        }
                    ],
                    country: [
                        {
                            publicIpCountry: 'Viet Nam',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'Italy',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'France',
                            redirects: 1
                        }
                    ],
                    city: [
                        {
                            publicIpCountry: 'Italy',
                            publicIpCity: 'Longhignana',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'Viet Nam',
                            publicIpCity: 'Ho Chi Minh',
                            redirects: 1
                        },
                        {
                            publicIpCountry: 'Viet Nam',
                            publicIpCity: 'Ha Noi',
                            redirects: 1
                        }
                    ],
                    browser: [
                        {
                            browserName: 'Chrome',
                            redirects: 1
                        },
                        {
                            browserName: 'Safari',
                            redirects: 5
                        },
                        {
                            browserName: 'Firefox',
                            redirects: 5
                        }
                    ]
                };
                const browserLabels = data['browser'].map(b => b.browserName);
                const browserRedirects = data['browser'].map(b => b.redirects);

                const cityLabels = data['city'].map(c => c.publicIpCity);
                const cityRedirects = data['city'].map(c => c.redirects);

                const countryLabels = data['country'].map(
                    c => c.publicIpCountry
                );
                const countryRedirects = data['country'].map(c => c.redirects);
                const monthNames = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];
                const monthLabels = data['day'].map(c => {
                    const today = new Date(c.year, c.month, c.day);
                    return (
                        monthNames[today.getMonth() - 1] + ' ' + today.getDate()
                    );
                });

                const monthRedirects = data['day'].map(c => c.redirects);

                const browserColor = [
                    '#191C5C',
                    '#2F3380',
                    '#6E71A7',
                    '#ACADCC',
                    '#A3AQFB',
                    '#C3C1FC',
                    '#E9EE9F0'
                ];
                const countriesColor = [
                    '#FF6565',
                    '#FF8373',
                    '#FFE6E3',
                    '#FFC188',
                    '#FFDA83',
                    '#FFEDC5',
                    '#E9E9F0'
                ];

                const citiesColor = [
                    '#EE487D',
                    '#F05788',
                    '#FBD1DE',
                    '#FCE2EB',
                    '#F9AD6B',
                    '#FCD2AE',
                    '#E9E9F0'
                ];

                const browserDatasets = {
                    labels: browserLabels,
                    datasets: [
                        {
                            label: 'Browsers x Redirects',
                            data: browserRedirects,
                            backgroundColor: browserColor,
                            borderColor: browserColor,
                            borderWidth: 1
                        }
                    ]
                };

                const cityDatasets = {
                    labels: cityLabels,
                    datasets: [
                        {
                            label: 'Cities x Redirects',
                            data: cityRedirects,
                            backgroundColor: citiesColor,
                            borderColor: citiesColor,
                            borderWidth: 1
                        }
                    ]
                };

                const countryDatasets = {
                    labels: countryLabels,
                    datasets: [
                        {
                            label: 'Countries x Redirects',
                            data: countryRedirects,
                            backgroundColor: countriesColor,
                            borderColor: countriesColor,
                            borderWidth: 1
                        }
                    ]
                };

                const monthDatasets = {
                    labels: _.uniq(monthLabels),
                    datasets: [
                        {
                            label: 'Month x Redirects',
                            data: monthRedirects,
                            backgroundColor: '#39CB89',
                            borderColor: '#39CB89',
                            borderWidth: 1
                        }
                    ]
                };

                this.chartData.browserDatasets = browserDatasets;
                this.chartData.cityDatasets = cityDatasets;
                this.chartData.countryDatasets = countryDatasets;
                this.chartData.monthDatasets = monthDatasets;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    async mounted() {
        await this.getChartData();
    }
};
</script>

<style></style>
