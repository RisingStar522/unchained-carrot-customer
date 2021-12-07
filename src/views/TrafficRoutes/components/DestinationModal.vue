<template>
    <div>
        <b-modal
            id="destination-modal"
            ref="modal"
            title="Destination"
            centered
            size="lg"
            header-class="custom-header"
            :hide-footer="true"
        >
            <form
                class="destination-form"
                ref="form"
                @submit.prevent="handleSubmit"
            >
                <b-row class="mb-2">
                    <b-col sm="12">
                        <div class="d-flex flex-wrap align-items-center">
                            <div class="mr-3">
                                <label for="url">URL </label>
                            </div>
                            <div class="d-flex flex-grow-1 align-items-center">
                                <b-form-input
                                    name="url"
                                    id="url"
                                    type="text"
                                    v-model="formData.url"
                                    class="w-100"
                                    required
                                    :class="[
                                        errors.has('url')
                                            ? 'border-danger'
                                            : null
                                    ]"
                                    v-validate="'url'"
                                    v-validate.disable="'url'"
                                    data-vv-validate-on="change"
                                ></b-form-input>
                            </div>
                        </div>
                    </b-col>

                    <b-col>
                        <div
                            class="text-danger text-sm"
                            v-if="errors.has('url')"
                        >
                            {{ errors.first('url') }}
                        </div>
                    </b-col>
                </b-row>

                <p>Note UTM tags will be added automatically later</p>

                <b-row class="my-4 align-items-center">
                    <b-col sm="9">
                        <div>
                            <label
                                v-b-tooltip.hover.bottom
                                title="The percentage of traffic that will be directed to the URL"
                                for="percent"
                            >
                                <span class="mr-1">Traffic percentage</span>
                                <fa-icon icon="info-circle" />
                            </label>
                        </div>
                    </b-col>
                    <b-col sm="3">
                        <b-form-input
                            id="input-traffic-percent"
                            type="number"
                            v-model="formData.percentage"
                            min="0"
                            max="100"
                            required
                        ></b-form-input>
                    </b-col>
                </b-row>

                <div class="d-flex justify-content-center py-4">
                    <b-button
                        type="submit"
                        class="custom-button"
                        variant="brand"
                    >
                        {{ !selectedDestination ? 'Create' : 'Update' }}
                        destination</b-button
                    >
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { Validator } from 'vee-validate';

export default {
    name: 'destination-modal-component',
    props: {
        item: {}
    },
    data() {
        return {
            formData: {
                url: '',
                percentage: this.$store.getters.getTotalDestinationPercent
            },
            selectedDestination: null
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            return valid;
        },
        handleSubmit(event) {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }

            const isUrlProtocol =
                this.formData.url.includes('https://') ||
                this.formData.url.includes('http://');

            this.formData.url = !isUrlProtocol
                ? 'https://' + this.formData.url
                : this.formData.url;

            this.$nextTick(() => {
                this.$emit('clicked', this.formData);
                if (this.item === null) {
                    this.$store.commit(
                        'SET_REMAINING_DESTINATION_PERCENT',
                        this.formData.percentage
                    );
                }
                this.$bvModal.hide('destination-modal');
                this.formData.url = '';
                this.$validator.reset();
            });
        }
    },
    watch: {
        item(newValue) {
            this.selectedDestination = newValue;
            if (this.item !== null) {
                this.formData.url = newValue.url;
                this.formData.percentage = newValue.percentage;
            } else {
                this.formData.url = '';
                this.formData.percentage = this.$store.getters.getTotalDestinationPercent;
            }
        },
        '$store.getters.getTotalDestinationPercent'(newVal) {
            this.formData.percentage = newVal;
        }
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
        this.formData.percentage = this.$store.getters.getTotalDestinationPercent;
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
    justify-content: center;

    .form-control {
        width: 335px;
        border-color: #2f3380;
    }
}

label {
    color: #2f3380;
    margin-bottom: 0;
}

p {
    font-size: 15px;
    color: #9f9f9f;
}
</style>
