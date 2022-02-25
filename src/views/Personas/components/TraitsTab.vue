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
                                    <g id="Gruppo_di_maschere_12" data-name="Gruppo di maschere 12" transform="translate(-656.696 -314)" clip-path="url(#clip-path)">
                                        <g id="noun_desktop_2577560" transform="translate(663.207 314)">
                                            <path id="Tracciato_1201" data-name="Tracciato 1201" d="M18.043,16.462a1.588,1.588,0,0,0,1.581-1.581V2.229A1.588,1.588,0,0,0,18.043.647H2.229A1.588,1.588,0,0,0,.647,2.229V14.88a1.588,1.588,0,0,0,1.581,1.581H8.555v.8l-1.826.6a.769.769,0,0,0-.535.757v.223a.8.8,0,0,0,.8.8h6.326a.8.8,0,0,0,.8-.8v-.223a.819.819,0,0,0-.535-.757l-1.871-.6v-.8ZM2.229,12.5V2.229H18.066V12.519H2.229Z" transform="translate(-0.647 -0.647)" fill="#2f3380"/>
                                        </g>
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
    name: 'trait-tab-component',
    components: {
    },
    data: () => ({
        lists: [
                {
                    key: 1,
                    text: 'Email today',
                    unit: '3'
                },
                {
                    key: 2,
                    text: 'Propensity to buy',
                    unit: '75%'
                },
                {
                    key: 3,
                    text: 'Favourite product color',
                    unit: 'Red'
                },
                {
                    key: 4,
                    text: 'Last product bought',
                    unit: 'Running shoes'
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
