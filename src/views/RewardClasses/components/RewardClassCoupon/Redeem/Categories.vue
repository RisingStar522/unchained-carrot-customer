<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Points</h3>
            <h4 class="text-brand">The reward can be redeemed at</h4>
        </div>
        <div class="w-25 mt-3">
            <b-dropdown
                :text="Countr"
                block
                menu-class="w-100"
                variant="outline-brand"
            >
                <b-dropdown-item
                    v-for="item in CountrList"
                    :key="item.name"
                    :value="item.name"
                    @click="Countr = item.name"
                    >{{ item.name }}</b-dropdown-item
                >
            </b-dropdown>
        </div>
        <!-- CAN BE APPLIED TO -->
        <div class="d-flex mt-3 w-100">
            <div class="d-flex flex-column w-50">
                <p class="text-brand">Can be applied to</p>
                <b-form-input
                    v-model="search"
                     style="width:55%"
                    class="mt-2"
                    placeholder="Search Product Category"
                ></b-form-input>

                <b-card
                    class="text-center w-75 mt-3 overflow-auto"
                    border-variant="primary"
                    style="height: 300px"
                >
                    <div
                        class="d-flex justify-content-between align-items-center mt-2"
                        v-for="item in organizationList"
                        :key="item"
                    >
                        <p style="padding: 0; margin: 0" class="brand primary">
                            {{ item }}
                        </p>
                        <fa-icon icon="trash-alt" />
                    </div>
                </b-card>
            </div>

            <!-- CANNOT BE APPLIED TO -->

            <div class="d-flex flex-column w-50">
                <p class="text-brand">Cannot be applied to</p>
                <b-form-input
                    v-model="cannotBeAppliedTosearch"
                    class="mt-2"
                    style="width:55%"
                    placeholder="Search Product Category"
                ></b-form-input>

                <b-card
                    class="text-center w-75 mt-3 overflow-auto"
                    border-variant="primary"
                    style="height: 300px"
                >
                    <div
                        class="d-flex justify-content-between align-items-center mt-2"
                        v-for="item in cannotBeAppliedList"
                        :key="item"
                    >
                        <p style="padding: 0; margin: 0" class="brand primary">
                            {{ item }}
                        </p>
                        <fa-icon icon="trash-alt" />
                    </div>
                </b-card>
            </div>
        </div>
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
                                name: 'Rewards-Coupon-Personalization',
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
    name: 'Rewards-Coupon-Redeem-Categories',
    data() {
        return {
            organizationList: ['Lisaola', 'Himogura', 'Amaeerty Somerwa'],
            search: '',
            Countr: 'Countr',
            CountrList: [{ name: 'Countr', value: 'countr' }],
            cannotBeAppliedTosearch: '',
            cannotBeAppliedList: ['Lisaola', 'Himogura', 'Amaeerty Somerwa'],
        };
    },
};
</script>
