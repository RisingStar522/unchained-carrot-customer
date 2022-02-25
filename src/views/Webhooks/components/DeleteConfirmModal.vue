<template>
    <div v-if="selectedWebhook">
        <b-modal
            id="delete-webhook-modal"
            ref="modal"
            centered
            header-class="custom-header"
            :hide-footer="true"
        >
            <form ref="form" @submit.prevent="handleSubmit">
                <b-form-group label-for="title-input">
                    <div class="title text-center mb-5">
                        Delete
                        {{
                            webhookType === 'incoming' ? 'Incoming' : 'Outgoing'
                        }}
                        Webhooks
                    </div>
                    <b-row class="my-4">
                        <b-col sm="5">
                            <label for="sourcesystem">Source System</label>
                        </b-col>
                        <b-col sm="7">
                            <b-form-input
                                id="title-input"
                                type="text"
                                v-model="formData.sourceSystem"
                                :state="validationSourceSystem"
                                required
                            ></b-form-input>
                            <b-form-invalid-feedback
                                :state="validationSourceSystem"
                            >
                                Please enter the correct source system.
                            </b-form-invalid-feedback>
                        </b-col>
                    </b-row>

                    <b-row class="my-4">
                        <b-col sm="5">
                            <label for="topic">Topic</label>
                        </b-col>
                        <b-col sm="7">
                            <b-form-input
                                id="title-input"
                                type="text"
                                v-model="formData.topic"
                                :state="validationTopic"
                                required
                            ></b-form-input>
                            <b-form-invalid-feedback :state="validationTopic">
                                Please enter the correct topic.
                            </b-form-invalid-feedback>
                        </b-col>
                    </b-row>
                </b-form-group>
                <div class="d-flex justify-content-center py-4">
                    <b-button
                        type="submit"
                        class="custom-button"
                        variant="brand"
                        >Delete</b-button
                    >
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'deleteConfirm-modal-component',
    props: {
        webhook: {
            required: true
        },
        webhookType: {
            required: true
        }
    },
    data() {
        return {
            formData: {
                sourceSystem: '',
                topic: ''
            },
            selectedWebhook: null
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            return valid;
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }

            if (this.validationSourceSystem && this.validationTopic) {
                if (this.webhookType === 'incoming') {
                    this.$store
                        .dispatch(
                            'deleteIncomingWebhook',
                            this.selectedWebhook.eventTrackerId
                        )
                        .then(resp => {
                            // Hide the modal manually
                            this.$nextTick(() => {
                                this.$emit('confirm', this.formData);
                                this.$bvModal.hide('delete-webhook-modal');
                                this.$validator.reset();
                            });
                        })
                        .catch(err => {});
                } else {
                    this.$store
                        .dispatch(
                            'deleteOutgoingWebhook',
                            this.selectedWebhook.subscriptionKey
                        )
                        .then(resp => {
                            // Hide the modal manually
                            this.$nextTick(() => {
                                this.$emit('confirm', this.formData);
                                this.$bvModal.hide('delete-webhook-modal');
                                this.$validator.reset();
                            });
                        })
                        .catch(err => {});
                }
            }
        }
    },
    computed: {
        validationSourceSystem() {
            return (
                this.formData.sourceSystem ===
                this.selectedWebhook.externalSystem
            );
        },
        validationTopic() {
            return this.formData.topic === this.selectedWebhook.topic;
        }
    },
    watch: {
        webhook(newValue) {
            this.selectedWebhook = newValue;
            this.formData.sourceSystem = this.selectedWebhook.externalSystem;
            this.formData.topic = this.selectedWebhook.topic;
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

    .close {
        position: absolute;
        top: 16px;
        right: 16px;
        margin-left: 0;
    }
}

::v-deep #delete-webhook-modal {
    .modal-body {
        padding: 0 40px;

        .title {
            color: #2f3380;
        }
    }
}

.custom-button {
    padding: 10px 30px;
}
</style>
