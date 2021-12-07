<template>
    <div class="content">
        <h3 class="page-header">
            Account
        </h3>

        <b-tabs pills>
            <b-tab title="ORGANIZATION">
                <organization></organization>
            </b-tab>
            <b-tab title="SOCIAL MEDIA">
                <social-media></social-media>
            </b-tab>
            <b-tab title="EMPLOYEES">
                <employees></employees>
            </b-tab>
            <b-tab title="BILLING" active>
                <billing></billing>
            </b-tab>
            <b-tab title="SUBSCRIPTIONS"><div>Tab contents 2</div></b-tab>
        </b-tabs>
    </div>
</template>

<script>
import Organization from './Organization.vue';
import SocialMedia from './SocialMedia.vue';
import Employees from './Employees.vue';
import Billing from './Billing.vue';

export default {
    name: 'account-page',
    components: {
        Organization,
        SocialMedia,
        Employees,
        Billing
    }
};
</script>
