<template>
    <b-modal
        id="configure-queue-url"
        ref="modal"
        centered
        header-class="custom-header"
        :hide-footer="true"
        @hide="closeModal"
    >
        <form ref="form">
            <b-form-group label-for="title-input">
                <div class="title text-center mb-5">
                    Configure this unique URL in WooCommerce
                </div>
                <div class="unique-url-field mb-5">
                    <b-form-input
                        id="queue-url"
                        type="text"
                        v-model="queueUrl"
                        required
                    ></b-form-input>
                </div>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
export default {
    name: 'configure-queue-url',
    data() {
        return {
            queueUrl: 'https://webhooks.unchainedcarrot.com?key=123abc'
        };
    },
    methods: {
        closeModal(evt) {
            this.$nextTick(() => {
                this.$emit('confirm', 'confirm url');
                this.$bvModal.hide('configure-queue-url');
            });
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

::v-deep #configure-queue-url {
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
