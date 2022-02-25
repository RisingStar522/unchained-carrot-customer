<template>
    <div class="content">
        <h4 class="text-brand">Reward Classes</h4>

        <b-card
            v-for="rewardClass in rewardClasses"
            :key="rewardClass.rewardClass"
        >
            <div class="d-flex justify-content-between">
                <div class="d-flex mt-1">
                    <fa-icon
                        :icon="rewardClass.icon"
                        class="mr-1 text-brand"
                        size="lg"
                    />
                    <p class="text-brand ml-4">{{ rewardClass.rewardClass }}</p>
                </div>
                <div class="d flex">
                    <fa-icon icon="plus-circle" class="ml-3 text-brand" />
                    <b-button variant="link" class="text-brand"
                     @click="addClassName(rewardClass.rewardClass );$router.push({name:rewardClass.link})"
                        >Add New
                    </b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'reward-sets',
    // components: {
    //     AddEventModal
    // },
    data: () => ({
        rewardClasses: [
            {
                icon: 'star',
                rewardClass: 'Points',
                link:'Rewards-Points-General'
            },
            {
                icon: 'gift',
                rewardClass: 'Coupons',
                link:'Rewards-Coupon-General'
            },
            {
                icon: 'heart',
                rewardClass: 'Donations',
            },
            {
                icon: 'star',
                rewardClass: 'Tokens (coming soon)',
            },

            {
                icon: 'signal',
                rewardClass: 'Collectables (coming soon)',
            },
            {
                icon: 'folder-open',
                rewardClass: 'Game cards (coming soon)',
            },
        ],
    }),
    methods:{
        addClassName(className)
        {
            this.$store.commit('ADD_CLASS_REQUEST_BODY',{rewardClassName:className})
        }
    }
};
</script>
