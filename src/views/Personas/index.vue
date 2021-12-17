<template>
    <div class="content mt-5 full-height">
        <div class="center-flex full-height">
            <div class="personas-index">
                <img
                    src="@/assets/images/personas/UC_personas-05-05.png"
                    width="30%"
                    alt="Personas Main Image"
                />
                <h2>Personas are all your users, contacts and members</h2>
                <div class="persons-index-p">
                    <p>
                        We don't have personas yet. Read in our guide how to create event and start gathering data to better understand the traits of your users.
                    </p>
                </div>
                <b-row class="personas-index-row">
                    <b-col>
                        <b-button class="personas-index-btn" variant="outline-brand">
                            Read Guide
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button
                            class="personas-index-btn"
                            variant="primary"
                            :to="{ name: 'AddPersonas' }"
                        >
                            Add personas
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
        <div class="personas-main-find-content">
            <h3>What can you find here</h3>
            <div class="row">
                <div class="col px-md-4 content-list">
                    <div class="p-4">
                        <img
                            class="mr-2"
                            src="../../assets/icons/right_check.svg"/>
                            List of users
                    </div>
                </div>
                <div class="col px-md-4 content-list">
                    <div class="p-4">
                        <img
                            class="mr-2"
                            src="../../assets/icons/right_check.svg"/>
                            List of subscribers
                    </div>
                </div>
                <div class="col px-md-4 content-list">
                    <div class="p-4">
                        <img
                            class="mr-2"
                            src="../../assets/icons/right_check.svg"/>
                            List of members
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'personas',
    data() {
        return {
            personasMainFindContent: [
                'List of users',
                'List of subscribers',
                'List of members'
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.personas-index {
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

.personas-main-find-content {
    border: 1px solid #cecfd0;
    max-width: 840px;
    margin: auto;
    padding: 24px 20px;
    margin-top: 35px;
    text-align: center;
    margin-bottom: 70px;
    padding-bottom: 70px;
    
    h3 {
        font-size: 24px;
        font-weight: bold;
        color: #43425D;
    }
}

.personas-index-row {
    margin-left: 200px;
    margin-right: 200px;
}

.personas-index-btn {
    width: 200px !important;
    font-size: 14px;
}

.content-list {
    background-color: #f0f0f7;
}
</style>
