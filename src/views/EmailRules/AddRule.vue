<template>
    <div class="content with-sidebar fullheight-container">
        <div class="py-4">
            <h1 class="text-brand page-title">Create New Email Rule</h1>
            <h2 class="text-brand page-subtitle">Event: Member Registered</h2>
        </div>
        <b-form
            @submit.prevent="validateEmaailRuleAddForm"
            class="fullheight-container__body with-buttons"
            data-vv-scope="emailRuleAddForm"
        >
            <b-container class="form_numeric_tab-form" fluid>
                <form-input-element
                    :value.sync="rule.name"
                    v-model="rule.name"
                    label="Rule name"
                    placeholder="Rule name"
                    name="name"
                    v-validate="'required'"
                    :error="errors.first('emailRuleAddForm.name')"
                />
                <form-input-element
                    :value.sync="rule.service"
                    v-model="rule.service"
                    label="Mail service"
                    placeholder="Choose service"
                    :options="integrationList"
                    name="mailservice"
                    v-validate="'required'"
                    :sizes="{ lg: [2, 3] }"
                    :error="errors.first('emailRuleAddForm.mailservice')"
                />
                <form-input-element
                    :value.sync="rule.template"
                    v-model="rule.template"
                    label="Template"
                    placeholder="Choose template"
                    :options="templatesList"
                    :sizes="{ lg: [2, 3] }"
                />
                <form-input-element
                    :value.sync="rule.from"
                    label="From"
                    placeholder="from@example.com"
                    name="email"
                    v-validate="'required|email'"
                    :error="errors.first('emailRuleAddForm.email')"
                    v-model="rule.from"
                />
                <form-input-element
                    :value.sync="rule.fromName"
                    label="From name"
                    placeholder="From name"
                    name="fromName"
                    v-validate="'required'"
                    :error="errors.first('emailRuleAddForm.fromName')"
                    v-model="rule.fromName"
                />
                <form-input-element
                    :value.sync="rule.subject"
                    label="Subject"
                    placeholder="Subject"
                    name="subject"
                    v-validate="'required'"
                    :error="errors.first('emailRuleAddForm.subject')"
                    v-model="rule.subject"
                />
            </b-container>
            <div class="py-4">
                <h2 class="text-brand page-subtitle">Include merge tags:</h2>
            </div>
            <b-container fluid>
                <b-row class="medium-row">
                    <b-col lg="6" class="no-left-padding">
                        <b-form-checkbox id="fname" class="text-brand">
                            FNAME - first name of recepient
                        </b-form-checkbox>
                    </b-col>
                    <b-col lg="6" class="checkbox-with-select">
                        <b-form-checkbox id="refprog" class="text-brand">
                            Referral program
                        </b-form-checkbox>
                        <b-form-select
                            :options="templatesList"
                            size="sm"
                            style="width: 200px;"
                        />
                    </b-col>
                </b-row>
                <b-row class="medium-row">
                    <b-col lg="6" class="no-left-padding">
                        <b-form-checkbox id="lname" class="text-brand">
                            LNAME - first name of recepient
                        </b-form-checkbox>
                    </b-col>
                    <b-col lg="6">
                        <b-form-checkbox id="refprogid" class="text-brand">
                            REFFERALPROGRAMID - Referral Program Id
                        </b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row class="medium-row">
                    <b-col lg="6" class="no-left-padding">
                        <b-form-checkbox id="mdfive" class="text-brand">
                            MD5 - hash of recepient email address
                        </b-form-checkbox>
                    </b-col>
                    <b-col lg="6">
                        <b-form-checkbox id="refproglink" class="text-brand">
                            REFFERALLINK - Referral Link of the recepient
                        </b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row class="medium-row">
                    <b-col lg="6" class="no-left-padding">
                        <b-form-checkbox id="mdfive" class="text-brand">
                            UCCUID - Unchained Carrot User Id of the recepient
                        </b-form-checkbox>
                    </b-col>
                    <b-col lg="6">
                        <b-form-checkbox id="refprogid" class="text-brand">
                            REFFERALPENDING - Current pending balance of the
                            recepient
                        </b-form-checkbox>
                    </b-col>
                </b-row>
            </b-container>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="outline-primary"
                    class="min-width-button"
                    size="lg"
                    @click="$router.push('/email-rules')"
                >
                    Cancel
                </b-button>
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    type="submit"
                >
                    Create
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FormInputElement from '@/components/Forms/FormInputElement';

export default {
    components: {
        FormInputElement
    },
    data() {
        return {
            test: '',
            rule: {
                name: '',
                template: null,
                service: null,
                from: '',
                fromName: '',
                subject: ''
            }
        };
    },
    created() {
        this.$store.dispatch('getEmailTemplates');
        this.$store.dispatch('getIntegrations');
    },
    computed: {
        ...mapGetters(['emailTemplates', 'allIntegration']),
        templatesList() {
            return this.emailTemplates.map(item => {
                return { value: item._id, text: item.name };
            });
        },
        // integrationList() {
        //     return this.allIntegration.map(item => {
        //         return { value: item._id, text: item.externalSystem };
        //     });
        // }
    },
    watch: {
        templatesList(list) {
            if (list.length > 0) {
                this.rule.template = list[0].value;
            } else {
                this.rule.template = null;
            }
        }
    },
    methods: {
        async validateEmaailRuleAddForm() {
            await this.$validator.validateAll('emailRuleAddForm');
        }
    }
};
</script>
