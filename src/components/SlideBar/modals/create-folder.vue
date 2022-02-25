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
                    this.$store
                        .dispatch(
                            this.dispatchAction,

                            {
                                customer: this.customerId,
                                name: this.name
                            }
                        )
                        .then(resp => {
                            this.$notify({
                                title: 'Success',
                                text: `${resp.name} added successfully!`,
                                type: 'success'
                            });
                            this.resetModal();

                            this.$bvModal.hide('create-folder');
                        })
                        .catch(err => {
                            this.$notify({
                                title: err.response.data.name,
                                text: err.response.data.reason,
                                type: 'error'
                            });
                        });
                }
            });
        }
    }
};
</script>
