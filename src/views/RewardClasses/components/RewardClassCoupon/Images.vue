<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Coupon</h3>
        </div>
        <b-card>
            <b-table
                :fields="fields"
                :items="items"
                caption-top
                responsive
                outlined
                head-variant="light"
            >
                <template v-slot:cell(actions)="">
                    <fa-icon icon="chart-bar" />
                    <fa-icon icon="pencil-alt" class="ml-3" />
                    <fa-icon icon="trash-alt" class="ml-3" />
                </template>
            </b-table>
        </b-card>
        <div class="d-flex justify-content-end">
            <b-button variant="brand" class="mb-2"> Upload</b-button>
        </div>
        <b-card>
            <div class="d-flex justify-content-around">
                <div class="d-flex flex-column" style="width: 45%">
                    <div class="d-flex justify-content-between w-100">
                        <p class="text-brand " style="width:35%">Image Type</p>
                        <div  style="width:65%">
                            <b-dropdown
                                :text="type"
                                block
                                menu-class="w-100"
                                variant="outline-brand"
                            >
                                <b-dropdown-item
                                    v-for="item in imageTypeList"
                                    :key="item.name"
                                    :value="item.name"
                                    @click="type = item.name"
                                    >{{ item.name }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between w-100 mt-2">
                        <p class="text-brand" style="width:35%">Language</p>

                        <div style="width:65%">
                            <b-dropdown
                                :text="contentLanguage"
                                block
                                menu-class="w-100"
                                variant="outline-brand"
                            >
                                <b-dropdown-item
                                    v-for="item in contentLanguageList"
                                    :key="item.name"
                                    :value="item.name"
                                    @click="contentLanguage = item.value"
                                    >{{ item.name }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                    </div>
                    <b-card class="text-center mt-3">
                        <div class="text-secondary">
                            <div class="d-flex justify-content-center">
                                <label for="file-input">
                                    <fa-icon
                                        icon="cloud-upload-alt"
                                        class="mt-3 red"
                                        size="lg"
                                    />
                                    <input
                                        id="file-input"
                                        ref="input"
                                        type="file"
                                        accept="image/*"
                                        class="d-none"
                                        @change="uploadImageFile()"
                                    />
                                </label>
                            </div>
                        </div>
                    </b-card>
                </div>

                <div class="d-flex flex-column" style="width: 55%">
                    <p class="text-brand ml-5">Merge Tags</p>
                    <b-form-group class="ml-5" v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                            v-model="selected"
                            :options="options"
                            :aria-describedby="ariaDescribedby"
                            name="flavour-2a"
                            stacked
                            class="text-brand"
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
        </b-card>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 70px"
        >
            <div class="d-flex justify-content-end w-100 mt-auto p-2">
                <div
                    class="d-flex justify-content-between"
                    style="width: 24.5%"
                >
                    <b-btn
                        variant="outline-brand"
                           style="width:100px"
                        @click="$router.push({ name: 'AddRewardClass' })"
                    >
                        Cancel
                    </b-btn>
                    <b-btn
                        variant="brand"
                          style="width:100px"
                        @click="
                            addClassRequestBody();
                            $router.push({
                                name: 'Rewards-Coupon-Distribution',
                            });
                        "
                    >
                        Next
                    </b-btn>
                </div>
            </div>
        </div>
        <!-- <Modal
            modalId="deleteClassSet"
            title="Are you sure to delete Reward set"
            :modalSubTitle="modalSubTitle"
        /> -->
        <b-modal ref="imageModal" hide-footer>
            <template #modal-title> Configure your image below </template>
            <div class="d-block text-center">
                <img :src="imgSrc" height="200" alt="Image preview..." />
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <b-button
                        style="width: 70px"
                        class="mt-4"
                        variant="outline-brand"
                        size="sm"
                        @click="hideModal()"
                        >Back</b-button
                    >
                </div>
                <div class="d-flex">
                    <b-button
                        variant="outline-brand"
                        size="sm"
                        class="mt-3"
                        style="width: 160px"
                        @click="showFileChooser()"
                        >Use another image</b-button
                    >

                    <b-button
                        class="mt-3 ml-2"
                        size="sm"
                        variant="brand"
                        style="font-size: 11px"
                        @click="hideModal()"
                    >
                        Set Image</b-button
                    >
                </div>
            </div>
        </b-modal>
    </b-container>
</template>

<script>
//import Modal from './modal';
export default {
    name: 'reward-point-images',
    components: {
        //   Modal,
    },
    data: () => ({
        selected: [],
        imgSrc: null,
        options: [
            { text: 'FNAME', value: 'FNAME' },
            { text: 'LNAME', value: 'LNAME' },
            { text: 'AMOUNT', value: 'Percentage' },
        ],
        imageTypeList: [{ name: 'thumbnail' }, { name: 'png' }],
        type: 'thumbnail',
        contentLanguageList: [
            { name: 'Dutch', value: 'dutch' },
            { name: 'English', value: 'EN' },
        ],
        contentLanguage: 'EN',
        fields: [
            {
                key: 'name',
                label: 'FILENAME',
            },
            {
                key: 'type',
                label: 'TYPE',
            },
            {
                key: 'language',
                label: 'LANGUAGE',
            },
            {
                key: 'mergeTags',
                label: 'MERGE TAGS',
            },
            { key: 'actions', label: '' },
        ],
        items: [
            {
                name: 'WooCoupon.png',
                type: 'thumbnail',
                language: 'EN',
                mergeTags: '[50,50]',
            },
            {
                name: 'WOI_GH.png',
                type: 'offer',
                language: 'IT',
                mergeTags: 'FNAME,LNAME,PERCENTAGE',
            },
        ],
    }),

    methods: {
        hideModal() {
            this.$refs['imageModal'].hide();
        },
        showFileChooser() {
            this.$refs.input.click();
        },
        uploadImageFile() {
            let that = this;
            this.$refs['imageModal'].show();
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();

            reader.addEventListener(
                'load',
                function () {
                    that.imgSrc = reader.result;
                    // convert image file to base64 string
                },
                false
            );

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        async addClassRequestBody() {
            await this.$store.commit('ADD_CLASS_REQUEST_BODY', {
                images: [
                    {
                        type: this.type,
                        url: this.imgSrc,
                        contentLanguage: this.contentLanguage,
                        megeTags: this.selected.join(','),
                    },
                ],
            });
          
        },
    },
};
</script>
