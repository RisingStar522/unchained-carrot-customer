<template>
    <div class="error-page">
        <div>
            <h1 class="error-title">ERROR</h1>
            <fa-icon class="error-icon" icon="exclamation-triangle" size="3x" />
            <p class="error-text">Page does not exist</p>
            <b-btn variant="brand" class="error-btn" @click="goBack">
                Return
            </b-btn>
            <router-link
                tag="button"
                class="btn error-btn btn-brand"
                :to="{ name: 'Home' }"
            >
                Home
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
    methods: {
        goBack() {
            this.$router.history.go(-1);
        }
    }
};
</script>
