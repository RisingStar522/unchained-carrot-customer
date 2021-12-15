<template>
    <div class="content fullheight-container">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item v-for="list in lists" :key="list.key">
                    <div class="row">
                        <div class="col-1">
                            <span class="bg-gray-300 text-gray-500" style="margin-right:15px">
                                <BriefcaseIcon></BriefcaseIcon>
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
    BriefcaseIcon
} from "vue-feather-icons";

export default {
    name: 'event-tab-component',
    components: {
        BriefcaseIcon
    },
    data: () => ({
        lists: [
                {
                    key: 1,
                    icon: BriefcaseIcon,
                    text: 'Received 100 points',
                    unit: '10s'
                },
                {
                    key: 2,
                    icon: BriefcaseIcon,
                    text: 'Received 30% points',
                    unit: '12m'
                },
                {
                    key: 3,
                    icon: BriefcaseIcon,
                    text: 'Received 10% points',
                    unit: '15m'
                },
                {
                    key: 4,
                    icon: BriefcaseIcon,
                    text: 'Received 5% points',
                    unit: '23m'
                },
                {
                    key: 5,
                    icon: BriefcaseIcon,
                    text: 'Received 10% points',
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
