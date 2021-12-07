<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Points</h3>
            <h4 class="text-brand">The reward can be redeemed using</h4>
        </div>

        <div class="d-flex  w-100 flex-wrap mt-4">
            <div class="d-flex flex-column" style="width: 25%">
                <p class="text-brand">Ecommerce</p>

                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        v-model="ecommerce"
                        :options="ecommerceOptions"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2a"
                        stacked
                    ></b-form-checkbox-group>
                </b-form-group>
            </div>
            <div class="d-flex flex-column" style="width: 25%">
                <p class="text-brand">Plateforms</p>

                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        v-model="Plateform"
                        :options="plateformOptions"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2a"
                        stacked
                    ></b-form-checkbox-group>
                </b-form-group>
            </div>
            <div class="d-flex flex-column" style="width: 25%">
                <p class="text-brand">Point Of Sale</p>

                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        v-model="pointOfSale"
                        :options="pointOfSaleOptions"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2a"
                        stacked
                    ></b-form-checkbox-group>
                </b-form-group>
            </div>
        </div>

        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 220px"
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
                                name: 'Rewards-Coupon-Redeem-Coalition',
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
    name: 'Reward-Coupon-Redeem-Omni-Channel',
    data() {
        return {
            ecommerce: [],
            ecommerceOptions: [
                { text: 'WOOCOMERCE', value: 'woocommerce' },
                { text: 'SHOPIFY', value: 'shopify' },
                { text: 'MOGENTO', value: 'magento' },
            ],
            plateformOptions: [
                { text: 'BRICKLINK', value: 'bricklink' },
                { text: 'QUENCHY', value: 'quenchy' },
            ],
            Plateform: [],
            pointOfSale: [],
            pointOfSaleOptions: [
                { text: 'COUNTR', value: 'countr' },
                { text: 'SCLOBY', value: 'scloby' },
                { text: 'LIGHTSPEED', value: 'loghtspeed' },
                { text: 'GENERIC POS', value: 'generic pos' },
            ],
        };
    },
};
</script>
