<template>
    <b-container fluid class="condition-row">
        <b-row>
            <b-col lg="3" class="no-left-padding">
                <b-form-select
                    v-model="selected.condition"
                    :options="conditionOptions"
                />
            </b-col>
            <b-col lg="2">
                <b-form-select v-model="selected.is" :options="isOptions" />
            </b-col>
            <b-col lg="3">
                <b-form-select v-model="selected.value" :options="options" />
            </b-col>
            <b-col class="no-left-padding">
                <b-button
                    class="table-action row-action"
                    @click="$emit('deleteMe')"
                >
                    <fa-icon icon="trash-alt" />
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: {
        /**
         * The condition which will be modified
         */
        condition: {
            type: Object,
            default: null
        }
    },
    data() {
        // Check whether the prop is null
        // If it's not, set it's values for select inputs
        let selected = this.condition;
        if (selected === null) {
            selected = {
                condition: 'age',
                value: 'a',
                is: 'is'
            };
        }
        return {
            selected,
            options: [
                { value: 'a', text: '18 - 25' },
                { value: 'b', text: 'Italy' },
                { value: 'c', text: 'France' }
            ],
            isOptions: [
                {
                    value: 'is',
                    text: 'is'
                },
                {
                    value: 'is not',
                    text: 'is not'
                }
            ],
            conditionOptions: [
                {
                    value: 'age',
                    text: 'Age range'
                },
                {
                    value: 'country',
                    text: 'Country'
                },
                {
                    value: 'gender',
                    text: 'Gender'
                }
            ]
        };
    },
    watch: {
        // Whenever new value is selected, update condition prop
        selected: {
            deep: true,
            handler(newSelected) {
                this.$emit('update:condition', newSelected);
            }
        }
    }
};
</script>
