<template>
    <div class="organization">
        <b-card class="mt-5">
            <div class="validation_mark">
                <img
                    class="mr-2"
                    src="../../../assets/icons/validation_mandatory.svg"
                />
                <span>MANDATORY</span>
            </div>
            <b-card-title class="text-primary mb-5 mt-4 cardTitle"
                >General</b-card-title
            >
            <b-row>
                <b-col>
                    <b-form-group>
                        <label class="text-primary">Organization Name</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.organizationName"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary"
                            >Organization Shortname</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.organizationShortName"
                            />
                            <b-button
                                variant="default"
                                class="p-0"
                                v-b-tooltip.hover
                                title="The short name is used to generate links for landing pages, referral links etc, in case no custom domain has been configured. For example, referral links will be shortname.rfby.me, landing pages will be hosted on pages.unchainedcarrot.com/shortname"
                            >
                                <fa-icon
                                    icon="info-circle"
                                    class="text-primary ml-3"
                                />
                            </b-button>
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary"
                            >Organization Registration</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.organizationRegistration"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary">Organization Address</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.organizationAddress"
                            />
                            <b-button
                                variant="default"
                                class="p-0"
                                v-b-tooltip.hover
                                title="The address line is automatically added into the footer of emails and landing pages for regulatory compliance."
                            >
                                <fa-icon
                                    icon="info-circle"
                                    class="text-primary ml-3"
                                />
                            </b-button>
                        </div>
                    </b-form-group>
                </b-col>

                <b-col>
                    <b-form-group>
                        <label class="text-primary">Country</label>
                        <div class="d-flex align-items-center">
                            <b-form-select
                                v-model="generalData.country"
                                :options="countryOption"
                            ></b-form-select>
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary">Website</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.website"
                                :state="validateUrl"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary"
                            >Terms & Conditions URL</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.termAndConditionUrl"
                            />
                            <b-button
                                variant="default"
                                class="p-0"
                                v-b-tooltip.hover
                                title="The terms & conditions URL is automatically added into the footer of emails and landing pages. Make sure that your terms match to kind of campaigns you intend to run using Unchained Carrot."
                            >
                                <fa-icon
                                    icon="info-circle"
                                    class="text-primary ml-3"
                                />
                            </b-button>
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary">Privacy Policy URL</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="generalData.privacyPolicyUrl"
                            />
                            <b-button
                                variant="default"
                                class="p-0"
                                v-b-tooltip.hover
                                title="The privacy policy URL is automatically added into the footer of emails and landing pages for regulatory compliance."
                            >
                                <fa-icon
                                    icon="info-circle"
                                    class="text-primary ml-3"
                                />
                            </b-button>
                        </div>
                    </b-form-group>
                </b-col>

                <b-col class="d-flex align-items-center px-5">
                    <div>
                        <p class="mb-1 ml-3 text-primary">Organization Logo</p>
                        <div v-if="logoFiles.length">
                            <img
                                :src="logoFiles[0].url"
                                width="160px"
                                height="144px"
                            />
                        </div>
                        <div
                            style="opacity: 0.4; width: fit-content"
                            class="text-primary d-flex flex-column align-items-center justify-content-center border border-5 rounded px-5 py-3 ml-3"
                            v-else
                        >
                            <p class="mb-0" style="font-size: 10px">1:1</p>
                            <p class="mb-0" style="font-size: 10px">
                                540 x 540 px
                            </p>
                            <fa-icon
                                icon="cloud-upload-alt"
                                style="font-size: 50px"
                            />
                            <p class="mb-0" style="font-size: 10px">
                                Max 512 KB
                            </p>
                        </div>
                        <file-upload
                            input-id="logo-file"
                            class="btn"
                            name="logoFile"
                            ref="logoUpload"
                            :extensions="extensions"
                            :headers="headers"
                            :accept="acceptTypes"
                            :multiple="false"
                            :drop="true"
                            :drop-directory="false"
                            @input-filter="logoInputFilter"
                            @input-file="logoInputFile"
                            v-model="logoFiles"
                        >
                            <div
                                class="d-flex align-items-center"
                                style=" cursor: pointer;"
                            >
                                <fa-icon
                                    icon="arrow-circle-up"
                                    class="text-primary"
                                />
                                <p
                                    class="mb-0 ml-2 text-primary"
                                    style="text-decoration: underline;"
                                >
                                    Choose file
                                </p>
                            </div>
                        </file-upload>
                    </div>
                    <p class="ml-5 w-50">
                        This image will appear in the notification emails of
                        your campaigns
                    </p>
                </b-col>
            </b-row>
        </b-card>

        <b-card class="mt-5">
            <div class="validation_mark">
                <img
                    class="mr-2"
                    src="../../../assets/icons/validation_recommend.svg"
                />
                <span>RECOMMENDED</span>
            </div>
            <b-card-title class="text-primary mt-4 cardTitle"
                >Contact Person</b-card-title
            >
            <p class="mb-0">
                This is the information we have associated with your UC profile,
                which you can use to access multiple accounts.
            </p>
            <p>
                If you need to reset your username or password, or verify
                account changes, we'll send the link to your profile email
                address.
            </p>
            <p>
                All contact information is kepts strictly confidential. View our
                <b class="text-primary">privacy policy</b>
            </p>
            <b-row>
                <b-col>
                    <b-form-group>
                        <label class="text-primary">First Name</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="
                                    contactPersonData.contactPersonFirstName
                                "
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary">Email</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                type="email"
                                required
                                v-model="contactPersonData.contactPersonEmail"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group>
                        <label class="text-primary">Last name</label>
                        <div class="d-flex align-items-center">
                            <b-form-input
                                v-model="
                                    contactPersonData.contactPersonLastName
                                "
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary">Country</label>
                        <div class="d-flex align-items-center">
                            <b-form-select
                                v-model="contactPersonData.country"
                                :options="countryOption"
                            ></b-form-select>
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-card>

        <b-card class="mt-5">
            <div class="validation_mark">
                <img
                    class="mr-2"
                    src="../../../assets/icons/validation_recommend.svg"
                />
                <span>RECOMMENDED</span>
            </div>
            <b-card-title class="text-primary mt-4 cardTitle"
                >Social Media</b-card-title
            >
            <p>
                Enter the links to your Social Media accounts here. The links
                can then be merged into emails and landing pages.
            </p>
            <b-row>
                <b-col>
                    <b-form-group>
                        <label class="text-primary">
                            <fa-icon
                                :icon="{
                                    prefix: 'fab',
                                    iconName: 'facebook'
                                }"
                                class="text-primary mr-2"
                            />Facebook</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                placeholder="https://nl-nl.facebook.com/my-company/"
                                v-model="socialMediaData.facebook"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary"
                            ><fa-icon
                                :icon="{
                                    prefix: 'fab',
                                    iconName: 'youtube'
                                }"
                                class="text-primary mr-2"
                            />Youtube</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                placeholder="https://www.youtube.com/channel/UC21xMErtZEraSL5rhfplHZA"
                                v-model="socialMediaData.youtube"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>
                    <b-form-group>
                        <label class="text-primary"
                            ><fa-icon
                                :icon="{
                                    prefix: 'fab',
                                    iconName: 'twitter'
                                }"
                                class="text-primary mr-2"
                            />Twitter</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                placeholder="https://twitter.com/CarrotUnchained"
                                v-model="socialMediaData.twitter"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group>
                        <label class="text-primary"
                            ><fa-icon
                                :icon="{
                                    prefix: 'fab',
                                    iconName: 'instagram'
                                }"
                                class="text-primary mr-2"
                            />Instagram</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                placeholder="https://www.instagram.com/unchainedcarrot/"
                                v-model="socialMediaData.instagram"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary"
                            ><fa-icon
                                :icon="{
                                    prefix: 'fab',
                                    iconName: 'linkedin'
                                }"
                                class="text-primary mr-2"
                            />Linkedin</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                placeholder="https://www.linkedin.com/company/unchained-carrot"
                                v-model="socialMediaData.linkedin"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <label class="text-primary"
                            ><fa-icon
                                :icon="{
                                    prefix: 'fab',
                                    iconName: 'telegram'
                                }"
                                class="text-primary mr-2"
                            />Telegram</label
                        >
                        <div class="d-flex align-items-center">
                            <b-form-input
                                placeholder="https://t.me/my-company"
                                v-model="socialMediaData.telegram"
                            />
                            <div style="margin-left: 30px" />
                        </div>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'organization-tab',
    data: () => ({
        headers: {},
        extensions: 'gif,jpg,jpeg,png',
        acceptTypes: 'image/png,image/gif,image/jpeg,image/jpg',
        logoFiles: [],
        selectedCountry: null,
        countryOption: require('./countries.json'),
        generalData: {
            organizationName: '',
            organizationShortName: '',
            website: '',
            organizationRegistration: '',
            organizationAddress: '',
            termAndConditionUrl: '',
            privacyPolicyUrl: '',
            country: ''
        },
        contactPersonData: {
            contactPersonFirstName: '',
            contactPersonLastName: '',
            contactPersonEmail: '',
            country: ''
        },
        socialMediaData: {
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            twitter: '',
            telegram: ''
        }
    }),
    computed: {
        validateUrl() {
            if (!this.generalData.website) return null;
            var re = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
            return re.test(this.generalData.website);
        }
    },
    methods: {
        async getCustomer() {
            try {
                const response = await this.$store.dispatch('getCustomer');
                console.log('response =>', response);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        logoInputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    alert('Your choice is not a picture');
                    return prevent();
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = '';
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file);
                }
            }
        },
        logoInputFile(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                this.$nextTick(function() {
                    this.logoEdit = true;
                    this.$bvModal.show('logo-crop-modal');
                });
            }
            if (!newFile && oldFile) {
                this.logoEdit = false;
                this.$bvModal.hide('logo-crop-modal');
            }
        }
    },
    async mounted() {
        try {
            const response = await this.getCustomer();
            this.generalData = {
                ...this.generalData,
                organizationName: response.organizationName,
                organizationAddress: response.address,
                organizationRegistration: response.companyRegistration || '',
                privacyPolicyUrl: response.privacyPolicyUrl || '',
                website: response.website,
                country: response.country
            };
            this.contactPersonData = {
                ...this.contactPersonData,
                contactPersonFirstName: response.contactPersonFirstName,
                contactPersonLastName: response.contactPersonLastName,
                contactPersonEmail: response.contactPersonEmail,
                country: response.country
            };
        } catch (error) {}
    }
};
</script>

<style lang="scss" scoped>
.validation_mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;

    span {
        color: #a3a0fb;
        font-size: 12px;
        line-height: 20px;
    }
}
.cardTitle {
    font-weight: 700;
}
</style>
