<template>
    <b-modal
        id="countr-topic"
        ref="modal"
        ok-variant="brand"
        button-size="lg"
        footer-class="justify-content-around"
        :hide-header="true"
        centered
    >
        <div>
            <b-form-group label="Topic" label-for="topic" label-cols-md="2">
                <b-form-select
                    v-model="selected"
                    :options="options"
                    id="topic"
                    v-validate="'required'"
                    name="topic"
                >
                    <template v-slot:first>
                        <b-form-select-option :value="null" disabled
                            >-- Select Topic --</b-form-select-option
                        >
                    </template></b-form-select
                >
                <span
                    class="text-danger"
                    v-for="error in errors.collect('topic')"
                    :key="error"
                    >{{ error }}</span
                >
            </b-form-group>
        </div>

        <template #modal-footer>
            <div class="d-flex">
                <b-button
                    @click="$bvModal.hide('countr-topic')"
                    class="mr-3"
                    variant="outline-brand"
                    >Cancel</b-button
                >
                <b-button variant="brand">Save</b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: 'countr-topic-modal',
    data: () => ({
        selected: null,
        options: ['transaction.created', 'transaction.updated']
    })
};
</script>
