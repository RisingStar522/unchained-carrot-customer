<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-else>
            <div
                class="audiences-table-container"
                v-if="itemsForAudiences.length > 0"
            >
                <AudiencesTable />
            </div>
        </div>
    </div>
</template>

<script>
import AudiencesTable from './components/AudiencesTable.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'audiences-page',
    components: {
        AudiencesTable
    },
    data: () => ({
        loading: false
    }),
    async created() {
        this.loading = true;
        this.$store.dispatch('getAllTrafficRoutes', {}).then(() => {
            this.loading = false;
        });
    },
    computed: {
        ...mapGetters(['getAllTrafficRoutes']),
        itemsForAudiences() {
            return JSON.parse(JSON.stringify(this.getAllTrafficRoutes));
        }
    },
    mounted() {
        this.$store.commit('SET_INIT_REMAINING_DESTINATION_PERCENT', 100);
    }
};
</script>

<style lang="scss" scoped>
.audiences-container {
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
