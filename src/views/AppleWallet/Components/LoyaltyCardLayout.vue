<template>
    <div class="loyalty-card-layout">
        <div id="coupon-header">
            <img src="../../../assets/images/Unchained-logo.png" alt="" />
            <h5>Logo Text</h5>
            <h5>Header</h5>
        </div>
        <div id="coupon-primary">
          <h5>Primary</h5>
        </div>
        <div id="coupon-secondary">
          <h5>Secondary</h5>
        </div>
        <div id="coupon-auxiliary">
          <h5>Auxiliary</h5>
        </div>
        <div id="coupon-barcode">
          <img src="../../../assets/images/code-128.gif" alt="" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'coupon-layout-page'
};
</script>
<style lang="scss" scoped>
.loyalty-card-layout {
    padding-top: 15px;
    padding-bottom: 20px;
    background-color: #5D54F1;
    color: #FFFFFF;

    #coupon-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 15px 15px;

        img {
            height: 50px;
        }
    }
    #coupon-primary {
        background-image: url('../../../assets/images/UnchainedCarrot_bg.png');
        height: 200px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        color: #000000;
        padding: 15px;
    }
    #coupon-secondary {
      padding: 15px;
    }
    #coupon-auxiliary {
      padding: 15px;
    }
    #coupon-barcode {
      text-align: center;
      padding: 15px;
    }
}
</style>
