<template>
    <div class="d-flex justify-content-center vh-100 align-items-center">
        <div>
            <h1 class="">Loading...</h1>
        </div>
    </div>
</template>
<script>
export default {
    name: 'callback',
    data() {
        return {
            target: null
        };
    },
    methods: {
        handleLoginEvent(data) {
            this.target = data.state.target || null;
        }
    },
    async created() {
        return this.$auth
            .handleAuthentication()
            .then(async () => {
                let hasAccount = await this.$store.dispatch('getCustomer');
                if (hasAccount) {
                    this.$router.push(this.target || '/');
                } else {
                    return this.$router.push({ name: 'CreateAccount' });
                }
            })
            .catch(() => {
                this.$router.push('/');
            });
    }
};
</script>
