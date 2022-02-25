<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Coupon</h3>
            <p class="page-header">
                Configure the below attributes for data analysis and machine
                learning
            </p>
        </div>
        <div class="content">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between w-50 flex-wrap">
                    <p class="brand">Value Preposition</p>
                    <div class="w-50">
                        <b-dropdown
                            :text="valueProposition"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in providerList"
                                :key="item.name"
                                :value="item.name"
                                @click="valueProposition = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Discount</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="discount"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Cross Organizational</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="crossOrganizational"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Limited Time Offer</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="limitedTimeOffer"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-75 mt-2 flex-wrap">
                    <p class="brand">Limited Time Redemption</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="limitedTimeRedemption"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Time To Redemption</p>

                    <div class="w-50">
                        <b-dropdown
                            :text="timeToRedemption"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in timeToRedemptionList"
                                :key="item.name"
                                :value="item.name"
                                @click="timeToRedemption = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Fear of missing out</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="missingOutFear"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Reward Probillity</p>

                    <div class="w-50 d-flex">
                        <b-form-input
                            class="w-25"
                            value="100"
                            v-model="rewardProbability"
                        ></b-form-input>
                        <p class="brand mt-2 ml-2">%</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Redeem Probillity</p>

                    <div class="w-50 d-flex">
                        <b-form-input
                            class="w-25"
                            value="100"
                            v-model="redeemProbability"
                        ></b-form-input>
                        <p class="brand mt-2 ml-2">%</p>
                    </div>

                    <div
                        class="d-flex justify-content-between w-100 mt-2 flex-wrap"
                    >
                        <p class="brand w-75">Redemption Prerequesite</p>

                        <div class="w-25">
                            <b-dropdown
                                :text="redemptionPrerequesite"
                                block
                                menu-class="w-100"
                                variant="outline-brand"
                            >
                                <b-dropdown-item
                                    v-for="item in redemptionPrerequesiteList"
                                    :key="item.name"
                                    :value="item.name"
                                    @click="redemptionPrerequesite = item.name"
                                    >{{ item.name }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                    </div>

                    <!-- FACE VALUE -->
                    <div
                        class="d-flex justify-content-between w-100 mt-2 flex-wrap"
                    >
                        <p class="brand w-25">Face Value</p>

                        <div class="w-25">
                            <b-dropdown
                                :text="faceValueCurrency"
                                block
                                menu-class="w-100"
                                variant="outline-brand"
                            >
                                <b-dropdown-item
                                    v-for="item in faceValueList"
                                    :key="item.name"
                                    :value="item.name"
                                    @click="faceValueCurrency = item.name"
                                    >{{ item.name }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                        <b-form-input
                            class="w-25"
                            value="7.5"
                            v-model="faceValue"
                        ></b-form-input>
                    </div>
                    <!-- COST PRICE -->
                    <div
                        class="d-flex justify-content-between w-100 mt-2 flex-wrap"
                    >
                        <p class="brand w-25">Cost Price</p>

                        <div class="w-25">
                            <b-dropdown
                                :text="costPriceCurrency"
                                block
                                menu-class="w-100"
                                variant="outline-brand"
                            >
                                <b-dropdown-item
                                    v-for="item in costPriceList"
                                    :key="item.name"
                                    :value="item.name"
                                    @click="faceValue = item.name"
                                    >{{ item.name }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                        <b-form-input
                            class="w-25"
                            value="7.5"
                            v-model="costValue"
                        ></b-form-input>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 90px"
        >
            <div class="d-flex justify-content-end w-100 mt-auto p-2">
                <div
                    class="d-flex justify-content-between"
                    style="width: 24.5%"
                >
                    <b-btn
                        variant="outline-brand"
                           style="width:100px"
                        @click="$router.push({ name: 'AddRewardClass' })"
                    >
                        Cancel
                    </b-btn>
                    <b-btn
                        variant="brand"
                           style="width:100px"
                        @click="
                            addClassRequestBody();
                           $router.push({ name: 'AddRewardClass' })
                        "
                    >
                        Save
                    </b-btn>
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>

export default {
    name: 'Reward-Coupon-Data-Science',
    data() {
        return {
            valueProposition: 'Saving',
            timeToRedemption: 'Immediate',
            rewardProbability: 100,
            redeemProbability: 100,
            discription: '',
            crossOrganizational: false,
            discount: false,
            limitedTimeRedemption: false,
            limitedTimeOffer: false,
            missingOutFear: false,
            providerList: [{ name: 'Saving' }],
            timeToRedemptionList: [{ name: 'future' }],
            redemptionPrerequesite: 'none',
            redemptionPrerequesiteList: [{ name: 'none' }],
            faceValueCurrency: 'Eur',
            faceValueList: [{ name: 'Eur' }, { name: 'Dollar' }],
            faceValue: '',
            costPriceCurrency: 'Eur',
            costPriceList: [{ name: 'Eur' }, { name: 'Dollar' }],
            costValue: '',
        };
    },
    methods: {
        addClassRequestBody() {
            this.$store.commit('ADD_CLASS_REQUEST_BODY', {
                valueProposition: this.valueProposition,
                crossOrganizational: this.crossOrganizational,
                limitedTimeOffer: this.limitedTimeOffer,
                timeToRedemption: this.timeToRedemption,
                rewardProbability: this.rewardProbability,
                discount:this.discount,
              rewardFaceValue:  parseInt(this.faceValue),
              rewardCostPrice:parseInt(this.costValue),
              fomo:this.missingOutFear,
              redemptionPrerequisite:this.redemptionPrerequesite,
            });
            let that = this;
            setTimeout(function () {
                that.$store.dispatch('addRewardClassPoints');
            }, 2000);
        },
    },
};
</script>
