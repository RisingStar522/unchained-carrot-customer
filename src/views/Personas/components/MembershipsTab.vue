<template>
    <div class="content fullheight-container">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item v-for="list in lists" :key="list.key">
                    <div class="row">
                        <div class="col-1">
                            <span class="bg-gray-300 text-gray-500" style="margin-right:15px">
                                <StarIcon></StarIcon>
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
    StarIcon
} from "vue-feather-icons";

export default {
    name: 'event-tab-component',
    components: {
        StarIcon
    },
    data: () => ({
        lists: [
                {
                    key: 1,
                    icon: StarIcon,
                    text: 'Subscribed to loyalty program Winter 2021',
                    unit: '10s'
                },
                {
                    key: 2,
                    icon: StarIcon,
                    text: 'Subscribed to referral program Bring a friend campaign',
                    unit: '12d'
                },
                {
                    key: 3,
                    icon: StarIcon,
                    text: 'Subscribed to loyalty program Private sales',
                    unit: '15d'
                },
                {
                    key: 4,
                    icon: StarIcon,
                    text: 'Subscribed to loyalty program Private sales',
                    unit: '15d'
                },
                {
                    key: 5,
                    icon: StarIcon,
                    text: 'Subscribed to referral program Win a euro trip',
                    unit: '4w'
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
