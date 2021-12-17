<template>
    <b-modal
        :id="id"
        :title="title"
        centered
        header-class="custom-header"
        :hide-footer="true"
        @hidden="resetModal"
    >
        <form @submit.prevent="handleSubmit">
            <b-form-group label-for="name-input">
                <div class="text-center mb-4">
                    {{ subtitle }}
                </div>
                <div class="route-name-field">
                    <b-form-input
                        id="name-input"
                        type="text"
                        v-model="input"
                        required
                        autofocus
                    ></b-form-input>
                </div>
            </b-form-group>
            <b-form-group>
                <div
                    class="d-flex align-items-center justify-content-between mt-5"
                >
                    <b-btn
                        block
                        variant="outline-primary"
                        style="flex: 0.48"
                        @click="handleCancel"
                    >
                        Back
                    </b-btn>
                    <b-btn type="submit" variant="brand" style="flex: 0.48"
                        >Delete</b-btn
                    >
                </div>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
export default {
    name: 'delete-confirm-modal-component',
    data: () => ({
        input: ''
    }),
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        }
    },
    methods: {
        resetModal() {
            this.input = '';
        },
        handleSubmit() {
            this.$bvModal.hide(this.id);
            this.input = '';
            this.$emit('onSubmit');
        },
        handleCancel() {
            this.$bvModal.hide(this.id);
            this.input = '';
        }
    }
};
</script>

<style></style>
