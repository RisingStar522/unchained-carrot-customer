<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Coupon</h3>
            <h4 class="text-brand">The reward can be redeemed at</h4>
        </div>

        <b-form-input
            v-model="search"
            class="w-50"
            placeholder="Search Organization"
        ></b-form-input>

        <b-card
            class="text-center w-75 mt-3 overflow-auto"
            border-variant="primary"
            style="height: 300px"
        >
            <div class=" ">
                <div
                    class="d-flex justify-content-between align-items-center mt-2"
                    v-for="item in organizationList"
                    :key="item"
                >
                    <p style="padding: 0; margin: 0" class="text-brand primary">
                        {{ item }}
                    </p>
                    <fa-icon icon="trash-alt" />
                </div>
            </div>
        </b-card>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 40px"
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
                                name: 'Rewards-Coupon-Redeem-Value',
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
    name: 'Rewards-Coupon-Redeem-Coalition',
    data() {
        return {
            organizationList: ['Lisaola', 'Himogura', 'Amaeerty Somerwa'],
            search: '',
        };
    },
};
</script>
