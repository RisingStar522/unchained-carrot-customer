<template>
    <b-modal
        id="deactivate-program"
        centered
        :title="`Deactivate &quot;${program.displayName}&quot;`"
        hide-footer
        @hide="onHide"
    >
        <b-container fluid class="form_numeric_tab-form hidden-edit">
            <b-row>
                <b-col
                    sm="12"
                    class="no-left-padding no-right-padding text-center"
                >
                    <label for="deactivate-name">
                        Please type the name of the program for confirmation
                    </label>
                </b-col>
            </b-row>
            <b-row class="center-flex">
                <b-col sm="10" class="no-right-padding no-left-padding">
                    <div>
                        <b-form-input
                            class="text-center"
                            id="deactivate-name"
                            type="text"
                            v-model="deactivateProgramName"
                            placeholder="name of the program"
                            :state="error ? false : null"
                            aria-describedby="invalid-name"
                            @input="error = false"
                        />
                        <b-form-invalid-feedback id="invalid-name">
                            Input value does not match the name of the program
                        </b-form-invalid-feedback>
                    </div>
                </b-col>
            </b-row>
            <b-row class="center-flex">
                <b-button
                    variant="primary"
                    class="min-width-button"
                    @click="deactivateProgram"
                >
                    Deactivate
                </b-button>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
export default {
    props: {
        program: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            deactivateProgramName: '',
            error: false
        };
    },
    methods: {
        async deactivateProgram() {
            const programName = this.program.displayName;
            if (this.deactivateProgramName === programName) {
                const id = this.program._id;
                try {
                    await this.$store.dispatch('deleteLoyaltyProgram', id);
                    this.$emit('deleted');
                    this.$notify({
                        type: 'success',
                        title: 'Loyalty Program deactivation',
                        text: `Loyalty Program ${programName} was succesfully deactivated`
                    });
                } catch (err) {
                    this.$notify({
                        type: 'danger',
                        title: 'Loyalty Program deactivation',
                        text: 'An error has occured. Please, try again later.'
                    });
                }
                this.$bvModal.hide('deactivate-program');
            } else {
                this.error = true;
            }
        },
        onHide() {
            this.deactivateProgramName = '';
            this.error = false;
        }
    }
};
</script>
