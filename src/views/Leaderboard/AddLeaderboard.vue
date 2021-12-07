<template>
    <main class="content">
        <div class="container mx-4">
            <h3 class="page-header">
                {{ !leaderboardId ? 'Add' : 'Edit' }} Leaderboard
            </h3>
            <div class="leaderboard-wrapper">
                <b-form>
                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="name">Name</label>
                                </b-col>
                                <b-col sm="6">
                                    <b-form-input
                                        id="input-name"
                                        type="text"
                                        v-model="formData.name"
                                        placeholder="Friends"
                                        required
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3"> </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="loyaltyprogram"
                                        >Loyalty Program</label
                                    >
                                </b-col>
                                <b-col sm="6">
                                    <b-dropdown
                                        :text="selectedLoyaltyprogram"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in loyaltyPrograms"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="
                                                selectedLoyaltyprogram =
                                                    option.value
                                            "
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                                <b-col sm="3"> </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="Referral Program"
                                        >Referral Program</label
                                    >
                                </b-col>
                                <b-col sm="6">
                                    <b-dropdown
                                        :text="selectedReferralprogram"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in referralPrograms"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="
                                                selectedReferralprogram =
                                                    option.value
                                            "
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                                <b-col sm="3"> </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="Quiz">Quiz</label>
                                </b-col>
                                <b-col sm="6">
                                    <b-dropdown
                                        :text="selectedQuiz"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in quizOptions"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="selectedQuiz = option.value"
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                                <b-col sm="3"> </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="Primary Score Type"
                                        >Primary Score Type</label
                                    >
                                </b-col>
                                <b-col sm="6">
                                    <b-dropdown
                                        :text="selectedPrimzryScoreType"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in scoreTypes"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="
                                                selectedPrimzryScoreType =
                                                    option.value
                                            "
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-radio-group
                                        id="primarySortTypes"
                                        v-model="selectedPrimarySortType"
                                        :options="sortTypes"
                                        name="radio-btn-outline"
                                        button-variant="outline-brand"
                                        buttons
                                    ></b-form-radio-group>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="Secondary Score Type"
                                        >Secondary Score Type</label
                                    >
                                </b-col>
                                <b-col sm="6">
                                    <b-dropdown
                                        :text="selectedSecondaryScoreType"
                                        block
                                        variant="outline-primary"
                                        menu-class="w-100"
                                    >
                                        <b-dropdown-item
                                            v-for="option in scoreTypes"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="
                                                selectedSecondaryScoreType =
                                                    option.value
                                            "
                                            >{{ option.text }}</b-dropdown-item
                                        >
                                    </b-dropdown>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-radio-group
                                        id="secondarySortTypes"
                                        v-model="selectedSecondarySortType"
                                        :options="sortTypes"
                                        name="radio-btn-outline"
                                        button-variant="outline-brand"
                                        buttons
                                    ></b-form-radio-group>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="9">
                            <b-row class="my-4">
                                <b-col sm="3">
                                    <label for="Periods">Periods</label>
                                </b-col>
                                <b-col sm="6">
                                    <b-form-input
                                        id="input-name"
                                        type="text"
                                        v-model="formData.periods"
                                        placeholder="Alltime"
                                        required
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3"> </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="3"> </b-col>
                                <b-col sm="6">
                                    <b-row>
                                        <b-col sm="8">
                                            <b-dropdown
                                                :text="selectedPeriodsType"
                                                block
                                                variant="outline-primary"
                                                menu-class="w-100"
                                            >
                                                <b-dropdown-item
                                                    v-for="option in periodsTypes"
                                                    :key="option.value"
                                                    :value="option.value"
                                                    @click="
                                                        selectedPeriodsType =
                                                            option.value
                                                    "
                                                    >{{
                                                        option.text
                                                    }}</b-dropdown-item
                                                >
                                            </b-dropdown>
                                        </b-col>
                                        <b-col sm="4">
                                            <b-button
                                                class="w-100"
                                                type="button"
                                                variant="brand"
                                                >Add</b-button
                                            >
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col sm="3"> </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row class="justify-content-end button-group">
                        <b-button variant="outline-brand">Cancel</b-button>
                        <b-button
                            class="ml-4"
                            variant="brand"
                            :to="{ name: 'LeaderboardSettings' }"
                            >Next: Design</b-button
                        >
                    </b-row>
                </b-form>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'add-leaderboard',
    data() {
        return {
            formData: {
                name: '',
                periods: ''
            },
            selectedLoyaltyprogram: 'n/a',
            selectedReferralprogram: 'Refer a friend',
            selectedQuiz: 'n/a',
            selectedPrimzryScoreType: 'number',
            selectedSecondaryScoreType: 'number',
            selectedPeriodsType: 'Month',
            loyaltyPrograms: [
                {
                    value: 'n/a',
                    text: 'n/a'
                }
            ],
            referralPrograms: [
                {
                    value: 'Refer a friend',
                    text: 'Refer a friend'
                }
            ],
            quizOptions: [
                {
                    value: 'n/a',
                    text: 'n/a'
                }
            ],
            scoreTypes: [
                {
                    value: 'number',
                    text: 'Number'
                },
                {
                    value: 'time',
                    text: 'Time'
                },
                {
                    value: 'date',
                    text: 'Date'
                }
            ],
            periodsTypes: [
                {
                    value: 'Month',
                    text: 'Month'
                },
                {
                    value: 'Week',
                    text: 'Week'
                },
                {
                    value: 'Day',
                    text: 'Day'
                }
            ],
            selectedSecondarySortType: 'desc',
            selectedPrimarySortType: 'asc',
            sortTypes: [
                { text: 'ASC', value: 'asc' },
                { text: 'DESC', value: 'desc' }
            ]
        };
    },
    computed: {
        leaderboardId() {
            return this.$route.params.id;
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    max-width: 100%;
}
label {
    font: normal normal normal 15px/25px;
    letter-spacing: 0px;
    color: #2f3380;
}
::v-deep .leaderboard-wrapper {
    .button-group {
        margin-top: 128px;
        button {
            width: 185px;
        }
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
