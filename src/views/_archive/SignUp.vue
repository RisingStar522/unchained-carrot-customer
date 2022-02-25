<template>
    <b-form @submit.prevent="validateForm" data-vv-scope="signUpForm">
        <div class="text-welcome">
            Welcome! Please complete to create your account.
        </div>
        <md-field
            v-bind:class="{ 'md-invalid': errors.has('signUpForm.company') }"
        >
            <label>Company name</label>
            <md-input
                type="text"
                name="company"
                v-model="formModel.company"
                v-validate="'required'"
            />
            <span class="md-error">{{
                errors.first('signUpForm.company')
            }}</span>
        </md-field>
        <md-field
            v-bind:class="{ 'md-invalid': errors.has('signUpForm.person') }"
        >
            <label>Contact person</label>
            <md-input
                type="text"
                name="person"
                v-model="formModel.person"
                v-validate="'required'"
            />
            <span class="md-error">{{
                errors.first('signUpForm.person')
            }}</span>
        </md-field>
        <md-field
            v-bind:class="{ 'md-invalid': errors.has('signUpForm.country') }"
        >
            <label>Country</label>
            <md-select
                name="country"
                v-model="formModel.country"
                v-validate="'required'"
            >
                <md-option
                    v-for="item in countries"
                    :value="item['alpha-2']"
                    :key="item['alpha-2']"
                    >{{ item['name'] }}</md-option
                >
            </md-select>
            <span class="md-error">{{
                errors.first('signUpForm.country')
            }}</span>
        </md-field>
        <md-field v-bind:class="{ 'md-invalid': errors.has('signUpForm.vat') }">
            <label>VAT Number</label>
            <md-input
                type="text"
                name="vat"
                v-model="formModel.vat"
                v-validate="'required'"
            />
            <span class="md-error">{{ errors.first('signUpForm.vat') }}</span>
        </md-field>
        <md-field
            v-bind:class="{
                'md-invalid': errors.has('signUpForm.registration')
            }"
        >
            <label>Company Registration</label>
            <md-input
                type="text"
                name="registration"
                v-model="formModel.registration"
                v-validate="'required'"
            />
            <span class="md-error">{{
                errors.first('signUpForm.registration')
            }}</span>
        </md-field>
        <md-field
            v-bind:class="{ 'md-invalid': errors.has('signUpForm.website') }"
        >
            <label>Website</label>
            <md-input
                type="text"
                name="website"
                v-model="formModel.website"
                v-validate="'required'"
            />
            <span class="md-error">{{
                errors.first('signUpForm.website')
            }}</span>
        </md-field>
        <div
            class="mb-3"
            v-bind:class="{ 'md-invalid': errors.has('signUpForm.terms') }"
        >
            <md-checkbox
                name="terms"
                v-model="formModel.terms"
                class="md-primary"
            >
                I agree with
                <b-link
                    class="text-brand"
                    @click.stop.prevent="openPage('/terms')"
                    >terms</b-link
                >
                and
                <b-link
                    class="text-brand"
                    @click.stop.prevent="openPage('/conditions')"
                    >conditions</b-link
                >
                <small
                    class="d-block text-error"
                    v-show="errors.has('signUpForm.terms')"
                    >{{ errors.first('signUpForm.terms') }}</small
                >
            </md-checkbox>
            <input
                class="d-none"
                type="checkbox"
                name="terms"
                v-validate="'required'"
                v-model="formModel.terms"
            />
        </div>
        <div class="text-center">
            <b-btn type="submit" variant="brand" size="lg" class="btn-w200">
                Sign Up
            </b-btn>
        </div>
        <div class="text-center mt-5">
            <b-link :to="{ name: 'Login' }" class="text-brand"
                >Already have an account? Sign in.</b-link
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
    name: 'signup-page',
    data() {
        return {
            countries: this.$store.state.countries,
            formModel: {
                company: '',
                person: '',
                country: '',
                vat: '',
                registration: '',
                website: '',
                terms: false
            }
        };
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('signUpForm').then(result => {
                if (result) {
                }
            });
        },
        openPage(link) {
            window.open(link);
        }
    }
};
</script>
