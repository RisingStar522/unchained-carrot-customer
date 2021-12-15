<template>
    <div class="content fullheight-container">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item v-for="list in lists" :key="list.key">
                    <div class="row">
                        <div class="col-1">
                            <span class="bg-gray-300 text-gray-500" style="margin-right:15px">
                                <UsersIcon></UsersIcon>
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
    UsersIcon
} from "vue-feather-icons";

export default {
    name: 'event-tab-component',
    components: {
        UsersIcon
    },
    data: () => ({
        lists: [
                {
                    key: 1,
                    icon: UsersIcon,
                    text: 'Real time cart abandoner',
                    unit: '2s'
                },
                {
                    key: 2,
                    icon: UsersIcon,
                    text: 'High propensity buyer',
                    unit: '12m'
                },
                {
                    key: 3,
                    icon: UsersIcon,
                    text: 'Holiday shopper',
                    unit: '15m'
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
