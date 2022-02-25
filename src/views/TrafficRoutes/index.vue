<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-else>
            <div class="traffic-table-container" v-if="hasRoutes">
                <TrafficRoutesTable />
            </div>
            <div class="traffic-route-container" v-else>
                <!-- <h2>Traffic Routes</h2> -->
                <router-link to="/traffic-routes/add-route">
                    <img
                        to="/traffic-routes/add-route"
                        class="mb-4 route-img"
                        src="../../assets/images/UC_traffic-routes.png"
                    />
                </router-link>
                <h3>Direct your traffic, split test, measure and learn.</h3>
                <p class="mt-2 mb-4">
                    Define where you want your traffic to be directed, add
                    parameters, test your campaign.
                </p>
                <b-button
                    to="/traffic-routes/add-route"
                    class="py-2 px-4"
                    variant="primary"
                    >Create your first traffic route</b-button
                >
                <div class="traffic-route-contents">
                    <h3>What can you find here</h3>
                    <b-list-group class="flex-row flex-wrap">
                        <b-list-group-item
                            v-for="(item, index) in trafficRouteContents"
                            :key="index"
                        >
                            <img
                                class="mr-2"
                                src="../../assets/icons/right_check.svg"
                            />
                            <span>{{ item }}</span>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TrafficRoutesTable from './components/TrafficRoutesTable.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'traffic-routes-page',
    components: {
        TrafficRoutesTable
    },
    data: () => ({
        trafficRouteContents: [
            'Traffic routing',
            'Link analytics',
            'UTM builder',
            'URL shortener',
            'QR codes',
            'Channel attribution',
            'Campaign management',
            'Custom domain',
            'Custom URL'
        ],
        loading: false,
        hasRoutes: false
    }),
    async created() {
        this.loading = true;
        this.$store.dispatch('getAllTrafficRoutes', {}).then(() => {
            this.loading = false;
            this.hasRoutes = true;
        });
    },
    computed: {
        ...mapGetters(['getAllTrafficRoutes']),
        itemsForTrafficRoutes() {
            return JSON.parse(JSON.stringify(this.getAllTrafficRoutes));
        }
    },
    mounted() {
        this.$store.commit('SET_INIT_REMAINING_DESTINATION_PERCENT', 100);
    }
};
</script>

<style lang="scss" scoped>
.traffic-route-container {
    text-align: center;
    padding: 20px 0px;
    max-height: 100%;
    overflow-y: hidden;
    h2 {
        color: #2f3380;
        font-size: 28px;
        line-height: 40px;
    }
    h3 {
        color: #43425d;
        font-size: 28px;
        line-height: 40px;
        font-weight: bold;
    }
    p {
        font-size: 15px;
        line-height: 25px;
        color: #43425d;
    }
    .route-img {
        height: 150px;
    }
}
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
::v-deep {
    .traffic-route-contents {
        border: 1px solid #2f3380;
        max-width: 981px;
        margin: auto;
        padding: 20px 70px;
        margin-top: 35px;
        .list-group {
            .list-group-item {
                background-color: transparent;
                border: none;
                width: 100%;
                text-align: left;
                padding: 6px 10px;

                span {
                    color: #2f3380;
                    font-size: 17px;
                    font-weight: bold;
                }

                @media (min-width: 576px) {
                    width: 50%;
                }

                @media (min-width: 1200px) {
                    width: 33.33%;
                }
            }
        }
    }
}
</style>
