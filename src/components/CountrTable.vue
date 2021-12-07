<template>
    <div>
        <b-table
            thead-class="bg-light"
            responsive
            hover
            :items="items"
            borderless
        ></b-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { TOPIC: 40, URL: 'Macdonald' },
                { TOPIC: 40, URL: 'Macdonald' }
            ]
        };
    }
};
</script>
