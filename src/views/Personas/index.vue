<template>
    <div class="content mt-5 full-height">
        <div class="center-flex full-height">
            <div class="personas-index">
                <img
                    src="@/assets/images/personas/UC_personas-05-05.png"
                    width="30%"
                    alt="Pesonas Main Image"
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

                <!-- <Modal modalId="addPersonas" title="Add Persona Trait">
                    <template v-slot:default>
                        <div class="validation_mark">
                            <img
                                class="mr-2"
                                src="../../assets/icons/validation_mandatory.svg"
                            />
                            <span>MANDATORY</span>
                        </div>
                        <b-row class="m-1">
                            <label><small>Source</small></label>
                            <b-form-select
                                id="event-source"
                                name="event-source"
                                v-model="selected"
                                :options="transformActiveIntegrations"
                                class="mb-3"
                                aria-placeholder="select event source"
                            >
                            </b-form-select>
                        </b-row>
                        <b-form-group id="input-group-1" label="Name" label-for="input-2">
                            <b-form-input
                                id="input-1"
                                v-model="form.name"
                                placeholder="Propensity to buy"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Default Value" label-for="input-2">
                            <b-form-input
                                id="input-2"
                                v-model="form.value"
                                placeholder="50%"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </template>
                </Modal> -->
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
// import Modal from '../../views/Personas/components/modal';
// import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'personas',
    // components: {
    //     Modal
    // },
    data() {
        return {
            personasMainFindContent: [
                'List of users',
                'List of subscribers',
                'List of members'
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
    width: 200px;
    font-size: 14px;
}

.content-list {
    background-color: #f0f0f7;
}

.validation_mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    margin-left: 15px;
    margin-top: -80px;

    span {
        color: #a3a0fb;
        font-size: 12px;
        line-height: 20px;
    }
}
</style>
