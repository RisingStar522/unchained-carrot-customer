<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Review the segment</h5>
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
                        <div class="review-bordered">
                            <p class="review-bordered-text">
                                Estimated audience size is
                            </p>
                            <p class="review-bordered-number">250</p>
                        </div>
                    </b-col>
                    <b-col lg="8">
                        <b-container fluid class="reviewdata-container">
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Segment name</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        Customers with redeemed coupons
                                    </p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Members of the loyalty segment</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        Nectar
                                    </p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Members of the loyalty segment</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        Refer a Friend
                                    </p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        <b>Conditions</b>
                                    </p>
                                </b-col>
                                <b-col sm="6">
                                    <p class="no-margin">
                                        Age group is <b>18-25</b><br />
                                        Country is not <b>Italy</b><br />
                                        Gender is not <b>Female</b>
                                    </p>
                                </b-col>
                            </b-row>
                        </b-container>
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
