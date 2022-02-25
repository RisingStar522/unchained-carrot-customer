<template>
    <div class="app-slidebar">
        <div class="header">Add Rewards Class</div>

        <div class="content">
            <div v-for="item in nav" :key="item.link" class="mt-4">
                <div
                    v-if="item.name != 'Redeem'"
                    @click="
                        active = item.link;
                        collapsed = false;
                        $router.push({
                            name: item.link,
                        });
                    "
                    class="list"
                    :class="active == item.link ? 'listItemColor' : ''"
                >
                    {{ item.name }}
                </div>
                <div v-else class="">
                    <div
                        class="d-flex justify-content-between list"
                        @click="
                            collapsed = !collapsed;
                            active = item.link;
                        "
                        :class="active == item.link ? 'listItemColor' : ''"
                    >
                        <div class="list">{{ item.name }}</div>
                        <span class="list">
                            <fa-icon
                                :icon="
                                    collapsed ? 'chevron-up' : 'chevron-down'
                                "
                            />
                        </span>
                    </div>
                    <div v-show="collapsed">
                        <div style="color: grey" class="mt-3">
                            {{ 'Where' }}
                        </div>
                        <div
                            class="where mt-3 list"
                            :class="
                                subListTab == whereItem.link
                                    ? 'listItemColor'
                                    : ''
                            "
                            v-for="whereItem in item.where"
                            :key="whereItem.link"
                            @click="
                                subListTab = whereItem.link;
                                $router.push({
                                    name: whereItem.link,
                                });
                            "
                        >
                            {{ whereItem.name }}
                        </div>
                        <div style="color: grey" class="mt-3">
                            {{ 'Shopping Cart' }}
                        </div>
                        <div
                            class="shoppingCart list mt-3"
                            v-for="shoppingCartItem in item.shoppingCart"
                            :key="shoppingCartItem.name"
                            @click="
                                subListTab = shoppingCartItem.link;
                                $router.push({
                                    name: shoppingCartItem.link,
                                });
                            "
                            :class="
                                subListTab == shoppingCartItem.link
                                    ? 'listItemColor'
                                    : ''
                            "
                        >
                            {{ shoppingCartItem.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <b-btn class="text-brand" size="lg" variant="link"> Save </b-btn>
        </div>
    </div>
</template>
<script>
export default {
    name: 'slidebar-reward-coupon-component',
    components: {
        //     SlideBarCouponNavItem,
    },
    data() {
        return {
            active: 'Rewards-Coupon-General',
            subListTab: 'Rewards-Coupon-Redeem-OmniChannel',
            collapsed: false,
            activeTab: 'Rewards-Coupon-General',
            nav: [
                {
                    name: 'General',
                    link: 'Rewards-Coupon-General',
                    children: [],
                },
                { name: 'Images', link: 'Rewards-Coupon-Images', children: [] },
                {
                    name: 'Distribution',
                    link: 'Rewards-Coupon-Distribution',
                    children: [],
                },
                {
                    name: 'Redeem',
                    link: 'Rewards-Coupon-Redeem-Omnichannel',
                    where: [
                        {
                            name: '- Omnichannel',
                            link: 'Rewards-Coupon-Redeem-OmniChannel',
                        },
                        {
                            name: '- Coalition',
                            link: 'Rewards-Coupon-Redeem-Coalition',
                        },
                    ],
                    shoppingCart: [
                        {
                            name: '- Value',
                            link: 'Rewards-Coupon-Redeem-Value',
                        },
                        {
                            name: '- Categories',
                            link: 'Rewards-Coupon-Redeem-Categories',
                        },
                        {
                            name: '- Products',
                            link: 'Rewards-Coupon-Redeem-Categories',
                        },
                    ],
                },
                {
                    name: 'Personalization',
                    link: 'Rewards-Coupon-Personalization',
                    children: [],
                },
                {
                    name: 'Data Science',
                    link: 'Rewards-Coupon-Data-Science',
                    children: [],
                },
            ],
        };
    },
    mounted(){
    },
    watch:{
       '$route': {
    immediate: true,
    handler() {
      this.active = this.$router.currentRoute.name
      this.subListTab = this.$router.currentRoute.name
      if(this.$router.currentRoute.name == 'Rewards-Coupon-Redeem-OmniChannel') this.collapsed = true
    }
  },
       
    }
};
</script>
<style scoped>
.list:hover {
    color: orange !important;
    cursor: pointer;
}
.listItemColor {
    color: orange !important;
}
.subListItemColor {
    color: orange !important;
}
</style>