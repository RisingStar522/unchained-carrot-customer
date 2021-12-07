<template>
    <div class="content fullheight-container mt-5">
        <b-form
            @submit.prevent=""
            class="fullheight-container__body with-buttons"
        >
            <b-container class="form_numeric_tab-form hidden-edit" fluid>
                <form-input-element
                    label="Organization Name"
                    placeholder="Organization name"
                    name="name"
                />

                <form-input-element
                    label="Organization Registration"
                    placeholder="Organization registration"
                    name="name"
                />
            </b-container>

            <h4 class="page-header">
                Contact Person
            </h4>

            <b-row>
                <div class="w-100 pl-3 pr-3">
                    <b-row>
                        <b-col sm="6">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="firstName">First Name</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="lastName">Last Name</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="email">Email</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="addressLine"
                                        >Address Line</label
                                    >
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="addressLine"
                                        type="text"
                                        placeholder="Address Line"
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                        </b-col>

                        <b-col sm="6">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="country">Country</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-select
                                        id="country"
                                        :options="[]"
                                    ></b-form-select>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="website">Website</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="website"
                                        type="text"
                                        placeholder="https://"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="privacy"
                                        >Privacy Policy URL</label
                                    >
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="privacy"
                                        type="text"
                                        placeholder="https://"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="toc"
                                        >Terms and Conditions URL</label
                                    >
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="toc"
                                        type="text"
                                        placeholder="https://"
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
            </b-row>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="outline-primary"
                    class="min-width-button"
                    size="lg"
                    @click="$router.go(-1)"
                >
                    Back
                </b-button>
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    type="submit"
                >
                    Save
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import FormInputElement from '@/components/Forms/FormInputElement.vue';

export default {
    name: 'organization',
    components: { FormInputElement }
};
</script>

<style scoped>
label {
    color: #2f3380;
}
</style>
