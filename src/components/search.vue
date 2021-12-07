<template>
    <div>
        <input
            id="search-component"
            class="form-control"
            :size="size"
            :placeholder="placeholder"
            @input="searchHandler"
        />
    </div>
</template>

<script>
export default {
    name: 'search-component',
    props: {
        size: {
            type: String,
            default: 'lg'
        },
        placeholder: {
            type: String,
            default: 'Search...'
        },
        searchHandler: {
            type: Function,
            required: true
        }
    }
};
</script>
