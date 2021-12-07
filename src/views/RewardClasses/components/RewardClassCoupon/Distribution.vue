<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Coupon</h3>
        </div>
        <div class="content">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between w-75 flex-wrap">
                    <p class="text-brand" style="width: 35%">
                        Default Email Template
                    </p>
                    <div class="w-25">
                        <b-dropdown
                            :text="dropdownTxt"
                            variant="outline-brand"
                            block
                            menu-class="w-100"
                        >
                            <b-dropdown-item
                                v-for="item in providerList"
                                :key="item.name"
                                :value="item.name"
                                @click="dropdownTxt = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <b-btn variant="brand" width="300" height="40">
                        Add Template
                    </b-btn>
                </div>
                <div class="d-flex justify-content-between w-75 mt-2 flex-wrap">
                    <p class="text-brand" style="width: 35%">App Wallet Pass</p>

                    <div class="w-25">
                        <b-dropdown
                            text="Free Coffee"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in providerList"
                                :key="item.name"
                                :value="item.name"
                                @click="dropdownTxt = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <b-btn variant="brand" width="300" height="40">
                        Add Template
                    </b-btn>
                </div>

                <div class="d-flex justify-content-between w-75 mt-2 flex-wrap">
                    <p class="text-brand" style="width: 31%">Passes For Pay</p>

                    <div class="w-25 ml-4">
                        <b-dropdown
                            text="Free Coffee"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in providerList"
                                :key="item.name"
                                :value="item.name"
                                @click="dropdownTxt = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                    <b-btn variant="brand" width="300" height="40">
                        Add Template
                    </b-btn>
                </div>
            </div>
        </div>

        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 270px"
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
                                name: 'Rewards-Coupon-Redeem-OmniChannel',
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
    name: 'Reward-Coupon-Distribution',
    data() {
        return {
            dropdownTxt: 'Free Coffee',
            discription: '',
            providerList: [{ name: 'Carrot' }, { name: 'WooCommerce' }],
        };
    },
};
</script>
