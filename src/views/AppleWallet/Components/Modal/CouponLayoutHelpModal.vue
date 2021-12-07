<template>
    <div>
        <b-modal
            id="coupon-layout-modal"
            ref="modal"
            title="Layout of a coupon"
            centered
            header-class="custom-header"
            :hide-footer="true"
            size="lg"
        >
            <div class="coupon-layout-container">
                <img src="../../../../assets/images/coupon_layout.png" alt="" />
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'coupon-layout-modal-component'
};
</script>
<style lang="scss" scoped>
::v-deep .custom-header {
    border: none;
}
</style>
