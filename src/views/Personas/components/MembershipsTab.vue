<template>
    <div class="content">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item v-for="list in lists" :key="list.key">
                    <div class="row">
                        <div class="col-1">
                            <span class="bg-gray-300 text-gray-500" style="margin-right:15px">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
                                <defs>
                                    <clipPath id="clip-path">
                                    <rect id="Rettangolo_1746" data-name="Rettangolo 1746" width="17" height="17" transform="translate(672 264)" fill="#2f3380" stroke="#707070" stroke-width="1"/>
                                    </clipPath>
                                </defs>
                                <g id="Gruppo_di_maschere_45" data-name="Gruppo di maschere 45" transform="translate(-672 -264)" clip-path="url(#clip-path)">
                                    <path id="UCC_menu-icon_referredbyme" d="M16.2,3.809l2.408,2.156L14.592,10.83,20.4,13.112l-1.007,3.022-6.044-2.393-.362,6.69-3.227-.157.394-6.548-5.9,1.527-.819-3.2L9.444,10.5,5.95,5.069,8.579,3.431l3.463,5.478Z" transform="translate(668.584 260.568)" fill="#2f3380"/>
                                </g>
                                </svg>
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
export default {
    name: 'membership-tab-component',
    data: () => ({
        lists: [
                {
                    key: 1,
                    text: 'Subscribed to loyalty program Winter 2021',
                    unit: '10s'
                },
                {
                    key: 2,
                    text: 'Subscribed to referral program Bring a friend campaign',
                    unit: '12d'
                },
                {
                    key: 3,
                    text: 'Subscribed to loyalty program Private sales',
                    unit: '15d'
                },
                {
                    key: 4,
                    text: 'Subscribed to loyalty program Private sales',
                    unit: '15d'
                },
                {
                    key: 5,
                    text: 'Subscribed to referral program Win a euro trip',
                    unit: '4w'
                }
        ]
    }),
    props: {
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
