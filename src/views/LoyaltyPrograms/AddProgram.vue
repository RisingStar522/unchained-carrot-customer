<template>
    <div class="content fullheight-container">
        <div class="py-4">
            <h4 class="text-brand">
                {{ edit ? 'Edit' : 'Add' }} Loyalty Program
            </h4>
        </div>
        <b-form
            @submit.prevent="validateProgramForm"
            class="fullheight-container__body with-buttons"
            data-vv-scope="loyaltyProgramForm"
        >
            <b-container class="form_numeric_tab-form hidden-edit" fluid>
                <form-input-element
                    :value.sync="program.displayName"
                    v-model="program.displayName"
                    label="Display name"
                    placeholder="Display name"
                    name="name"
                    v-validate="'required'"
                    :error="errors.first('loyaltyProgramForm.name')"
                />

                <form-input-element
                    :value.sync="program.description"
                    v-model="program.description"
                    label="Description"
                    placeholder="Description"
                    name="description"
                    v-validate="'required'"
                    :error="errors.first('loyaltyProgramForm.description')"
                />

                <b-row>
                    <b-col sm="2" class="self-center">
                        <label for="description">Start date</label>
                    </b-col>
                    <b-col sm="2">
                        <datetime
                            format="dd/MM/yyyy"
                            placeholder="DD/MM/YYYY"
                            v-model="program.startDate"
                            type="date"
                        ></datetime>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="2" class="self-center">
                        <label for="description">Expiration date</label>
                    </b-col>
                    <b-col sm="2">
                        <datetime
                            format="dd/MM/yyyy"
                            placeholder="DD/MM/YYYY"
                            v-model="program.expirationDate"
                            type="date"
                        ></datetime>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="2">
                        <label>Levels</label>
                    </b-col>
                    <b-col sm="4">
                        <div class="levels-wrappers">
                            <div
                                class="levels-wrappers_items mt-2 rounded-full"
                                :class="index !== 0 ? 'ml-3' : null"
                                v-for="(level, index) in program.levels"
                                :key="`level-${index}`"
                            >
                                <p class="mr-0">{{ level.levelName }}</p>
                                <b-button class="table-actions">
                                    <img
                                        @click="removeLevel(index)"
                                        src="@/assets/icons/emailtemplates/TrashIcon.svg"
                                        alt="delete icon"
                                        srcset=""
                                    />
                                </b-button>
                            </div>
                        </div>

                        <b-container
                            class="form_numeric_tab-form hidden-edit"
                            fluid
                        >
                            <b-row>
                                <b-col sm="8" class="no-left-padding">
                                    <b-form-input
                                        id="dname"
                                        type="text"
                                        placeholder="Add level"
                                        v-model="newLevelName"
                                        @keydown.enter="addLevel"
                                    />
                                </b-col>
                                <b-col
                                    sm="4"
                                    class="no-right-padding no-left-padding"
                                >
                                    <b-button
                                        variant="primary"
                                        class="full-width"
                                        :disabled="newLevelName.length < 1"
                                        type="button"
                                        @click="addLevel"
                                    >
                                        Add
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-col>
                </b-row>

                <form-input-element
                    :options="statusOptions"
                    :value.sync="program.status"
                    placeholder="Choose status"
                    label="Status"
                    :novalidation="true"
                />
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
                    type="submit"
                >
                    {{ edit ? 'Update' : 'Create' }}
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FormInputElement from '@/components/Forms/FormInputElement.vue';
import { Validator } from 'vee-validate';

export default {
    components: {
        FormInputElement
    },
    data() {
        return {
            id: this.$route.params.id,
            newLevelName: '',
            statusOptions: [
                { value: 'INACTIVE', text: 'Inactive' },
                { value: 'ACTIVE', text: 'Active' }
            ],
            program: {
                displayName: '',
                description: '',
                startDate: null,
                expirationDate: null,
                levels: [],
                status: 'ACTIVE'
            }
        };
    },
    created() {
        if (this.edit === true) {
            this.$store.dispatch('getLoyaltyProgram', this.id);
        }
    },
    mounted() {
        const dict = {
            en: {
                messages: {
                    required: field => `The ${field} is required`
                }
            }
        };

        Validator.localize(dict);
    },
    computed: {
        ...mapGetters(['loyaltyProgram']),
        edit() {
            const id = this.id;
            return typeof id === 'undefined' ? false : true;
        }
    },
    watch: {
        loyaltyProgram(newLoyaltyProgram) {
            if (newLoyaltyProgram) {
                this.program = JSON.parse(JSON.stringify(newLoyaltyProgram));
            }
        }
    },
    methods: {
        addLevel(e) {
            e.preventDefault();
            const levelName = this.newLevelName;
            if (levelName !== '') {
                const newLevel = {
                    level: this.program.levels.length,
                    levelName
                };
                this.program.levels.push(newLevel);
                this.newLevelName = '';
            }
        },
        removeLevel(index) {
            this.program.levels.splice(index, 1);
            this.program.levels = this.program.levels.map((value, index) => {
                value.level = index;
                return value;
            });
        },
        async validateProgramForm() {
            const valid = await this.$validator.validateAll(
                'loyaltyProgramForm'
            );
            if (valid === true) {
                if (this.edit === false) {
                    await this.createProgram();
                } else {
                    await this.updateProgram();
                }
            }
        },
        async createProgram() {
            const newProgram = this.program;
            try {
                await this.$store.dispatch('addLoyaltyProgram', newProgram);
                this.$notify({
                    type: 'success',
                    title: 'Loyalty Program creation',
                    text: `Loyalty Program ${newProgram.displayName} was succesfully created`
                });
                this.$router.push({ name: 'LoyaltyPrograms' });
            } catch (err) {
                this.$notify({
                    type: 'danger',
                    title: 'Loyalty Program creation',
                    text: 'An error has occured. Please, try again later.'
                });
            }
        },
        async updateProgram() {
            const updatedProgram = this.program;
            const programId = this.id;
            try {
                await this.$store.dispatch('updateLoyaltyProgram', {
                    programId,
                    data: updatedProgram
                });
                this.$notify({
                    type: 'success',
                    title: 'Loyalty Program update',
                    text: `Loyalty Program ${updatedProgram.displayName} was succesfully updated`
                });
                this.$router.push({ name: 'LoyaltyPrograms' });
            } catch (err) {
                this.$notify({
                    type: 'danger',
                    title: 'Loyalty Program update',
                    text: 'An error has occured. Please, try again later.'
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.rounded-full {
    border-radius: 50px;
}

.levels-wrappers {
    background-color: #fff;
    max-height: 125px;
    height: 125px;
    max-width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ced4da;
    overflow: auto;
    margin-bottom: 1rem;

    display: flex;
    align-items: start;
    flex-wrap: wrap;

    &_items {
        display: flex;
        align-items: center;
        background: #f4f4f4;
        padding-left: 0.75rem;
        // justify-content: space-between;
        p {
            margin: 0;
        }
    }
}

.table-actions {
    padding: 5px;
    background: transparent !important;
    outline: none !important;
    border: 0;
    width: 34px;
    img {
        width: auto;
        height: 24px;
        // margin-bottom: 2px;
    }
    // svg {
    //     font-size: 1rem;
    //     color: #4d4f5c;
    //     margin-right: 0 !important;
    // }
    // &:hover,
    // &:focus,
    // &:active {
    //     svg {
    //         color: $sidebar-second-color;
    //     }
    // }
}
</style>
