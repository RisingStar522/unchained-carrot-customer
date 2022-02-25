<template>
    <b-alert show variant="light">
        <img
            v-if="option === 'recommended'"
            src="../../assets/icons/UC_icons-recommended.svg"
            class="w-icon"
            alt=""
        />
        <img
            v-if="option === 'mandatory'"
            src="../../assets/icons/UC_icons_mandatory.svg"
            class="w-icon"
            alt=""
        />
        <img
            v-if="option === 'optional'"
            src="../../assets/icons/UC_icons_optional.svg"
            class="w-icon"
            alt=""
        />
        <span class="ml-2 font-weight-bold">{{ text }}</span>
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
        option: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.w-icon {
    width: 32px;
}
</style>
