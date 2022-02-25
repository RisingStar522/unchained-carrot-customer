<template>
    <main class="content">
        <div class="container mx-4">
            <h3 class="page-header">
                {{ !templateId ? 'Add' : 'Edit' }} Apple Pass template
            </h3>
            <div class="add-template-wrapper">
                <b-form data-vv-scope="passTemplateForm">
                    <b-row>
                        <b-col sm="6">
                            <b-row class="mb-4">
                                <b-col sm="4">
                                    <label for="org-name"
                                        >Organization Name</label
                                    >
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input
                                        id="input-name"
                                        type="text"
                                        name="orgName"
                                        v-model="formData.orgName"
                                        v-validate="'required'"
                                    ></b-form-input>
                                    <span class="md-error">{{ errors.first('passTemplateForm.orgName') }}</span>
                                </b-col>
                            </b-row>
                            <b-row class="my-4">
                                <b-col sm="4">
                                    <label for="style">Pass Style</label>
                                </b-col>
                                <b-col sm="8">
                                    <div>
                                        <span class="pass-style-icons mr-2">
                                            <!-- <span class="nav-icon" v-html="require('')"> </span> -->
                                            <fa-icon class="text-brand" icon="money-check-alt" />
                                        </span>
                                        <span class="pass-style-icons">
                                            <fa-icon class="text-secondary" icon="money-check" />
                                        </span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row class="my-4">
                                <b-col sm="4">
                                    <label for="temp-name">Template Name</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-input
                                        id="input-name"
                                        type="text"
                                        name="tempName"
                                        v-model="formData.tempName"
                                        v-validate="'required'"
                                    ></b-form-input>
                                    <span class="md-error">{{ errors.first('passTemplateForm.tempName') }}</span>
                                </b-col>
                            </b-row>
                            <b-row class="my-4">
                                <b-col sm="4">
                                    <label for="temp-name">Description</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-form-textarea
                                        id="description"
                                        v-model="formData.description"
                                        rows="5"
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>
                            <b-row class="my-4">
                                <b-col sm="4">
                                    <label for="language"
                                        >Default Language</label
                                    >
                                </b-col>
                                <b-col sm="8">
                                    <b-dropdown
                                        :text="selectedLanguage.text"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in languageOptions"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="
                                                selectedLanguage = option
                                            "
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                            </b-row>
                            <b-row class="my-4">
                                <b-col sm="4">
                                    <label for="temp-name">Time zone</label>
                                </b-col>
                                <b-col sm="8">
                                    <b-dropdown
                                        :text="selectedTimeZone.text"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in timeZoneOptions"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="
                                                selectedTimeZone = option
                                            "
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col sm="6">
                            <div class="templay-layout">
                                <div class="layout-change-options">
                                    <b-form-radio-group
                                        id="layoutTypes"
                                        v-model="selectedLayoutType"
                                        :options="layoutTypeOptions"
                                        name="radio-btn-outline"
                                        button-variant="outline-brand"
                                        buttons
                                    ></b-form-radio-group>
                                </div>
                                <CouponLayout />
                            </div>
                        </b-col>
                    </b-row>

                    <b-row class="button-group">
                        <b-col class="d-flex justify-content-end" sm="12">
                            <b-button
                                variant="outline-brand"
                                :to="{ name: 'AppleWallet' }"
                                >Back</b-button
                            >
                            <b-button
                                class="ml-4"
                                variant="brand"
                                @click="gotoTemplateSettings()"
                                >Next: images</b-button
                            >
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
    </main>
</template>

<script>
import CouponLayout from './Components/CouponLayout.vue';
export default {
    name: 'add-template',
    components: {
        CouponLayout
    },
    data() {
        return {
            formData: {
                orgName: '',
                tempName: '',
                description: ''
            },
            selectedLanguage: {
                value: 'EN',
                text: 'English'
            },
            selectedTimeZone: {
                value: 'UTC+2 Amsterdam',
                text: 'UTC+2 Amsterdam'
            },
            selectedLayoutType: 'front',
            selectedPassStyle: 'coupon',

            languageOptions: [
                {
                    value: 'EN',
                    text: 'English'
                },
                {
                    value: 'NL',
                    text: 'Nederlands'
                },
                {
                    value: 'IT',
                    text: 'Italiano'
                }
            ],
            timeZoneOptions: [
                {
                    value: 'UTC+2 Amsterdam',
                    text: 'UTC+2 Amsterdam'
                }
            ],
            layoutTypeOptions: [
                {
                    value: 'front',
                    text: 'FRONT'
                },
                {
                    value: 'back',
                    text: 'BACK'
                }
            ]
        };
    },
    computed: {
        templateId() {
            return this.$route.params.id;
        }
    },
    methods: {
        gotoTemplateSettings() {
            this.$validator.validateAll('passTemplateForm').then(result => {
                if(!result) {
                    return;
                } else {
                    // this.$store.dispatch('savePassTemplate', 
                    //     Object.assign(
                    //         {
                    //             name: this.formData.tempName,
                    //             passStyle: this.selectedPassStyle,
                    //             defaultLanguage: this.selectedLanguage,
                    //             standardKeys: {
                    //                 description: this.formData.description,
                    //                 organizationName: this.formData.orgName
                    //             }
                    //         }
                    //     )
                    // );
                    // this.$router.push({
                    //     name: 'TemplateImageSettings'
                    // });
                    this.$store.dispatch('createPassTemplate', 
                        Object.assign(
                            {
                                name: this.formData.tempName,
                                passStyle: this.selectedPassStyle,
                                defaultLanguage: this.selectedLanguage.value,
                                standardKeys: {
                                    description: this.formData.description,
                                    organizationName: this.formData.orgName
                                }
                            }
                        )
                    );
                }
            })

        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    max-width: 100%;
}
label {
    font: normal normal normal 15px/25px;
    letter-spacing: 0px;
    color: #2f3380;
}
::v-deep .add-template-wrapper {
    .button-group {
        margin-top: 50px;
        a {
            width: 185px;
        }
    }
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

    .templay-layout {
        height: 100%;
        background-color: #ffffff;

        .layout-change-options {
            text-align: right;
            padding: 15px
        }
    }
    .pass-style-icons {
        font-size: 25px;
    }
}
</style>
