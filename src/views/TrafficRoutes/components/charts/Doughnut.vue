<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        data: { type: Object, required: true, default: null },
        options: { type: Object, required: false, default: null }
    },
    mounted() {
        this.renderChart(this.data, this.options);
    },
    watch: {
        data() {
            this.$nextTick(() => {
                this.renderChart(this.data, this.options);
            });
        }
    }
};
</script>
