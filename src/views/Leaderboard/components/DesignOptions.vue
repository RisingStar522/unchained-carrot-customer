<template>
    <div class="design-options-wrapper">
        <b-row class="mb-4">
            <b-col sm="12">
                <b-dropdown
                    :text="selectedScreenVersion"
                    block
                    variant="outline-primary"
                    menu-class="w-100"
                >
                    <b-dropdown-item
                        v-for="option in screenVersions"
                        :key="option.value"
                        :value="option.value"
                        @click="selectedScreenVersion = option.value"
                        >{{ option.text }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6">
                <div class="d-flex justify-content-center">
                    <div
                        class="preview-screen"
                        v-bind:class="{
                            mobile: selectedScreenVersion === 'mobile',
                            desktop: selectedScreenVersion === 'desktop'
                        }"
                    >
                        <div class="header">
                            <b-tabs
                                nav-wrapper-class="custom-tabs-class"
                                align="center"
                            >
                                <b-tab title="Today">
                                    <div class="top-participants text-center">
                                        <div
                                            class="participant-avatar text-center"
                                            style="position: relative; top: 30px; right: 50px;"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                2
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>

                                        <div
                                            class="participant-avatar text-center"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                1
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>

                                        <div
                                            class="participant-avatar text-center"
                                            style="position: relative; top: 30px; left: 50px;"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                3
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <b-tab title="Month">
                                    <div class="top-participants text-center">
                                        <div
                                            class="participant-avatar text-center"
                                            style="position: relative; top: 30px; right: 50px;"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                2
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>

                                        <div
                                            class="participant-avatar text-center"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                1
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>

                                        <div
                                            class="participant-avatar text-center"
                                            style="position: relative; top: 30px; left: 50px;"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                3
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <b-tab title="All Time">
                                    <div class="top-participants text-center">
                                        <div
                                            class="participant-avatar text-center"
                                            style="position: relative; top: 30px; right: 50px;"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                2
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>

                                        <div
                                            class="participant-avatar text-center"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                1
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>

                                        <div
                                            class="participant-avatar text-center"
                                            style="position: relative; top: 30px; left: 50px;"
                                        >
                                            <img
                                                :src="
                                                    require('../../../assets/images/avatar.png')
                                                "
                                                width="50px"
                                                height="50px"
                                            />
                                            <div class="participant-level">
                                                3
                                            </div>
                                            <div class="participant-name">
                                                John Wick
                                            </div>
                                            <div class="participant-ranking">
                                                <fa-icon icon="star" />98
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </div>

                        <b-list-group
                            v-for="participant in participantsList"
                            :key="participant.name"
                        >
                            <Participant
                                :name="participant.name"
                                :role="participant.role"
                                :ranking="participant.ranking"
                                :active="
                                    participantsList.indexOf(participant) == 1
                                "
                            />
                        </b-list-group>
                    </div>
                </div>
            </b-col>
            <b-col sm="6">
                <b-card class="h-100">
                    <div class="design-options">
                        <h4 class="text-brand mb-5">Design Options</h4>
                        <b-form-group>
                            <b-row>
                                <b-col sm="6">
                                    <b-form-radio class="mb-5" value="showTop3"
                                        >Show Top 3</b-form-radio
                                    >
                                    <b-form-radio class="mb-5" value="showYou"
                                        >Show you</b-form-radio
                                    >
                                </b-col>
                                <b-col sm="6">
                                    <b-form-radio
                                        class="mb-5"
                                        value="showPeriods"
                                        >Show Periods</b-form-radio
                                    >
                                    <b-form-radio
                                        class="mb-5"
                                        value="showAvatar"
                                        >Show Avatar</b-form-radio
                                    >
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Participant from './Participant';
export default {
    name: 'design-options-component',
    components: {
        Participant
    },
    data() {
        return {
            formData: {
                name: '',
                periods: ''
            },
            selectedScreenVersion: 'desktop',
            screenVersions: [
                {
                    value: 'desktop',
                    text: 'Desktop'
                },
                {
                    value: 'mobile',
                    text: 'Mobile'
                }
            ],
            participantsList: [
                { name: 'John Wick', role: 'frontend developer', ranking: 98 },
                { name: 'You', role: 'backend developer', ranking: 80 },
                {
                    name: 'Michelle Clobashar',
                    role: 'project manager',
                    ranking: 70
                }
            ]
        };
    }
};
</script>

<style lang="scss">
.preview-screen {
    &.mobile {
        width: auto;
    }
    &.desktop {
        width: 100%;
    }
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
        border-radius: 4px;
        background: #2f3380 0% 0% no-repeat padding-box;

        .custom-tabs-class {
            .nav-tabs {
                border: 1px solid #ffffff;
                border-radius: 25px;

                .nav-item {
                    .nav-link {
                        color: #ffffff;
                        font-size: 10px;
                        border: none;
                        &:active,
                        &.active {
                            border: 1px solid #ffffff;
                            color: #2f3380;
                            border-radius: 25px;
                        }
                    }
                }
            }
        }

        .top-participants {
            margin-top: 30px;
            position: relative;
        }

        .participant-avatar {
            position: relative;
            display: inline-block;
            .participant-level {
                position: absolute;
                top: 0;
                right: 0;
                width: 17px;
                height: 17px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 10px;
                color: #ffffff;
                background-color: #ff6565;
                border-radius: 50%;
            }

            .participant-name {
                color: white;
                font-size: 9px;
            }

            .participant-ranking {
                display: inline-block;
                font-size: 10px;
                color: white;
                background-color: #ff6565;
                border-radius: 10px;
                padding: 0px 4px;
            }
        }
    }
}

.design-options {
    padding: 0px 30px;

    .custom-control-input:checked ~ .custom-control-label::before {
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 2px solid #4d4f5c;
    }

    .custom-control-input:checked ~ .custom-control-label::after {
        position: absolute;
        top: 7px;
        left: -20.8px;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background-image: none;
        border-radius: 50%;
        background-color: #4d4f5c;
    }
}
::v-deep .design-options-wrapper {
    .b-dropdown {
        width: 226px;
    }
    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }
}
</style>
