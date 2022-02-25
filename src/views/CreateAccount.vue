<template>
    <div>
        <h1 class="text-center">Sign up!</h1>

        Please contact Unchained carrot to sign up.
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'registration-page',
    data() {
        return {
            countries: this.$store.state.countries,
            formModel: {
                organizationName: '',
                contactPerson: '',
                country: '',
                vatNumber: '',
                companyRegistration: '',
                website: '',
                terms: false
            }
        };
    },
    computed: {
        ...mapGetters(['customerId'])
    },
    watch: {
        customerId(val) {
            if (val) {
                return this.$router.push({ name: 'Home' });
            }
        }
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('signUpForm').then(result => {
                if (result) {
                    this.$store.dispatch(
                        'createCustomer',
                        Object.assign({}, this.formModel)
                    );
                }
            });
        },
        openPage(link) {
            window.open(link);
        }
    }
};
</script>
