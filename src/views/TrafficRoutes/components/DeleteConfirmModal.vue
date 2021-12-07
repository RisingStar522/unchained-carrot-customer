<template>
    <div v-if="selectedTrafficRoute">
        <b-modal
            id="delete-confirm-modal"
            ref="modal"
            title="Delete Traffic Route"
            centered
            header-class="custom-header"
            :hide-footer="true"
            @hidden="resetModal"
        >
            <form ref="form" @submit.prevent="handleSubmit">
                <b-form-group
                    label-for="title-input"
                    invalid-feedback="Traffic Route is required"
                >
                    <div class="text-center mb-4">
                        Enter {{ selectedTrafficRoute.title }} for delete
                        confirmation
                    </div>
                    <div class="route-name-field">
                        <b-form-input
                            id="title-input"
                            type="text"
                            v-model="formData.routeName"
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
                        >Delete Route</b-button
                    >
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { submitTrackingEvent } from '../../../services/TrackingService';

export default {
    name: 'deleteConfirm-modal-component',
    props: {
        trafficRoute: {
            required: true
        }
    },
    data() {
        return {
            formData: {
                routeName: ''
            },
            selectedTrafficRoute: null
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            return valid;
        },
        resetModal() {
            this.formData.routeName = '';
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
                        'deleteTrafficRoute',
                        this.selectedTrafficRoute._id
                    )
                    .then(resp => {
                        // Send Tracking Event With UCC SDK
                        submitTrackingEvent(
                            'TRAFFIC-ROUTE-DELETED',
                            { trafficRouteId: this.selectedTrafficRoute._id },
                            this.$store.getters['customerData']
                        );
                        // Hide the modal manually
                        this.$nextTick(() => {
                            this.$emit('confirm', this.formData);
                            this.$bvModal.hide('delete-confirm-modal');
                            this.formData.routeName = '';
                            this.$validator.reset();
                        });
                    })
                    .catch(err => {});
            }
        }
    },
    computed: {
        validation() {
            return this.formData.routeName === this.selectedTrafficRoute.title;
        }
    },
    watch: {
        trafficRoute(newValue) {
            this.selectedTrafficRoute = newValue;
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
