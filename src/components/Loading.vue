<template>
    <div v-if="isLoading" :class="type" class="position--absolute">
        <b-spinner
            :class="size"
            id="spinner"
            :variant="variant"
            :label="label"
        ></b-spinner>
    </div>
</template>
<script>
export default {
    name: 'loading-spinner-component',
    props: {
        variant: {
            type: String,
            default: 'brand'
        },
        label: {
            type: String,
            default: 'loading...'
        },
        size: {
            type: String,
            default: 'lg'
        },
        type: {
            type: String,
            default: 'wide'
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.lg {
    width: 3rem;
    height: 3rem;
}
.position--absolute {
    position: absolute;
    z-index: 9999999;
}

.wide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #c3c3f480;
    overflow: hidden;
    top: 0;
    left: 0;
}
</style>
