<script>
import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,
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
