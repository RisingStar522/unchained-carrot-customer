<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Coupon</h3>
        </div>
        <div class="content">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between w-50 flex-wrap">
                    <p class="text-brand">Provider</p>
                    <div class="w-50">
                        <b-dropdown
                            :text="dropdownTxt"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in providerList"
                                :key="item.name"
                                :value="item.name"
                                v-model="providerObj"
                                @click="
                                    dropdownTxt = item.name;
                                    providerObj = item;
                                "
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="text-brand">Display Name</p>

                    <b-form-input
                        class="w-50"
                        value="Experience points"
                    ></b-form-input>
                </div>

                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="text-brand">Discription</p>

                    <b-form-textarea
                        class="w-50"
                        id="textarea"
                        v-model="discription"
                        placeholder="The best points..."
                        rows="4"
                        max-rows="6"
                    ></b-form-textarea>
                </div>
            </div>
        </div>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 200px"
        >
            <div class="d-flex justify-content-end w-100 mt-auto p-2">
                <div
                    class="d-flex justify-content-between"
                    style="width: 24.5%"
                >
                    <b-btn
                        variant="outline-brand"
                        style="width:100px"
                        @click="$router.push({ name: 'AddRewardClass' })
                        "
                    >
                        Cancel
                    </b-btn>
                    <b-btn
                        variant="brand"
                        style="width:100px"
                        @click="addClassRequestBody()"
                    >
                        Next
                    </b-btn>
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>
export default {
    name: 'Reward-Coupon-General',

    data() {
        return {
            dropdownTxt: 'Provider',
            providerObj: null,
            discription: '',
            providerList: [
                {
                    name: 'Unchained Carrot',
                    providerId: '123456abc',
                    providerRewardId: 'r1234678',
                },
                {
                    name: 'WooCommerce',
                    providerId: '12384456abc',
                    providerRewardId: 'r126534678',
                },
            ],
        };
    },
    methods: {
        makeToast(variant = null) {
            this.$bvToast.toast(
                'Please select provider option from dropdown.',
                {
                    title: `Error`,
                    variant: variant,
                    solid: true,
                }
            );
        },
        addClassRequestBody() {
            if (!this.providerObj) {
                this.makeToast('danger');
            } else {
                this.$store.commit('ADD_CLASS_REQUEST_BODY', {
                    providerId: this.providerObj.providerId,
                    providerRewardId: this.providerObj.providerRewardId,
                    rewardDescription: this.discription,
                });
                this.$router.push({
                    name: 'Rewards-Coupon-Images',
                });
            }
        },
    },
};
</script>
<style >
.dropdown-toggle::after{
   display: inline-block!important;
   position: absolute!important;
    bottom: 17px;
    right: 11px;
    vertical-align: 0.255em!important;
    content: ""!important;
    border-top: 0.3em solid!important;
    border-right: 0.3em solid transparent!important;
    border-bottom: 0!important;
    border-left: 0.3em solid transparent!important;

}
.dropdown-toggle{
     text-align: start;
}
#__BVID__139__BV_toggle_{
    text-align: start;
}

</style>