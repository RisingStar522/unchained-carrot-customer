<script>
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ['chartData', 'options'],
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};
</script>
