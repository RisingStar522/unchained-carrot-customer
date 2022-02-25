<template>
    <b-form @submit.prevent="validateForm" data-vv-scope="loginForm">
        <div class="text-welcome">
            Welcome! Please complete to login.
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
        <md-field
            v-bind:class="{ 'md-invalid': errors.has('loginForm.password') }"
        >
            <label>Password</label>
            <md-input
                type="password"
                class="form-control"
                name="password"
                v-model="formModel.password"
                v-validate="'required'"
            />
            <span class="md-error">{{
                errors.first('loginForm.password')
            }}</span>
        </md-field>
        <div class="mb-4 clearfix">
            <small class="float-right">
                <b-link :to="{ name: 'Recovery' }" class="text-brand"
                    >Forgot password?</b-link
                >
            </small>
        </div>
        <div class="text-center">
            <b-btn type="submit" variant="brand" size="lg" class="btn-w200">
                Sign In
            </b-btn>
        </div>
        <div class="text-center mt-5">
            <b-link :to="{ name: 'SignUp' }" class="text-brand"
                >Do not have an account? Sign up!</b-link
            >
        </div>
        <div class="text-center mt-5">
            <small
                ><b-link href="" target="tab" class="text-brand"
                    >Term of use. Privacy policy.</b-link
                ></small
            >
        </div>
    </b-form>
</template>
<script>
export default {
    name: 'login-page',
    data() {
        return {
            formModel: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('loginForm').then(result => {
                if (result) {
                    this.$auth.login({
                        target: this.$route.params.target || ''
                    });
                }
            });
        }
    }
};
</script>
