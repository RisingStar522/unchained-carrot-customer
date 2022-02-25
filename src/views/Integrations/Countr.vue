<template>
    <div class="content">
        <div class="my-2">
            <B-btn
                variant="outline-brand"
                aria-roledescription="go back"
                title="go back"
                @click="$router.back()"
            >
                <fa-icon icon="arrow-left"
            /></B-btn>
        </div>
        <div class="py-4">
            <h4 class="text-brand">Integrations - Countr</h4>
        </div>

        <md-steppers :md-active-step.sync="active" md-alternative md-linear>
            <md-step id="step-1" md-label="Step 1">
                <div>
                    <h5 class="text-brand">
                        Allow Unchained Carrot to access your Countr account
                    </h5>
                </div>
                <div>
                    <b-row class="d-flex">
                        <div class="col-md-8">
                            <b-form>
                                <b-form-group
                                    label="Authorization Code"
                                    label-for="authorization-code"
                                    label-cols-md="4"
                                >
                                    <b-form-input
                                        v-model="countr.authorizationCode"
                                        id="authorization-code"
                                        v-validate="'required|alpha_dash'"
                                        name="authorization-code"
                                        placeholder="e.g. code-2eecbb"
                                    ></b-form-input>
                                    <span
                                        class="text-danger"
                                        v-for="error in errors.collect(
                                            'authorization-code'
                                        )"
                                        :key="error"
                                        >{{ error }}</span
                                    >
                                </b-form-group>
                                <div class="d-flex mb-3">
                                    <b-button
                                        :disabled="
                                            !countr.authorizationCode ||
                                                errors.items.length > 0 ||
                                                loading
                                        "
                                        @click="authorize"
                                        class="ml-auto"
                                        variant="brand"
                                        >Authorize
                                        <b-spinner
                                            v-if="loading"
                                            small
                                        ></b-spinner>
                                        <span class="sr-only"
                                            >Loading...</span
                                        ></b-button
                                    >
                                </div>
                            </b-form>
                        </div>

                        <div class="col-md-4">
                            <b-card>
                                <div>
                                    <fa-icon
                                        class="text-brand"
                                        icon="info-circle"
                                    />
                                </div>
                                <div class="text-secondary">
                                    Contact your Countr account manager to
                                    obtain the Authorization Code
                                </div>
                            </b-card>
                        </div>
                    </b-row>
                </div>
            </md-step>

            <md-step id="step-2" md-label="Step 2">
                <div>
                    <h5 class="text-brand">
                        Your Countr Account
                    </h5>
                </div>

                <div>
                    <b-row class="d-flex">
                        <div class="col-md-8">
                            <b-form>
                                <b-form-group
                                    label="Organization"
                                    label-for="organization"
                                    label-cols-md="4"
                                >
                                    <b-form-input
                                        v-model="countr.organization"
                                        id="organization"
                                        v-validate="'required|alpha_spaces'"
                                        name="organization"
                                    ></b-form-input>
                                    <span
                                        class="text-danger"
                                        v-for="error in errors.collect(
                                            'organization'
                                        )"
                                        :key="error"
                                        >{{ error }}</span
                                    >
                                </b-form-group>

                                <b-form-group
                                    label="Stores"
                                    label-for="stores"
                                    label-cols-md="4"
                                >
                                    <b-form-input
                                        v-model="countr.stores"
                                        id="stores"
                                        v-validate="'required|numeric'"
                                        name="stores"
                                    ></b-form-input>
                                    <span
                                        class="text-danger"
                                        v-for="error in errors.collect(
                                            'stores'
                                        )"
                                        :key="error"
                                        >{{ error }}</span
                                    >
                                </b-form-group>

                                <b-form-group
                                    label="Devices"
                                    label-for="devices"
                                    label-cols-md="4"
                                >
                                    <b-form-input
                                        v-model="countr.devices"
                                        id="devices"
                                        v-validate="'required|numeric'"
                                        name="devices"
                                    ></b-form-input>
                                    <span
                                        class="text-danger"
                                        v-for="error in errors.collect(
                                            'devices'
                                        )"
                                        :key="error"
                                        >{{ error }}</span
                                    >
                                </b-form-group>

                                <b-form-group
                                    label="Products"
                                    label-for="products"
                                    label-cols-md="4"
                                >
                                    <b-form-input
                                        v-model="countr.products"
                                        id="products"
                                        v-validate="'required|numeric'"
                                        name="products"
                                    ></b-form-input>
                                    <span
                                        class="text-danger"
                                        v-for="error in errors.collect(
                                            'products'
                                        )"
                                        :key="error"
                                        >{{ error }}</span
                                    >
                                </b-form-group>

                                <b-form-group
                                    label="Vouchers"
                                    label-for="vouchers"
                                    label-cols-md="4"
                                >
                                    <b-form-input
                                        v-model="countr.vouchers"
                                        id="vouchers"
                                        v-validate="'required|numeric'"
                                        name="vouchers"
                                    ></b-form-input>
                                    <span
                                        class="text-danger"
                                        v-for="error in errors.collect(
                                            'vouchers'
                                        )"
                                        :key="error"
                                        >{{ error }}</span
                                    >
                                </b-form-group>
                            </b-form>

                            <div>
                                <div class="py-4">
                                    <h5 class="text-brand">
                                        Setup Webhooks in Countr to send events
                                        to Unchained Carrot
                                    </h5>
                                </div>

                                <div class="d-flex mb-3">
                                    <b-button
                                        v-b-modal.countr-topic
                                        class="ml-auto"
                                        variant="brand"
                                        >Add</b-button
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4"></div>
                        <div class="col-md-12">
                            <b-card>
                                <div class="d-flex justify-content-sm-between">
                                    <span>Eligible Events</span>
                                    <b-btn
                                        v-b-modal.countr-topic
                                        class="text-brand ml-auto"
                                        variant="default"
                                    >
                                        <fa-icon icon="plus-circle" /> Add
                                        event</b-btn
                                    >
                                </div>
                                <CountrTable />
                            </b-card>
                        </div>
                    </b-row>
                </div>
            </md-step>
        </md-steppers>
        <div class="d-flex">
            <div class="ml-auto">
                <b-button
                    @click="prevStep"
                    class="mr-3 btn-lg"
                    variant="outline-brand"
                    >Back</b-button
                >
                <!-- /** TODO: add :disabled="isNextBtnActive" */ -->
                <b-button @click="nextStep" class="btn-lg" variant="brand"
                    >Next</b-button
                >
            </div>
        </div>

        <CountrTopicModal />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CountrTable from '@/components/CountrTable';
import CountrTopicModal from '@/components/Modals/countr-topic';
export default {
    name: 'integrations-countr-page',
    components: {
        CountrTable,
        CountrTopicModal
    },
    data: () => ({
        isNextBtnActive: false,
        loading: false,
        active: 'step-1',
        stepNumber: 1,
        countr: {
            authorizationCode: '',
            organization: '',
            stores: ''
        }
    }),
    computed: {
        ...mapGetters(['customerId'])
    },
    methods: {
        authorize() {
            this.$validator.validate('authorization-code').then(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('getAuthorization', {
                            customerId: this.customerId,
                            authorizationCode: this.countr.authorizationCode
                        })
                        .then(() => {
                            this.$notify({
                                title: 'Success',
                                text: 'Authorization successful',
                                type: 'success'
                            });
                            this.loading = false;
                            this.isNextBtnActive = true;
                        })
                        .catch(err => {
                            this.$notify({
                                title: err.response.data.name,
                                text: err.response.data.reason,
                                type: 'error'
                            });
                            this.loading = false;
                        });
                }
            });
        },
        nextStep() {
            if (this.stepNumber !== 2) {
                this.stepNumber += 1;
            }

            this.active = `step-${this.stepNumber}`;
        },
        prevStep() {
            if (this.stepNumber !== 1) {
                this.stepNumber -= 1;
            }

            this.active = `step-${this.stepNumber}`;
        }
    }
};
</script>
