<template>
    <div>
        <b-modal
            id="live-design-modal"
            ref="modal"
            size="xl"
            centered
            header-class="custom-header"
            :hide-footer="true"
        >
            <div class="custom-modal-header">
                <div class="d-flex align-items-center">
                    <img
                        class="default"
                        src="../../../assets/icons/broadcast_default_icon.svg"
                        alt=""
                        width="30px"
                        height="30px"
                    />
                    <span class="ml-2">Live</span>
                </div>
                <div class="ml-5">
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
                </div>
            </div>
            <div class="design-options-wrapper">
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
                                        <div class="participant-level">2</div>
                                        <div class="participant-name">
                                            John Wick
                                        </div>
                                        <div class="participant-ranking">
                                            <fa-icon icon="star" />98
                                        </div>
                                    </div>

                                    <div class="participant-avatar text-center">
                                        <img
                                            :src="
                                                require('../../../assets/images/avatar.png')
                                            "
                                            width="50px"
                                            height="50px"
                                        />
                                        <div class="participant-level">1</div>
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
                                        <div class="participant-level">3</div>
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
                                        <div class="participant-level">2</div>
                                        <div class="participant-name">
                                            John Wick
                                        </div>
                                        <div class="participant-ranking">
                                            <fa-icon icon="star" />98
                                        </div>
                                    </div>

                                    <div class="participant-avatar text-center">
                                        <img
                                            :src="
                                                require('../../../assets/images/avatar.png')
                                            "
                                            width="50px"
                                            height="50px"
                                        />
                                        <div class="participant-level">1</div>
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
                                        <div class="participant-level">3</div>
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
                                        <div class="participant-level">2</div>
                                        <div class="participant-name">
                                            John Wick
                                        </div>
                                        <div class="participant-ranking">
                                            <fa-icon icon="star" />98
                                        </div>
                                    </div>

                                    <div class="participant-avatar text-center">
                                        <img
                                            :src="
                                                require('../../../assets/images/avatar.png')
                                            "
                                            width="50px"
                                            height="50px"
                                        />
                                        <div class="participant-level">1</div>
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
                                        <div class="participant-level">3</div>
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
                            :active="participantsList.indexOf(participant) == 1"
                        />
                    </b-list-group>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Participant from './Participant';
export default {
    name: 'live-modal-component',
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
<style lang="scss" scoped>
::v-deep .custom-header {
    position: relative;
    border: none;
    padding-top: 35px;
}

::v-deep .custom-header .close {
    position: absolute;
    top: 22px;
    right: 22px;
    margin-left: 0;
}

.custom-modal-header {
    position: absolute;
    top: -28px;
    left: 25px;
    display: flex;
    align-items: center;
}

::v-deep .custom-modal-header {
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

::v-deep .design-options-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

::v-deep .preview-screen {
    &.mobile {
        width: auto;
    }
    &.desktop {
        width: 75%;
    }

    .header {
        height: 375px;
    }
    .list-group-item {
        border: none;
    }
}
</style>
