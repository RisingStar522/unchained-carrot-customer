<template>
    <b-alert show variant="info">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <b-icon-info-circle font-scale="2"></b-icon-info-circle>
                <span class="ml-2">{{ text }}</span>
            </div>
            <b-button
                v-if="link"
                variant="primary"
                size="sm"
                :href="link"
                target="_blank"
            >
                Learn more
            </b-button>
        </div>
    </b-alert>
</template>

<script>
export default {
    name: 'alert-mandate',
    props: {
        text: {
            type: String,
            required: true
        },
        link: {
            type: String
        }
    }
};
</script>
