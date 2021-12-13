<style scoped>
.calendar-class {
    width: 25% !important;
}
</style>
<template>
    <main class="content">
        <div class="container mt-3">
            <b-form @submit.prevent="onSubmit">
                <div
                    class="
                        d-flex
                        justify-content-between
                        align-items-center
                        pl-2 pt-3 pb-3 pr-3
                    "
                >
                    <h3>Add Persona</h3>
                    <div class="justify-content-end">
                        <b-button
                            type="button"
                            class="mr-4"
                            variant="outline-brand"
                            @click="goBack"
                            >Cancel and go back</b-button
                        >
                        <b-button
                            type="submit"
                            variant="brand"
                            :disabled="!itemsForDestination.length"
                            >
                            {{
                                !addPersonaId ? 'Add' : 'Update'
                            }}
                            Persona</b-button
                        >
                        
                    </div>
                </div>

                <b-row class="mb-3 ml-1 block-1">
                    <b-card class="w-100 px-4 pt-4 pb-2">
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_recommend.svg"
                            />
                            <span>RECOMMEDED</span>
                        </div>
                        <b-row>
                            <b-col sm="12">
                                <div class="d-flex align-items-center">
                                    <h2 class="text-primary">
                                        General Details
                                    </h2>
                                    <a
                                        href="https://unchainedcarrot.com/support/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            class="ml-3 mb-2"
                                            src="../../assets/icons/noun_Info.svg"
                                        />
                                    </a>
                                </div>

                                <p>
                                    These details will help you to personalize better your marketing activities.
                                </p>

                                <b-row class="mt-4">
                                    <b-col sm="4">
                                        <b-form-group
                                            id="input-group-route"
                                            label="First Name"
                                        >
                                            <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                "
                                            >
                                                <b-form-input
                                                    id="input-code"
                                                    type="text"
                                                    v-model="formData.firstName"
                                                    placeholder=""
                                                    required
                                                >
                                                </b-form-input>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="4">
                                        <b-form-group
                                            id="input-group-route"
                                            label="Last Name"
                                        >
                                            <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                "
                                            >
                                                <b-form-input
                                                    id="input-code"
                                                    type="text"
                                                    v-model="formData.lastName"
                                                    placeholder=""
                                                    required
                                                >
                                                </b-form-input>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="3">
                                        <div>
                                            <label for="example-input">Date of Birth</label>
                                            <b-input-group class="mb-3">
                                                <b-form-input
                                                    id="example-input"
                                                    v-model="formData.dateOfBirth"
                                                    type="text"
                                                    placeholder="DD-MM-YYYY"
                                                    autocomplete="off"
                                                >
                                                </b-form-input>
                                            <b-input-group-append>
                                                <b-form-datepicker
                                                    v-model="formData.dateOfBirth"
                                                    button-only
                                                    right
                                                    locale="en-US"
                                                    aria-controls="example-input"
                                                    @context="onContext"
                                                >
                                                </b-form-datepicker>
                                            </b-input-group-append>
                                            </b-input-group>
                                        </div>
                                    </b-col>
                                    <b-col sm="1"></b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="4">
                                        <b-form-group
                                            id="input-group-route"
                                            label="Email"
                                        >
                                            <div
                                                class="
                                                    d-flex
                                                    align-items-center
                                                "
                                            >
                                                <b-form-input
                                                    id="input-code"
                                                    type="text"
                                                    v-model="formData.email"
                                                    variant="outline-primary"
                                                    placeholder="E.g. youremail@example.com"
                                                    required
                                                ></b-form-input>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="7" >
                                        <b-row>
                                            <b-col sm="12">
                                                <label for="store-country">Store Country</label>
                                                <b-dropdown
                                                    :text="selectedCountry"
                                                    block
                                                    variant="outline-primary"
                                                    menu-class="w-100"
                                                >
                                                    <b-dropdown-item
                                                        v-for="option in storeCountries"
                                                        :key="option.value"
                                                        :value="option.value"
                                                        placeholder="Search Country"
                                                        @click="selectedCountry = option.value"
                                                        >{{ option.text }}</b-dropdown-item
                                                    >
                                                </b-dropdown>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col sm="1">
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>

                <b-row class="mb-3 ml-1 block-1">
                    <b-card class="w-100 px-4 pt-4 pb-2">
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_recommend.svg"
                            />
                            <span>RECOMMENDED</span>
                        </div>
                        <b-row>
                            <b-col sm="12">
                                <div class="d-flex align-items-center">
                                    <h2 class="text-primary">
                                        Memberships
                                    </h2>
                                    <a
                                        href="https://unchainedcarrot.com/support/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            class="ml-3 mb-2"
                                            src="../../assets/icons/noun_Info.svg"
                                        />
                                    </a>
                                </div>

                                <p>You can configure multiple traits for your persona.</p>

                                <b-row class="mt-4">
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral1"
                                            class="md-primary"
                                        >
                                            Referral Program 1
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral2"
                                            class="md-primary"
                                        >
                                            Referral Program 2
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral3"
                                            class="md-primary"
                                        >
                                            Referral Program 3
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.referral4"
                                            class="md-primary"
                                        >
                                            Referral Program 4
                                        </md-checkbox>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty1"
                                            class="md-primary"
                                        >
                                            Loralty Program 1
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty2"
                                            class="md-primary"
                                        >
                                            Loralty Program 2
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty3"
                                            class="md-primary"
                                        >
                                            Loralty Program 3
                                        </md-checkbox>
                                    </b-col>
                                    <b-col cols="12" md="3" class="text-left checkbox-group">
                                        <md-checkbox
                                            name="terms"
                                            :value="true"
                                            v-model="formData.loyalty4"
                                            class="md-primary"
                                        >
                                            Loralty Program 4
                                        </md-checkbox>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>

                <b-row class="mb-3 ml-1 block-1">
                    <b-card class="w-100 px-4 pt-4 pb-2">
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_recommend.svg"
                            />
                            <span>RECOMMENDED</span>
                        </div>
                        <b-row>
                            <b-col sm="12">
                                <div class="d-flex align-items-center">
                                    <h2 class="text-primary">
                                        Traits
                                    </h2>
                                    <a
                                        href="https://unchainedcarrot.com/support/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            class="ml-3 mb-2"
                                            src="../../assets/icons/noun_Info.svg"
                                        />
                                    </a>
                                </div>

                                <p>You can configure multiple traits for your persona.</p>

                                <b-row class="mt-4 pt-4 ml-1 mb-2">
                                    <b-row class="justify-content-left">
                                        <b-col sm="12">
                                            <div class="input-with-icon">
                                                <b-form-input placeholder="Search program" />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <defs>
                                                        <clipPath id="a">
                                                            <rect
                                                                width="16"
                                                                height="16"
                                                                fill="none"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                    <g clip-path="url(#a)">
                                                        <path
                                                            d="M12.7,11.23a6.777,6.777,0,0,0,1.4-4.174A7.02,7.02,0,0,0,7.1,0,7.105,7.105,0,0,0,0,7.056a7.105,7.105,0,0,0,7.1,7.056,6.667,6.667,0,0,0,4.2-1.391l3,2.981a.971.971,0,0,0,1.4,0,.957.957,0,0,0,0-1.391Zm-5.6.8A5.022,5.022,0,0,1,2,7.056a5.1,5.1,0,0,1,10.2,0A5.022,5.022,0,0,1,7.1,12.025Z"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>

            </b-form>

            <b-modal
                id="warning-modal"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-header
            >
                <div class="d-block text-center">
                    We recommend that you configure the UTM tags. However you
                    may continue to save
                </div>

                <template v-slot:modal-footer="{ hide }">
                    <div class="d-flex justify-content-center w-100">
                        <b-btn
                            @click="hide()"
                            variant="outline-brand"
                            size="lg"
                            class="mr-2"
                            >Cancel</b-btn
                        >
                        <b-btn
                            size="lg"
                            variant="brand"
                            @click="continueAfterWarning()"
                            >Continue</b-btn
                        >
                    </div>
                </template>
            </b-modal>

            <b-modal
                id="warning-modal-for-validation"
                header-border-variant="light"
                footer-border-variant="light"
                centered
                hide-header
            >
                <div class="d-block text-center">
                    Route name cannot be empty
                </div>

                <template v-slot:modal-footer="{ hide }">
                    <div class="d-flex justify-content-center w-100">
                        <b-btn
                            @click="hide()"
                            variant="outline-brand"
                            size="lg"
                            class="mr-2"
                            >Close</b-btn
                        >
                    </div>
                </template>
            </b-modal>
        </div>
    </main>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { Validator } from 'vee-validate';
import Search from '../../components/search';

export default {
    name: 'add-traffic-route',
    components: {
        QrcodeVue,
        Search
    },
    data() {
        return {
            formData: {
                title: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                referral1: '',
                referral2: '',
                referral3: '',
                referral4: '',
                loyalty1: '',
                loyalty2: '',
                loyalty3: '',
                loyalty4: '',
            },
            selectedCountry: 'Netherlands',
            storeCountries: [
                {
                    value: 'Netherlands',
                    text: 'Netherlands'
                }
            ],
            searchTerm: '',
            dateOfBirth: '',
            formatted: '',
            selected: '',

            itemsForDestination: [
                {
                    url: '',
                    percentage: this.$store.getters.getTotalDestinationPercent
                }
            ],
            link: '',
            isRedirectLimit: false,
            isRedirectExpiresOn: false,
            showLabel: true,
            isShowUTMTags: false,
            isShowFallbackDestinations: false,
            newAddPersonaId: ''
        };
    },
    methods: {
        onContext(ctx) {
            // The date formatted in the locale, or the `label-no-date-selected` string
            this.formatted = ctx.selectedFormatted
            // The following will be an empty string until a valid date is entered
            this.selected = ctx.selectedYMD
        },
        onError() {
            alert('Failed to copy text');
        },
        continueAfterWarning() {
            this.onSubmit();
            return this.$bvModal.show('warning-modal');
        },
        switchLabelElement() {
            this.showLabel = true;
        },
        async createAddPersona() {
            this.$router.push({ name: 'PersonasList' });
            // Comment for Api.

            // if (!this.formData.firstName) {
            //     this.$bvModal.show('warning-modal-for-validation');
            // } else if (!this.formData.lastName) {

            // } else if (!this.formData.dateOfBirth){

            // } else if (!this.formData.email){

            // } else {
            //     await this.$store
            //         .dispatch(
            //             'createAddPersona',
            //             Object.assign(
            //                 this.formData
            //             )
            //         )
            //         .then(data => {
            //             if (data.result && data.result._id) {
            //                 this.newAddPersonaId = data.result._id;
            //             }
            //         });
            // }
        },
        async updateAddPersona() {
            const isPublished = this.currentaddPersona.status === 'published';
            if (isPublished) {
                await this.$store.dispatch(
                    'unpublishaddPersona',
                    this.currentaddPersona._id
                );
            }

            const data = await this.$store.dispatch('updateAddPersona', {
                id: this.addPersonaId,
                data: Object.assign(
                    this.formData
                )
            });
            if (isPublished) {
                await this.$store
                    .dispatch(
                        'publishaddPersona',
                        this.currentaddPersona._id
                    )
                    .then(() =>
                        this.$router
                            .push({
                                name: 'addPersonas'
                            })
                            .catch(() => {})
                    );
            }

            this.$router
                .push({
                    name: 'addPersonas'
                })
                .catch(() => {});
        },
        async onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return;
                } else {
                    if (!this.addPersonaId) {
                        await this.createAddPersona();
                        this.$validator.reset();
                    } else {
                        await this.updateAddPersona();
                        this.$validator.reset();
                    }
                }
            });
        },
        goBack() {
            this.$router.push({ name: 'Personas' });
        },
        SelectText(element) {
            // var doc = document;
            // if (doc.body.createTextRange) {
            //     let range = document.body.createTextRange();
            //     range.moveToElementText(element);
            //     range.select();
            // } else if (window.getSelection) {
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
            // }
        },
        async loadaddPersonaData() {
            const addPersona = JSON.parse(
                JSON.stringify(this.currentaddPersona)
            );

            this.formData.firstName =
                addPersona && addPersona.firstName ? addPersona.firstName : '';
            this.formData.lastName =
                addPersona && addPersona.lastName 
                    ? addPersona.lastName
                    : '';
            this.formData.dateOfBirth =
                addPersona && addPersona.dateOfBirth
                    ? addPersona.dateOfBirth
                    : '';
            this.formData.email =
                addPersona && addPersona.email
                    ? addPersona.email
                    : '';
            this.formData.country =
                addPersona && addPersona.utmMedium
                    ? addPersona.utmMedium
                    : '';
            if (
                this.formData.redirectLimit &&
                this.formData.redirectLimitReachedUrl
            ) {
                this.isRedirectLimit = true;
            }

            if (
                this.formData.redirectExpiresOn &&
                this.formData.redirectExpiredUrl
            ) {
                this.isRedirectExpiresOn = true;
            }
        },
        isAlphaNumeric(e) {
            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[A-Za-z0-9]+$/.test(char)) return true;
            // Match with regex
            else e.preventDefault(); // If not match, don't add to input text
        }
    },
    computed: {
        addPersonaId() {
            return this.$route.params.id;
        },
        currentaddPersona() {
            return this.$store.getters['getaddPersonaById'];
        },
    },
    mounted() {
        const dict = {
            en: {
                messages: {
                    url: () => `This is not a valid URL`
                }
            }
        };
        Validator.localize(dict);
    }
};
</script>

<style lang="scss" scoped>
.cursor {
    cursor: pointer;
}

.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
}

.first-cell-overflow {
    padding-left: 27px;
}

.edit-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
}

.qrcode-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #2f3380;
    width: 200px;
    height: 180px;
}

.copy_clipboard_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background-color: #2f3380;
    margin-right: 10px;
}

.edit-fallback-destinations {
    color: #2f3380;
    text-decoration: underline;
    font-size: 18px;
    line-height: 23px;
}

.validation_mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;

    span {
        color: #a3a0fb;
        font-size: 12px;
        line-height: 20px;
    }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 350px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}

::v-deep .container {
    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }

    .col-form-label {
        color: #2f3380;
    }

    .custom-checkbox {
        margin-top: 35px;
    }
    .block-1 {
        width: 88%;
    }
    .checkbox-group {
        font-size: 12px;
        margin-top: -10px;
    }
}

.b-dropdown {
    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }
}
.calendar-class {
    width: 29%;
}
</style>
