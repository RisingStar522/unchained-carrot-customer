<template>
    <div v-if="selectedEmailTemplate">
        <b-modal
            id="delete-email-template-modal"
            ref="modal"
            title="Delete Email Template"
            centered
            header-class="custom-header"
            :hide-footer="true"
            @hidden="resetModal"
        >
            <form ref="form" @submit.prevent="handleSubmit">
                <b-form-group
                    label-for="name-input"
                    invalid-feedback="Email template is required"
                >
                    <div class="text-center mb-4">
                        Enter {{ selectedEmailTemplate.name }} for delete
                        confirmation
                    </div>
                    <div class="route-name-field">
                        <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formData.name"
                            :state="validation"
                            required
                            autofocus
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation">
                            Please enter the correct name.
                        </b-form-invalid-feedback>
                    </div>
                </b-form-group>
                <div class="d-flex justify-content-center py-4">
                    <b-button
                        type="submit"
                        class="custom-button"
                        variant="brand"
                        >Delete Template</b-button
                    >
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'delete-email-template-component',
    props: {
        emailTemplate: {
            required: true
        }
    },
    data() {
        return {
            formData: {
                name: ''
            },
            selectedEmailTemplate: null
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            return valid;
        },
        resetModal() {
            this.formData.name = '';
            this.$validator.reset();
        },
        handleSubmit(event) {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }

            if (this.validation) {
                this.$store
                    .dispatch(
                        'deleteEmailTemplate',
                        this.selectedEmailTemplate._id
                    )
                    .then(resp => {
                        // Hide the modal manually
                        this.$nextTick(() => {
                            this.$emit('confirm', this.formData);
                            this.$bvModal.hide('delete-email-template-modal');
                            this.formData.name = '';
                            this.$validator.reset();
                        });
                    })
                    .catch(err => {});
            }
        }
    },
    computed: {
        validation() {
            return this.formData.name === this.selectedEmailTemplate.name;
        }
    },
    watch: {
        emailTemplate(newValue) {
            this.selectedEmailTemplate = newValue;
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep .custom-header {
    position: relative;
    justify-content: center;
    color: #2f3380;
    border: none;
    padding-top: 35px;
}

::v-deep .custom-header .close {
    position: absolute;
    top: 16px;
    right: 16px;
    margin-left: 0;
}

.custom-button {
    padding: 10px 30px;
}

.route-name-field {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-control {
        width: 335px;
        border-color: #2f3380;
    }
}

.invalid-feedback {
    padding: 0px 65px;
}
</style>
