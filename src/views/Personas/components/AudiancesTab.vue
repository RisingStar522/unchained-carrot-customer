<template>
    <div class="content fullheight-container">
        <b-container class="form_numeric_tab-form hidden-edit" fluid>
            <b-list-group>
                <b-list-group-item class="list-item">
                    <div>
                        <img
                            src="@/assets/images/rewards/metamask.png"
                            alt="Metamask"
                            width="70px"
                            style="margin-right:30px"
                        />
                        Cras justo odio
                        <span>30m</span>
                        </div>
                    </b-list-group-item>
                <b-list-group-item class="list-item">
                    <div>
                        <img
                            src="@/assets/images/rewards/metamask.png"
                            alt="Metamask"
                            width="70px"
                            style="margin-right:30px"
                        />
                        Dapibus ac facilisis in
                        <span>30m</span>
                    </div>
                </b-list-group-item>
                <b-list-group-item class="list-item">
                    <div>
                        <img
                            src="@/assets/images/rewards/metamask.png"
                            alt="Metamask"
                            width="70px"
                            style="margin-right:30px"
                        />
                        Cras justo odio
                        <span>30m</span>
                        </div>
                    </b-list-group-item>
                <b-list-group-item class="list-item">
                    <div>
                        <img
                            src="@/assets/images/rewards/metamask.png"
                            alt="Metamask"
                            width="70px"
                            style="margin-right:30px"
                        />
                        Dapibus ac facilisis in
                        <span>30m</span>
                    </div>
                </b-list-group-item>
                <b-list-group-item class="list-item">
                    <div>
                        <img
                            src="@/assets/images/rewards/metamask.png"
                            alt="Metamask"
                            width="70px"
                            style="margin-right:30px"
                        />
                        Dapibus ac facilisis in
                        <span>30m</span>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </b-container>
    </div>
</template>

<script>

export default {
    name: 'audiences-tab-component',
    data: () => ({}),
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
.list-item {
    border-top: none !important;
}
.list-item div {
    margin-left: -3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    padding-bottom: 0.75rem;
    padding-right: 13px;
}
.list-group {
    border-top: none !important;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0px;
}
.list-group-item {
    border: none;
    padding-top: 0x !important;
    padding-bottom: 0px !important;
    padding-right: 0px !important;
    border-top-left-radius: none !important;
    border-top-right-radius: none !important;
}
.hidden-edit {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
div span {
    float: right;
}
</style>
