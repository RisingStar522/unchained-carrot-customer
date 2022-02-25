<template>
    <b-modal
        centered
        title-class="text-left"
        id="delete-page-modal"
        hide-footer
        title="Delete"
        hide-backdrop
        body-class="pt-0"
    >
        <h5>Are you sure to delete?</h5>
        <div class="rowSpace">
            <b-btn
                block
                variant="outline-primary"
                style="flex: 0.48"
                @click="$bvModal.hide('delete-page-modal')"
            >
                Cancel
            </b-btn>
            <b-btn
                block
                variant="brand"
                style="flex: 0.48"
                @click="handleAccept"
                >OK</b-btn
            >
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'delete-confirm-modal-component',
    props: {
        isVisibiled: {
            type: Boolean
        }
    },
    methods: {
        handleAccept() {
            this.$emit('onClick');
        }
    }
};
</script>

<style lang="scss" scoped>
.rowSpace {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
</style>
