<template>
    <b-modal
        id="create-folder"
        ref="modal"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleCreate"
        ok-title="Create"
        ok-variant="brand"
        button-size="lg"
        footer-class="justify-content-around"
        :hide-header="true"
        centered
    >
        <b-form
            class="pl-3 pr-3 pt-2"
            @submit.prevent="handleSubmit"
            data-vv-scope="createFolder"
        >
            <md-field
                v-bind:class="{ 'md-invalid': errors.has('createFolder.name') }"
            >
                <label>Enter folder name</label>
                <md-input
                    type="text"
                    name="name"
                    v-model="name"
                    v-validate="'required'"
                    ref="folderNameInput"
                />
                <span class="md-error">{{
                    errors.first('createFolder.name')
                }}</span>
            </md-field>
        </b-form>
    </b-modal>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'create-folder-modal',
    data() {
        return {
            name: ''
        };
    },
    props: ['dispatchAction'],
    computed: {
        ...mapGetters(['customerId'])
    },
    methods: {
        showModal() {
            this.$bvModal.show('create-folder');
        },
        resetModal() {
            this.name = '';
        },
        handleCreate(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        handleSubmit() {
            this.$validator.validateAll('createFolder').then(result => {
                if (result) {
                    this.$store.dispatch(
                        this.dispatchAction,
                        Object.assign(
                            {},
                            {
                                customer: this.customerId,
                                name: this.name
                            }
                        )
                    );
                    this.resetModal();
                    this.$nextTick(() => {
                        this.$refs.modal.hide();
                    });
                }
            });
        }
    }
};
</script>
