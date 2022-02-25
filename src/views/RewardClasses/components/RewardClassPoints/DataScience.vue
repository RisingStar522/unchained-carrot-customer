<template>
    <b-container>
        <div class="header">
            <h3 class="page-header">Add Reward Class - Points</h3>
            <p class="page-header">
                Configure the below attributes for data analysis and machine
                learning
            </p>
        </div>
        <div class="content">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between w-50 flex-wrap">
                    <p class="text-brand">Value Preposition</p>
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
                    <p class="text-brand">Cross Organizational</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="crossOrganizational"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="text-brand">Limited Time Offer</p>
                    <b-form-checkbox
                        switch
                        size="lg"
                        class="w-50"
                        v-model="limitedTimeOffer"
                    ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between w-50 mt-2 flex-wrap">
                    <p class="text-brand">Time To Redemption</p>

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
                    <p class="text-brand">Reward Probillity</p>

                    <div class="w-50 d-flex">
                        <b-form-input
                            class="w-25"
                            value="100"
                            v-model="rewardProbability"
                        ></b-form-input>
                        <p class="text-brand mt-2 ml-2">%</p>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="d-flex align-items-end flex-column mb-3"
            style="height: 135px"
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
                                name: 'Rewards-Points-Image-Upload',
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
    name: 'Reward-Point-Data-Science',
    // computed: {
    //     ...mapGetters(['rewardsList'])
    // }
    data() {
        return {
            valueProposition: 'Saving',
            timeToRedemption: 'Immediate',
            rewardProbability: 100,
            discription: '',
            crossOrganizational: false,
            limitedTimeOffer: false,
            providerList: [{ name: 'Saving' }],
            timeToRedemptionList: [{ name: 'future' }],
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
            });
        },
    },
};
</script>
