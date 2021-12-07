<template>
    <div class="content">
        <h3 class="page-header">
            The first step to loyal customers is to setup some rewards
        </h3>
        <b-row>
            <b-col cols="12" md="6" v-for="item in cards" :key="item.name">
                <b-card class="rewards-card">
                    <b-card-title class="text-center text-brand">{{
                        item.name
                    }}</b-card-title>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'rewards-page',
    data() {
        return {
            cards: [
                { name: 'Points-based Loyalty Program' },
                { name: 'Instant Program' },
                { name: 'Collectibles' },
                { name: 'Game Credit' }
            ]
        };
    },
    components: {}
};
</script>
<style scoped lang="scss">
.rewards-card {
    height: 250px;
}
</style>
