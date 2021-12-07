<template>
    <div class="content fullheight-container mt-5">
        <!-- <h3 class="page-header">
            Account - Social Media
        </h3> -->

        <b-form
            @submit.prevent=""
            class="fullheight-container__body with-buttons"
        >
            <b-row>
                <div class="w-100 pl-3 pr-3">
                    <b-row>
                        <b-col sm="6">
                            <b-row class="my-4">
                                <b-col sm="3" class="d-flex align-items-center">
                                    <label for="facebook">
                                        <fa-icon
                                            :icon="['fab', 'facebook-f']"
                                        />
                                        <span class="ml-3"
                                            >Facebook</span
                                        ></label
                                    >
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="facebook"
                                        type="text"
                                        placeholder="Facebook"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3" class="d-flex align-items-center">
                                    <label for="instagram"
                                        ><fa-icon
                                            :icon="['fab', 'instagram']"
                                        />
                                        <span class="ml-3"
                                            >Instagram</span
                                        ></label
                                    >
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="instagram"
                                        type="text"
                                        placeholder="Instagram"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3" class="d-flex align-items-center">
                                    <label for="youtube">
                                        <fa-icon :icon="['fab', 'youtube']" />
                                        <span class="ml-3">Youtube</span>
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="youtube"
                                        type="text"
                                        placeholder="Youtube"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3" class="d-flex align-items-center">
                                    <label for="linkedin">
                                        <fa-icon
                                            :icon="['fab', 'linkedin-in']"
                                        />
                                        <span class="ml-3">Linkedin</span>
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="linkedin"
                                        type="text"
                                        placeholder="Linkedin"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3" class="d-flex align-items-center">
                                    <label for="twitter">
                                        <fa-icon :icon="['fab', 'twitter']" />
                                        <span class="ml-3">Twitter</span>
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="twitter"
                                        type="text"
                                        placeholder="Twitter"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3" class="d-flex align-items-center">
                                    <label for="telegram">
                                        <fa-icon
                                            :icon="['fab', 'telegram-plane']"
                                        />
                                        <span class="ml-3">Telegram</span>
                                    </label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="telegram"
                                        type="text"
                                        placeholder="Telegram"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="logo">Logo</label>
                                </b-col>
                                <b-col sm="9">
                                    <upload-image></upload-image>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
            </b-row>
            <!-- </b-container> -->

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
import UploadImage from '@/components/UploadImage';

export default {
    name: 'social-media',
    components: { UploadImage }
};
</script>
