<template>
    <div>
        <b-row>
            <b-col lg="3" class="no-left-padding">
                <label class="text-brand">{{ label }}</label>
            </b-col>
            <b-col lg="4" class="witherror-input">
                <b-form-tags
                    id="tags-with-dropdown"
                    v-model="tagsArray"
                    no-outer-focus
                >
                    <template v-slot="{ tags, disabled }">
                        <ul
                            v-if="tags.length > 0"
                            class="list-inline d-inline-block"
                        >
                            <li
                                v-for="(tag, index) in tags"
                                :key="tag"
                                class="list-inline-item"
                            >
                                <b-form-tag
                                    @remove="onRemoveTag(index)"
                                    :title="tag"
                                    :disabled="disabled"
                                    variant="info"
                                    >{{ tag }}</b-form-tag
                                >
                            </li>
                        </ul>

                        <b-dropdown
                            size="sm"
                            variant="transparent"
                            block
                            menu-class="w-100"
                        >
                            <template #button-content>
                                {{ placeholder }}
                            </template>
                            <b-dropdown-form @submit.stop.prevent="() => {}">
                                <b-form-group
                                    label-for="tag-search-input"
                                    label-cols-md="auto"
                                    class="mb-0"
                                    label-size="sm"
                                    :disabled="disabled"
                                >
                                    <b-form-input
                                        v-model="search"
                                        id="tag-search-input"
                                        type="search"
                                        placeholder="Search..."
                                        size="sm"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button
                                v-for="option in availableOptions"
                                :key="option.id.toString()"
                                @click="onOptionClick({ option })"
                            >
                                {{ option.value }}
                            </b-dropdown-item-button>
                            <b-dropdown-text
                                v-if="availableOptions.length === 0"
                            >
                                There are no personas available to select
                            </b-dropdown-text>
                        </b-dropdown>
                    </template>
                </b-form-tags>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Select items...'
        },
        value: {
            type: Array,
            default: () => []
        },
        options: {
            type: Array,
            default: () => [
                { id: 0, value: 'Apple' },
                { id: 1, value: 'Orange' },
                { id: 2, value: 'Banana' },
                { id: 3, value: 'Lime' },
                { id: 4, value: 'Peach' },
                { id: 5, value: 'Chocolate' }
            ]
        }
    },
    data() {
        return {
            search: ''
        };
    },
    computed: {
        tagsArray() {
            const value = this.value;
            return value.map(item => item.value);
        },
        criteria() {
            // Compute the search criteria
            return this.search.trim().toLowerCase();
        },
        availableOptions() {
            const criteria = this.criteria;
            // Filter out already selected options
            const options = this.options.filter(
                opt => this.value.indexOf(opt) === -1
            );
            if (criteria) {
                // Show only options that match criteria
                return options.filter(
                    opt => opt.value.toLowerCase().indexOf(criteria) > -1
                );
            }
            // Show all options available
            return options;
        },
        searchDesc() {
            if (this.criteria && this.availableOptions.length === 0) {
                return 'There are no steps matching your search criteria';
            }
            return '';
        }
    },
    methods: {
        onOptionClick({ option }) {
            this.value.push(option);
            this.search = '';
        },
        onRemoveTag(index) {
            this.value.splice(index, 1);
        }
    }
};
</script>
