<template>
    <div class="content">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item v-for="list in lists" :key="list.key">
                    <div class="row">
                        <div class="col-1">
                            <span class="bg-gray-300 text-gray-500" style="margin-right:15px">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="19" viewBox="0 0 32 19">
                                    <defs>
                                        <clipPath id="clip-path">
                                        <rect id="Rettangolo_1668" data-name="Rettangolo 1668" width="32" height="19" transform="translate(656.696 314)" fill="#2f3380" stroke="#707070" stroke-width="1"/>
                                        </clipPath>
                                    </defs>
                                    <g id="Raggruppa_12" data-name="Raggruppa 12" transform="translate(-656.696 -314)" clip-path="url(#clip-path)">
                                        <path id="noun_profile_545190" d="M9.533,3.5h4.035V5.614H9.533Zm9,0h-2.7V5.614h1.629V7.244H19.58V4.567A1.024,1.024,0,0,0,18.533,3.5ZM15.352,15.662a4.627,4.627,0,0,0-2.677-4.442,2.036,2.036,0,0,0,.95-1.726,2.056,2.056,0,1,0-4.112,0,2.036,2.036,0,0,0,.95,1.726,4.646,4.646,0,0,0-2.677,4.442ZM5.614,9.533H3.5v4.035H5.614Zm0-3.918H7.244V3.5H4.567A1.064,1.064,0,0,0,3.5,4.567v2.7H5.614Zm7.953,11.871H9.533V19.6h4.035Zm3.918,0H15.856V19.6h2.677A1.064,1.064,0,0,0,19.6,18.533v-2.7H17.485Zm0-3.918H19.6V9.533H17.485ZM4.567,19.6h2.7V17.485H5.634V15.856H3.5v2.677A1.052,1.052,0,0,0,4.567,19.6Z" transform="translate(661.146 311.629)" fill="#2f3380"/>
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
    name: 'event-tab-component',
    components: {
    },
    data: () => ({
        lists: [
                {
                    key: 1,
                    text: 'Email opened',
                    unit: '10s'
                },
                {
                    key: 2,
                    text: 'Checkout started',
                    unit: '12m'
                },
                {
                    key: 3,
                    text: 'Product added',
                    unit: '15m'
                },
                {
                    key: 4,
                    text: 'Product viewed',
                    unit: '23m'
                },
                {
                    key: 5,
                    text: 'User login',
                    unit: '30m'
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
