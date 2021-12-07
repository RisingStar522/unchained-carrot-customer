<template>
    <div>
        <b-modal
            id="add-employee-modal"
            ref="modal"
            title="Add Employee"
            centered
            size="lg"
            header-class="custom-header"
            :hide-footer="true"
        >
            <form class="destination-form" ref="form" @submit.prevent="">
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
                                    class="w-100"
                                    required
                                ></b-form-input>
                            </div>
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
