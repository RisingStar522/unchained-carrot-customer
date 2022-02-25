<template>
    <div class="content">
        <div class="loader" v-if="loading">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-else>
            <div class="event-table-container" v-if="itemsForEvent.length > 0">
                <EventTable />
            </div>
        </div>
    </div>
</template>

<script>
import EventTable from './components/EventTable.vue';

export default {
    name: 'event-page',
    components: {
        EventTable
    },
    data: () => ({
        loading: false
    }),
    computed: {
        itemsForEvent() {
            this.getAllEvent = [{ a: 'a' }, { b: 'b' }];
            return JSON.parse(JSON.stringify(this.getAllEvent));
        }
    }
};
</script>

<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
