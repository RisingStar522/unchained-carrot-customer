<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-else>
            <div
                class="personas-table-container"
                v-if="itemsForPersonas.length > 0"
            >
                <PersonasTable />
            </div>
        </div>
    </div>
</template>

<script>
import PersonasTable from './components/PersonasTable.vue';
export default {
    name: 'personas-list-page',
    components: {
        PersonasTable
    },
    data: () => ({
        loading: false
    }),
    computed: {
        itemsForPersonas() {
            // when you integrate with api, you have to alter following line.
            this.getAllPersonas = [{a:2},{b:2}]
            return JSON.parse(JSON.stringify(this.getAllPersonas));
        }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
.personas-container {
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
}
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
