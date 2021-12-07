<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Add sender details</h5>
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
                    <b-col sm="6" class="no-left-padding">
                        <label for="sender-name">
                            Add the sender’s name:
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-input
                            id="sender-name"
                            type="text"
                            placeholder="E.g. John Smith"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="6" class="no-left-padding">
                        <label for="sender-email">
                            Add sender’s email address:
                        </label>
                    </b-col>
                    <b-col sm="6" class="no-right-padding">
                        <b-form-input
                            id="sender-email"
                            type="text"
                            placeholder="E.g. youremail@example.com"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="no-right-padding text-right">
                        <b-button
                            variant="primary"
                            class="min-width-button"
                            @click="nextTab"
                        >
                            Next
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
            editVisible: false
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
        nextTab() {
            this.editVisible = false;
            this.$emit('next-tab');
        }
    }
};
</script>
