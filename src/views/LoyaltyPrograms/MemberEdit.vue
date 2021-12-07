<template>
    <div class="content fullheight-container">
        <div class="py-4">
            <h4 class="text-brand">Edit Loyalty Program Member</h4>
        </div>
        <b-form
            class="fullheight-container__body with-buttons"
            data-vv-scope="loyaltyProgramMemberForm"
        >
            <b-container class="form_numeric_tab-form hidden-edit" fluid>
                <b-row class="witherror">
                    <b-col sm="2">
                        <label for="dname">Display name</label>
                    </b-col>
                    <b-col sm="4">
                        <b-form-input
                            id="dname"
                            name="dname"
                            type="text"
                            placeholder="Display name"
                            v-model="member.displayName"
                            v-validate="'required'"
                            class="witherror-input"
                            :state="
                                typeof errors.first(
                                    'loyaltyProgramMemberForm.dname'
                                ) === 'undefined'
                                    ? null
                                    : false
                            "
                        />
                        <b-form-invalid-feedback
                            :state="
                                typeof errors.first(
                                    'loyaltyProgramMemberForm.dname'
                                ) === 'undefined'
                            "
                        >
                            Display name is required
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="witherror">
                    <b-col sm="2">
                        <label for="level-select">Level</label>
                    </b-col>
                    <b-col sm="4">
                        <b-form-select
                            id="level-select"
                            name="levelselect"
                            v-model="member.levels"
                            :options="levelOptions"
                            v-validate="'required'"
                            class="witherror-input"
                            :state="
                                typeof errors.first(
                                    'loyaltyProgramMemberForm.levelselect'
                                ) === 'undefined'
                                    ? null
                                    : false
                            "
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose level
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                        <b-form-invalid-feedback
                            :state="
                                typeof errors.first(
                                    'loyaltyProgramMemberForm.levelselect'
                                ) === 'undefined'
                            "
                        >
                            Display name is required
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="witherror">
                    <b-col sm="2">
                        <label for="com-select">Communication</label>
                    </b-col>
                    <b-col sm="4">
                        <b-form-select
                            id="com-select"
                            name="comselect"
                            v-model="member.preferredCommunicationMethod"
                            :options="comOptions"
                            v-validate="'required'"
                            class="witherror-input"
                            :state="
                                typeof errors.first(
                                    'loyaltyProgramMemberForm.comselect'
                                ) === 'undefined'
                                    ? null
                                    : false
                            "
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose communication
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                        <b-form-invalid-feedback
                            :state="
                                typeof errors.first(
                                    'loyaltyProgramMemberForm.comselect'
                                ) === 'undefined'
                            "
                        >
                            Display name is required
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="2" class="self-center">
                        Status
                    </b-col>
                    <b-col sm="4">
                        <!-- <b-button variant="primary">
                            Set active
                        </b-button> -->
                        <b-button
                            :pressed.sync="statusToggle"
                            :variant="statusToggle ? 'primary' : ''"
                        >
                            {{ statusToggle ? 'Active' : 'Inactive' }}
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>

            <div class="fullheight-container__bottom-buttons absolute-buttons">
                <b-button
                    variant="outline-primary"
                    class="min-width-button"
                    size="lg"
                    @click="$router.push('/loyalty-programs')"
                >
                    Cancel
                </b-button>
                <b-button
                    variant="primary"
                    class="min-width-button"
                    size="lg"
                    @click="validateForm"
                >
                    Create
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<style lang="scss">
.full-width {
    width: 100%;
}
.levels-wrapper {
    background-color: #fff;
    max-height: 125px;
    height: 125px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #ced4da;
    overflow: auto;
    margin-bottom: 1rem;

    &_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            margin: 0;
        }
    }
}
.witherror-input {
    margin-bottom: 16px;
    &.is-invalid {
        margin-bottom: 0;
    }
}
.invalid-feedback {
    line-height: 1;
}
.row.witherror + .row {
    margin-top: 0.5rem;
    margin-top: calc(1.5rem - 16px);
}
.fullheight-container__body {
    padding-bottom: 60px;
    position: relative;
}
.fullheight-container__bottom-buttons.absolute-buttons {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'LoyaltyProgramsMemberEdit',
    data() {
        return {
            statusToggle: false,
            programId: this.$route.params.programId,
            id: this.$route.params.id,
            member: {
                displayName: '',
                levels: null,
                preferredCommunicationMethod: null,
                status: 'ACTIVE'
            },
            comOptions: [
                { value: 'EMAIL', text: 'Email' },
                { value: 'WHATSAPP', text: 'WhatsApp' },
                { value: 'SMS', text: 'SMS' }
            ]
        };
    },
    created() {
        this.$store.dispatch('getLoyaltyProgramLevels', this.programId);
        if (this.edit === true) {
            this.$store.dispatch('getLoyaltyProgram', this.id);
        }
    },
    computed: {
        ...mapGetters(['loyaltyProgramLevels']),
        levelOptions() {
            return this.loyaltyProgramLevels.map((item, index) => {
                return {
                    id: item.id,
                    value: item,
                    text: item.levelName
                };
            });
        },
        edit() {
            const id = this.id;
            return typeof id === 'undefined' ? false : true;
        }
    },
    methods: {
        async validateForm() {
            const valid = await this.$validator.validateAll(
                'loyaltyProgramMemberForm'
            );
            if (valid) {
                await this.createMember();
            }
        },
        async createMember() {
            const programId = this.programId;
            const loyaltyProgramMember = this.member;
            loyaltyProgramMember.status = this.statusToggle ? true : false;
            try {
                await this.$store.dispatch('createLoyaltyProgramMember', {
                    programId,
                    loyaltyProgramMember
                });
                this.$notify({
                    type: 'success',
                    title: 'Member creation',
                    text: `Member ${loyaltyProgramMember.displayName} was succesfully created`
                });
                this.$router.push({ name: 'LoyaltyPrograms' });
            } catch (err) {
                this.$notify({
                    type: 'danger',
                    title: 'Member creation',
                    text: 'An error has occured. Please, try again later.'
                });
            }
        }
    }
};
</script>
