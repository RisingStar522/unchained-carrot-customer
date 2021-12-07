<template>
    <div>
        <b-modal
            header-border-variant="light"
            footer-border-variant="light"
            centered
            id="output"
            size="xl"
            title="HTML"
        >
            <slot></slot>
            <template v-slot:modal-footer="{ hide }">
                <div class="d-flex w-100">
                    <router-link :to="{ name: 'EmailBuilder/templates' }">
                        <b-btn>Back to templates</b-btn></router-link
                    >
                    <span class="ml-auto">
                        <b-btn
                            @click="hide()"
                            class="px-5 py-2"
                            variant="outline-brand mr-2"
                            >Cancel</b-btn
                        >
                    </span>
                    <b-btn
                        @click="copy"
                        ref="copyBtn"
                        variant="brand"
                        class="px-5 py-2"
                        >Copy HTML</b-btn
                    >
                </div>
            </template></b-modal
        >
    </div>
</template>

<script>
export default {
    name: 'emailBuilder-modal-component',
    methods: {
        copy() {
            this.$parent.copyCode();
        }
    }
};
</script>
