<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Points</h3>
        </div>
        <div class="content">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between w-75 flex-wrap">
                    <p class="brand">key</p>
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
                <div class="d-flex justify-content-between w-75 mt-2 flex-wrap">
                    <p class="brand">Value Function</p>

                    <div class="w-50">
                        <b-dropdown
                            :text="valueFunc"
                            block
                            menu-class="w-100"
                            variant="outline-brand"
                        >
                            <b-dropdown-item
                                v-for="item in valueFuncList"
                                :key="item.name"
                                :value="item.name"
                                @click="valueFunc = item.name"
                                >{{ item.name }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 326px"
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
                            $router.push({
                                name: 'Rewards-Points-Data-Science',
                            });
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
//import { mapGetters } from 'vuex';
export default {
    name: 'Reward-Point-Personalization',
    // computed: {
    //     ...mapGetters(['rewardsList'])
    // }
    data() {
        return {
            dropdownTxt: 'Amount',
            valueFunc: 'Calculate Using Loyalty Level',
            discription: '',
            providerList: [{ name: 'Amount' }, { name: 'Percentage' }],
            valueFuncList: [
                { name: 'Calculate Using Loyalty Level' },
                { name: 'https://unchaninedcarrot.com' },
            ],
        };
    },
    methods: {
        addClassRequestBody() {
            this.$store.commit('ADD_CLASS_REQUEST_BODY', {
                personalizationSettings: {
                    key: this.dropdownTxt,
                    valueFunctionUrl: this.valueFunc,
                },
            });
        },
    },
};
</script>
