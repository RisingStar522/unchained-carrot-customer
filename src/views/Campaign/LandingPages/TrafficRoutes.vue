<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            Landing Pages - Traffic Routes
        </h3>
        <div class="card form_numeric_tab">
            <div class="card-body traffic-routes-container">
                <div>
                    <traffic-image-card />
                </div>
                <div>
                    <traffic-route
                        v-for="trafficRoute in trafficRoutes"
                        :route="trafficRoute"
                        :key="trafficRoute._id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.traffic-routes-container {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-gap: 30px;
    & > div:nth-child(1) {
        margin-right: 20px;
    }
}
</style>

<script>
import TrafficRoutesAPI from '../../../api/TrafficRoutesAPI';
import TrafficRoute from '@/components/LandingPages/TrafficRoute';
import TrafficImageCard from '@/components/LandingPages/TrafficImageCard';

export default {
    data() {
        return {
            trafficRoutes: []
        };
    },
    components: {
        TrafficRoute,
        TrafficImageCard
    },
    mounted() {
        new TrafficRoutesAPI().getTrafficRoutes({}).then(resp => {
            this.trafficRoutes = resp.result;
        });
    }
};
</script>
