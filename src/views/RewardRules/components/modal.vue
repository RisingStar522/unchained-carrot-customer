<template>
    <div>
        <b-modal
            header-border-variant="light"
            footer-border-variant="light"
            centered
            :id="modalId"
            size="sm"
            :title="title"
        >
            <slot></slot>
            <template v-slot:modal-footer="{ hide }">
                <div class="d-flex  justify-content-between w-100">
                    <b-btn @click="hide()" variant="outline-brand" size="lg"
                        >Cancel</b-btn
                    >
                    <b-btn size="lg" variant="brand">Save</b-btn>
                </div>
            </template></b-modal
        >
    </div>
</template>

<script>
export default {
    name: 'reward-rules-modal-component',
    data: () => ({}),
    props: {
        modalId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        }
    }
};
</script>
