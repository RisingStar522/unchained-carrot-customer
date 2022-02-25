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
                    <p class="text-brand">Maximum Uses</p>
                    <div class="w-50">
                        <b-form-input
                            class="w-50"
                            v-model="maximumUses"
                        ></b-form-input>
                    </div>
                </div>
                <!-- maximum cart amount -->
                <div class="d-flex w-100 mt-2 flex-wrap">
                    <p class="text-brand w-25">Minimum Cost Amount</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        style="width: 8%"
                        v-model="minimumDiscount"
                    ></b-form-checkbox>
                    <div style="width: 15%" class="ml-3">
                        <b-dropdown
                            :text="minimumCostAmount"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in minimumCostAmountList"
                                :key="item.name"
                                :value="item.name"
                                @click="maximumCostAmount = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <b-form-input
                        style="width: 15%"
                        value="7.5"
                        v-model="minimumCartValue"
                        class="ml-3"
                    ></b-form-input>
                </div>
                <!-- mimimum cost amount -->
                <div class="d-flex w-100 mt-2 flex-wrap">
                    <p class="text-brand w-25">Maximum Cost Amount</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        style="width: 8%"
                        v-model="discount"
                    ></b-form-checkbox>
                    <div style="width: 15%" class="ml-3">
                        <b-dropdown
                            :text="maximumCostAmount"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in maximumCostAmountList"
                                :key="item.name"
                                :value="item.name"
                                @click="maximumCostAmount = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <b-form-input
                        style="width: 15%"
                        value="7.5"
                        v-model="faceValue"
                        class="ml-3"
                    ></b-form-input>
                </div>
                <!-- individual use only -->
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="text-brand">Individual Use Only</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="individualOnly"
                    ></b-form-checkbox>
                </div>
                <!-- Excluded sale items -->
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="text-brand">Exclude Sale Items</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="excludeSaleItems"
                    ></b-form-checkbox>
                </div>
                <!-- Maximum Items -->
                <div class="d-flex w-100 mt-2 flex-wrap">
                    <p class="text-brand w-25">Maximum Items</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        style="width: 8%"
                        v-model="maximumItems"
                    ></b-form-checkbox>

                    <b-form-input
                        style="width: 15%"
                        value="7.5"
                        v-model="maximumItemsInput"
                        class="ml-3"
                    ></b-form-input>
                </div>
            </div>
        </div>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 80px"
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
                            $router.push({
                                name: 'Rewards-Coupon-Redeem-Categories',
                            })
                        "
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
    name: 'Rewards-Coupon-Redeem-Value',

    data() {
        return {
            maximumUses: '',
            maximumCostAmountList: [{ name: 'Eur' }, { name: 'Dollar' }],
            maximumCostAmount: 'EUR',
            minimumCartValue: '',
            minimumCostAmountList: [{ name: 'Eur' }, { name: 'Dollar' }],
            minimumCostAmount: 'EUR',
            minimumDiscount: false,
            individualOnly: false,
            excludeSaleItems: false,
            maximumItems: false,
            maximumItemsInput: '',
            discount: false,
            faceValue: '',
        };
    },
};
</script>
