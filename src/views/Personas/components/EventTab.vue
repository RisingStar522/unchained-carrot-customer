<template>
    <div class="content fullheight-container">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item v-for="list in lists" :key="list.key">
                    <div class="row">
                        <div class="col-1">
                            <span class="bg-gray-300 text-gray-500" style="margin-right:15px">
                                <MonitorIcon></MonitorIcon>
                            </span> 
                        </div>
                        <div class="col-8">{{ list.text }}</div>
                        <div class="col-3 pr-3"><span>{{ list.unit }}</span></div>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </b-container>
    </div>
</template>

<script>
import {
    MonitorIcon
} from "vue-feather-icons";

export default {
    name: 'event-tab-component',
    components: {
        MonitorIcon
    },
    data: () => ({
        lists: [
                {
                    key: 1,
                    icon: MonitorIcon,
                    text: 'Email opened',
                    unit: '10s'
                },
                {
                    key: 2,
                    icon: MonitorIcon,
                    text: 'Checkout started',
                    unit: '12m'
                },
                {
                    key: 3,
                    icon: MonitorIcon,
                    text: 'Product added',
                    unit: '15m'
                },
                {
                    key: 4,
                    icon: MonitorIcon,
                    text: 'Product viewed',
                    unit: '23m'
                },
                {
                    key: 5,
                    icon: MonitorIcon,
                    text: 'User login',
                    unit: '30m'
                }
        ]
    }),
    props: {
        // modalId: {
        //     type: String,
        //     required: true
        // },
        // title: {
        //     type: String,
        //     required: false
        // }
    }
};
</script>

<style style="scss" scoped>
label {
    color: #2f3380;
}
.list-group-item {
    border-top: none;
    border-top-left-radius: none !important;
    border-top-right-radius: none !important;
}
.hidden-edit {
    padding-left: 10px !important;
    padding-right: 0px !important;
}
span {
    float: right;
}
</style>
