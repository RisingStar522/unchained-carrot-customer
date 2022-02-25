<template>
    <div class="content">
        <div class="py-3">
            <h4 class="text-brand p-3">Active Integrations</h4>
            <b-row v-if="activeIntegrations.length > 0" class="d-flex logo">
                <div
                    v-for="integration in transformActiveIntegrations"
                    :key="integration"
                    class="col-md-4 col-sm-6"
                >
                    <router-link
                        :to="{
                            name: integration
                        }"
                    >
                        <b-card class="card">
                            <div
                                class="card-body p-0 d-flex justify-content-center logo-card"
                            >
                                <img
                                    :src="
                                        require(`@/assets/images/integrations/${integration.toLowerCase()}.png`)
                                    "
                                    :alt="integration"
                                />
                            </div>
                        </b-card>
                    </router-link>
                </div>
            </b-row>
            <div v-else>No integrations added</div>
        </div>
        <div>
            <h4 class="text-brand p-3">Integrations Catalog</h4>
            <b-row class="d-flex">
                <div
                    v-for="integration in catalogue"
                    :key="integration"
                    class="col-md-4 col-sm-6"
                >
                    <router-link
                        :to="{
                            name: capitalizeFirstLetter(integration)
                        }"
                    >
                        <b-card class="card">
                            <div
                                class="card-body p-0 d-flex justify-content-center logo-card"
                            >
                                <img
                                    :src="
                                        require(`@/assets/images/integrations/${integration.toLowerCase()}.png`)
                                    "
                                    :alt="integration"
                                />
                            </div>
                        </b-card>
                    </router-link>
                </div>
            </b-row>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'all-integrations-page',
    computed: {
        ...mapGetters(['allIntegrations', 'activeIntegrations']),
        transformActiveIntegrations() {
            return this.activeIntegrations.map(({ externalSystem }) =>
                this.capitalizeFirstLetter(externalSystem)
            );
        },
        transformAllIntegrations() {
            return this.allIntegrations.map(item =>
                this.capitalizeFirstLetter(item)
            );
        },
        catalogue() {
            let arr = [];
            let active = this.activeIntegrations.map(e => e.externalSystem);
            if (this.activeIntegrations.length > 0) {
                arr = this.allIntegrations.filter(e => !active.includes(e));
            } else {
                arr = this.allIntegrations;
            }
            return arr;
        }
    },

    methods: {
        capitalizeFirstLetter(string) {
            return (
                string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
            );
        },
        getActiveIntegrations() {
            this.$store.dispatch('getIntegrations').catch(err => {
                this.$notify({
                    title: err.response.data.name,
                    text: err.response.data.reason,
                    type: 'error'
                });
            });
        }
    },
    created() {
        this.getActiveIntegrations();
    },
    mounted() {
        const availableIntegrations =
            Object.keys(this.activeIntegrations).length > 0;
        if (!availableIntegrations) {
            this.getActiveIntegrations();
        }
    }
};
</script>
<style scoped>
.logo-card {
    height: 4rem;
}
</style>
