<template>
    <b-row :class="{ witherror: novalidation === false }">
        <b-col :lg="sizes.lg[0]" class="no-left-padding">
            <label class="text-brand" :for="label">{{ label }}</label>
        </b-col>
        <b-col :lg="sizes.lg[1]">
            <b-form-input
                v-if="isSelect === false"
                :id="label"
                :type="inputType"
                :placeholder="placeholder"
                :value="value"
                :class="{ 'witherror-input': novalidation === false }"
                @input="onInput"
                :state="typeof error === 'undefined' ? null : false"
            />
            <b-form-select
                v-else
                :id="label"
                :options="options"
                :value="value"
                class="form-control"
                :class="{ 'witherror-input': novalidation === false }"
                @input="onInput"
                :state="typeof error === 'undefined' ? null : false"
            >
                <template #first v-if="placeholder !== ''">
                    <b-form-select-option :value="null" disabled>
                        {{ placeholder }}
                    </b-form-select-option>
                </template>
            </b-form-select>

            <b-form-invalid-feedback :state="typeof error === 'undefined'">
                {{ error }}
            </b-form-invalid-feedback>
        </b-col>
        <slot name="after"></slot>
    </b-row>
</template>

<style scoped lang="scss">
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
export default {
    props: {
        // the parent's variable to store data
        value: [String, Number],
        // vee validate error, generated in parent
        error: {
            type: String
        },
        // render select instead of input
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        // size of the columns
        sizes: {
            type: Object,
            default() {
                return { lg: [2, 4] };
            }
        },
        // whether parent is validating component
        novalidation: {
            type: Boolean,
            default: false
        },
        // self-explanatory props
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        inputType: {
            type: String,
            default: 'text'
        }
    },
    computed: {
        /**
         * Whether to display an input or select element. If options are provided, display a select
         *
         * @type {boolean}
         */
        isSelect() {
            if (this.options.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        /**
         * Gets called when the element value is changed.
         */
        onInput(value) {
            this.$emit('update:value', value);
        }
    }
};
</script>
