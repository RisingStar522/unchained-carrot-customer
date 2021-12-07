<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Points</h3>
        </div>
        <div class="content">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between w-50 flex-wrap">
                    <p class="brand">Default Email Template</p>
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
                                @click="dropdownTxt = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Whatapp Template</p>

                    <div class="w-50">
                        <b-dropdown
                            text="Coming soon"
                            block
                            disabled
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
                </div>

                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="brand">Push Notifications</p>

                    <div class="w-50">
                        <b-dropdown
                            text="Coming Soon"
                            block
                            disabled
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
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-end w-50">
            <b-btn variant="brand" width="300" height="40">
                Add Template
            </b-btn>
        </div>

        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 240px"
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
                                name: 'Rewards-Points-Personalization',
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
    name: 'Reward-Point-Distribution',
    data() {
        return {
            dropdownTxt: 'Provider',
            discription: '',
            providerList: [{ name: 'Carrot' }, { name: 'WooCommerce' }],
        };
    },
};
</script>
