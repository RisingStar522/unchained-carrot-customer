<template>
    <section>
        <b-form>
            <b-form-group label="Hostname" label-for="hostname">
                <b-form-input
                    v-model="hostname"
                    id="hostname"
                    v-validate="'required'"
                    name="hostname"
                ></b-form-input>
                <span
                    class="text-danger"
                    v-for="error in errors.collect('hostname')"
                    :key="error"
                    >{{ error }}</span
                >
            </b-form-group>
            <b-form-group label="Custom domain" label-for="custom-domain">
                <b-form-radio
                    v-model="customDomain"
                    name="custom-domain"
                    :value="true"
                    >True</b-form-radio
                >
                <b-form-radio
                    v-model="customDomain"
                    name="custom-domain"
                    :value="false"
                    >False</b-form-radio
                >
            </b-form-group>
            <b-form-group label="SSL Certificate" label-for="sslCertificate">
                <b-form-select
                    v-model="sslCertificate"
                    :options="sslCertificateOptions"
                    name="sslCertificate"
                ></b-form-select>
            </b-form-group>
            <b-form-group
                label="Default root object"
                label-for="default-root-object"
            >
                <b-form-input
                    v-model="defaultRootObject"
                    id="default-root-object"
                    v-validate="'required'"
                    name="default-root-object"
                ></b-form-input>
                <span
                    class="text-danger"
                    v-for="error in errors.collect('default-root-object')"
                    :key="error"
                    >{{ error }}</span
                >
            </b-form-group>
            <b-form-group
                label="Viewer protocol policy"
                label-for="viewerProtocolPolicy"
            >
                <b-form-select
                    v-model="viewerProtocolPolicy"
                    :options="viewerProtocolPolicyOptions"
                    name="viewerProtocolPolicy"
                ></b-form-select>
            </b-form-group>

            <b-btn
                :disabled="loading"
                @click="submitHandler"
                block
                variant="success"
                >{{ !loading ? 'Submit' : 'Loading...' }}
            </b-btn>
        </b-form>
    </section>
</template>

<script>
export default {
    name: 'provisioning-form',
    data: () => ({
        hostname: '',
        customDomain: false,
        sslCertificate: 'no',
        defaultRootObject: 'index.html',
        viewerProtocolPolicy: 'Redirect HTTP to HTTPS',
        sslCertificateOptions: [
            { value: 'no', text: 'No' },
            { value: 'yes', text: 'Yes' }
        ],
        viewerProtocolPolicyOptions: [
            { value: 'Redirect HTTP to HTTPS', text: 'Redirect HTTP to HTTPS' }
        ],
        loading: false
    }),
    methods: {
        async provisionLandingPage(payload) {
            return await this.$store.dispatch('provisionLandingPage', payload);
        },
        submitHandler() {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.loading = true;

                    const payload = {
                        hostname: this.hostname,
                        customDomain: this.customDomain,
                        SSLcertificate: this.sslCertificate,
                        defaultRootObject: this.defaultRootObject,
                        viewerProtocolPolicy: this.viewerProtocolPolicy
                    };

                    this.provisionLandingPage(payload)
                        .then(resp => {
                            this.$notify({
                                title: 'Success',
                                text: resp,
                                type: 'Success'
                            });

                            this.$router.push({ name: 'PageBuilder/pages' });
                        })
                        .catch(e => {
                            this.$notify({
                                title: 'Error provisioning page',
                                text: e,
                                type: 'error'
                            });
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        }
    }
};
</script>
