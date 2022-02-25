import Vue from 'vue';

export default {
    ADD_TRAFFICROUTE(state, data) {
        Vue.set(state.trafficRoute, data.trafficRoute._id, data.trafficRoute);
        state.allTrafficRoutes.push(data.listItem);
    },

    UPDATE_TRAFFICROUTE(state, data) {
        Vue.set(state.trafficRoute, data.trafficRoute._id, data.trafficRoute);
        for (let i in state.allTrafficRoutes) {
            if (state.allTrafficRoutes[i]._id === data.listItem._id) {
                Vue.set(state.allTrafficRoutes, i, data.listItem);
                break;
            }
        }
    },

    SET_TRAFFICROUTE(state, data) {
        state.trafficRoute = data;
    },
    SET_ALL_TRAFFICROUTES(state, data) {
        state.allTrafficRoutes = data;
    },
    REMOVE_TRAFFICROUTE(state, id) {
        state.allTrafficRoutes[0] = state.allTrafficRoutes[0].filter(
            item => item._id !== id
        );
    },
    SET_INIT_REMAINING_DESTINATION_PERCENT(state, data) {
        state.totalDestinationPercent = parseInt(data);
    },
    SET_REMAINING_DESTINATION_PERCENT(state, data) {
        if(state.totalDestinationPercent > parseInt(data)) {
            state.totalDestinationPercent =
            state.totalDestinationPercent - parseInt(data);
        } else {
            state.totalDestinationPercent = 0;
        }
        
    },
    SET_ADD_REMAINING_DESTINATION_PERCENT(state, data) {
        state.totalDestinationPercent = data;
    }
};
