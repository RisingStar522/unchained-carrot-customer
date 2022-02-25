<template>
    <b-form @submit.prevent="validateForm" data-vv-scope="loginForm">
        <div class="text-welcome">
            Enter your email and we send a password reset link
        </div>
        <md-field
            v-bind:class="{ 'md-invalid': errors.has('loginForm.email') }"
        >
            <label>Email</label>
            <md-input
                type="email"
                class="form-control"
                name="email"
                v-model="formModel.email"
                v-validate="'required|email'"
            />
            <span class="md-error">{{ errors.first('loginForm.email') }}</span>
        </md-field>
        <div class="float-left w-100 text-center mt-3">
            <b-btn type="submit" variant="brand" size="lg" class="btn-w200">
                Reset password
            </b-btn>
        </div>
    </b-form>
</template>
<script>
export default {
    name: 'recovery-page',
    data() {
        return {
            formModel: {
                email: ''
            }
        };
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('loginForm').then(result => {
                if (result) {
                }
            });
        }
    }
};
</script>
