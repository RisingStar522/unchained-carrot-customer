<template>
    <div class="content mt-5 full-height">
        <div class="center-flex full-height">
            <div class="audience-index">
                <img
                    src="@/assets/images/audiences/UC_audiences-06@2x.png"
                    width="30%"
                    alt="Audiences Main Image"
                />
                <h2>Audiences</h2>
                <div class="audience-index-p">
                    <p>
                        Looks like you don't have any audiences yet. Set up filters that select which personas belong to a certain group.
                    </p>
                </div>
                <b-row class="audience-index-row">
                    <b-col>
                        <b-button
                            class="audience-index-btn"
                            variant="primary"
                            :to="{ name: 'AudiencesList' }"
                        >
                            Create audience
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
        <div class="audience-main-find-content">
            <h3>What can you find here</h3>
            <div class="">
                <div class="col px-md-4 text-left content-list" 
                    v-for="audience in audiences"
                    :key="audience._id"
                    :value="audience.value">
                    <div class="p-1">
                        <img
                            class="mr-2"
                            src="../../assets/icons/right_check.svg"/>
                            {{audience.value}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'audiences',
    // components: {
    // },
    data() {
        return {
            audience: {
                _id: '',
                value: ''
            },
            value: '',
            audiences: [
                {
                    _id: 'asdfwerwerwe',
                    value: 'List of users',
                },
                {
                    _id: 'asdfwerwerw1',
                    value: 'List analytics',
                },
                {
                    _id: 'asdfwerwere2',
                    value: 'UTM builder',
                },
                {
                    _id: 'asdfwerwerw3',
                    value: 'URL shortener',
                },
                {
                    _id: 'asdfwerwerw4',
                    value: 'QR codes',
                },
                {
                    _id: 'asdfwerwere5',
                    value: 'Channel attribution',
                },
                {
                    _id: 'asdfwerwerw6',
                    value: 'Campaign management',
                },
                {
                    _id: 'asdfwerwerw7',
                    value: 'Custom domain',
                },
                {
                    _id: 'asdfwerwere8',
                    value: 'Custom URL',
                },
            ],
        };
    },
    // computed: {
    // },
    // methods: {
    // },
    // async mounted() {
    // }
};
</script>

<style lang="scss" scoped>
.audience-index {
  text-align: center;

    h2 {
        font-size: 24px;
        font-weight: bold;
        color: #43425D;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    p {
        width: 100%;
        margin-top: 20px;
        margin: 1px auto 20px;
        font-size: 11px;
        color: #43425D;
    }
}

.audience-main-find-content {
    border: 1px solid #cecfd0;
    max-width: 840px;
    margin: auto;
    padding: 24px 25px;
    margin-top: 35px;
    text-align: center;
    margin-bottom: 70px;
    height: 100%;
    overflow: hidden;
    position: relative;

    h3 {
        font-size: 24px;
        font-weight: bold;
        color: #43425D;
    }
}

.audience-index-row {
    margin-left: 200px;
    margin-right: 200px;
}

.audience-index-btn {
    width: 200px !important;
    font-size: 14px;
}

.content-list {
    background-color: #f0f0f7;
    float: left;
    width: 260px;
    font-size: 13px !important;
    // p {
    //     font-size: 13px !important;
    // }
}
</style>
