<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Validate Sender</h5>
            <a @click="editVisible = !editVisible">{{
                editVisible ? 'Close' : 'Edit'
            }}</a>
        </div>
        <transition name="fadeHeight">
            <b-container
                fluid
                class="form_numeric_tab-form hidden-edit"
                v-if="editVisible"
            >
                <b-row>
                    <b-col lg="4" class="no-left-padding">
                        <p><b>Sender email address:</b></p>
                    </b-col>
                    <b-col lg="4" class="no-right-padding">
                        <p>walter@flashboys.nl</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12" class="no-left-padding">
                        <p v-if="valid === false" class="red-text">
                            <b>This sender wasn’t verified.</b><br />
                            You cannot send emails from this email address.
                        </p>
                        <p v-else class="green-text">
                            <b>This sender was successfully verified.</b><br />
                            You can now start sending emails from this email
                            address.
                        </p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="no-right-padding text-right">
                        <b-button
                            variant="primary"
                            class="min-width-button with-spinner"
                            :disabled="loading"
                            @click="validate"
                        >
                            <span class="button-spinner" v-if="loading">
                                <b-spinner small></b-spinner>
                            </span>
                            Check status
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </transition>
    </b-card>
</template>

<style lang="scss" scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 300px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editVisible: false,
            valid: false,
            loading: false
        };
    },
    watch: {
        open: {
            immediate: true,
            handler(newOpen) {
                if (newOpen === true) {
                    this.editVisible = true;
                    this.$emit('update:open', false);
                }
            }
        }
    },
    methods: {
        /**
         * A function for validating sender
         * Currently API call is mocked with setTimeout
         * After successfull validation send 'success' event
         */
        validate() {
            this.loading = true;
            setTimeout(() => {
                this.valid = true;
                this.loading = false;
                this.$emit('success');
            }, 2000);
        }
    }
};
</script>
