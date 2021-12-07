<template>
    <b-nav-item-dropdown right no-caret style="width:50px">
        <template slot="button-content">
            <div>{{ chosenMode }}</div>
        </template>
        <b-dropdown-item
            v-for="(mode, index) in modes"
            :key="index"
            @click="changeMode(index)"
            :active="mode === chosenMode"
        >
            {{ mode }}
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
import { submitTrackingEvent } from '../../services/TrackingService';

export default {
    name: 'feature-toggle-mode-dropdown-component',
    data() {
        return {
            chosenMode: localStorage.getItem('featureMode'),
            modes: Object.keys(this.$store.state.allFeatureFlags)
        };
    },
    methods: {
        async changeMode(mode) {
            // Send Tracking Event With UCC SDK
            await submitTrackingEvent(
                'CUSTOMER_CHANGED_MODE',
                { featureMode: this.modes[mode] },
                this.$store.getters['customerData']
            );
            localStorage.setItem('featureMode', this.modes[mode]);
            this.chosenMode = this.modes[mode];
            window.location.reload(true);
        }
    },
    mounted() {}
};
</script>
