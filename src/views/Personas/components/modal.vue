<style lang="scss" scope>
#configureTraits {
    .dialog-class .content-class{
        max-width: 400px !important;
        width: 400px !important;
        margin-top: 120px;
        margin-left: 100px;
        // background-color: #f0f0f7;
    }
    .body-class {
        padding-top: 0px !important;
        height: 340px;
    }
    .header-class {
        padding: 0.75rem 1.25rem;
        margin-bottom: 0px; 
        border-bottom: none !important;

        h5 {
            font-weight: bold;
            color: #2f3380;
            padding-top: 12px;
            padding-left: 10px;
        }
    }
}
#configureEditTraits {
    .dialog-class .content-class{
        max-width: 400px !important;
        width: 400px !important;
        margin-top: 120px;
        margin-left: 100px;
        // background-color: #f0f0f7;
    }
    .body-class {
        padding-top: 0px !important;
        height: 340px;
    }
    .header-class {
        padding: 0.75rem 1.25rem;
        margin-bottom: 0px; 
        border-bottom: none !important;

        h5 {
            font-weight: bold;
            color: #2f3380;
            padding-top: 12px;
            padding-left: 10px;
        }
    }
}
.btn-modal {
    width: 150px;
}
</style>
<template>
    <div>
        <b-modal
            header-border-variant="light"
            footer-border-variant="light"
            :id="modalId"
            :title="title"
            modal-class="modal-main"
            dialog-class="dialog-class"
            content-class="content-class"
            body-class="body-class"
            header-class="header-class"
        >
            <slot></slot>
            <template v-slot:modal-footer="{ hide }">
                <div class="d-flex  w-100 mb-0 py-3">
                    <b-btn @click="hide()" class="btn-modal mx-3" variant="outline-brand"
                        >Cancel</b-btn
                    >
                    <b-btn class="btn-modal ml-3" variant="brand">Save</b-btn>
                </div>
            </template></b-modal
        >
    </div>
</template>

<script>
export default {
    name: 'personas-add-modal-component',
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
