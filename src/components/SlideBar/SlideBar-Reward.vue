<template>
    <div class="app-slidebar">
        <div class="header">
            Rewards
        </div>
        <div class="content">
            <ul class="nav">
                <SlideBarNavItem
                    v-for="item in rewardsList"
                    :nav="item"
                    :selected="item.link"
                    :key="item.id"
                />
            </ul>
        </div>
        <div class="footer">
            <b-btn
                :to="{ name: 'RewardsNew' }"
                variant="outline-brand"
                size="lg"
            >
                Add Reward
            </b-btn>
        </div>
    </div>
</template>
<script>
import SlideBarNavItem from './SlideBarNavItem';
import { mapGetters } from 'vuex';
export default {
    name: 'slidebar-reward-component',
    components: {
        SlideBarNavItem
    },
    computed: {
        ...mapGetters(['rewardsList'])
    }
};
</script>
