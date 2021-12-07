<template>
    <div class="template_grid-item" :class="{ whitebg: item.html }">
        <span class="zoom-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <defs>
                    <clipPath id="a">
                        <rect width="16" height="16" fill="none" />
                    </clipPath>
                </defs>
                <g clip-path="url(#a)">
                    <path
                        d="M12.7,11.23a6.777,6.777,0,0,0,1.4-4.174A7.02,7.02,0,0,0,7.1,0,7.105,7.105,0,0,0,0,7.056a7.105,7.105,0,0,0,7.1,7.056,6.667,6.667,0,0,0,4.2-1.391l3,2.981a.971.971,0,0,0,1.4,0,.957.957,0,0,0,0-1.391Zm-5.6.8A5.022,5.022,0,0,1,2,7.056a5.1,5.1,0,0,1,10.2,0A5.022,5.022,0,0,1,7.1,12.025Z"
                    />
                </g>
            </svg>
        </span>
        <div v-if="item.html" class="iframe-griditem_wrapper">
            <iframe class="iframe-griditem" :src="item.html" frameBorder="0">
            </iframe>
        </div>
        <div v-else>
            <img
                v-if="item.image"
                :src="item.image"
                :alt="`${item.title}-${item.image}`"
            />
        </div>
        <div v-if="nobottom === false" class="template_grid-item-footer">
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.iframe-griditem {
    padding: 10px;
}
</style>

<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    title: '',
                    image: '',
                    html: ''
                };
            }
        },
        // if "nobottom" is set to true, title won't be displayed
        nobottom: {
            type: Boolean,
            default: false
        }
    }
};
</script>
