<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Select a template</h5>
            <a @click="editVisible = !editVisible">{{
                editVisible ? 'Close' : 'Edit'
            }}</a>
        </div>
        <transition name="fadeHeight">
            <b-container
                fluid
                class="form_numeric_tab-form hidden-edit"
                v-if="editVisible"
            >
                <b-row>
                    <b-col sm="4" class="no-left-padding">
                        <div class="input-with-icon">
                            <b-form-input placeholder="Search Template" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                            >
                                <defs>
                                    <clipPath id="a">
                                        <rect
                                            width="16"
                                            height="16"
                                            fill="none"
                                        />
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)">
                                    <path
                                        d="M12.7,11.23a6.777,6.777,0,0,0,1.4-4.174A7.02,7.02,0,0,0,7.1,0,7.105,7.105,0,0,0,0,7.056a7.105,7.105,0,0,0,7.1,7.056,6.667,6.667,0,0,0,4.2-1.391l3,2.981a.971.971,0,0,0,1.4,0,.957.957,0,0,0,0-1.391Zm-5.6.8A5.022,5.022,0,0,1,2,7.056a5.1,5.1,0,0,1,10.2,0A5.022,5.022,0,0,1,7.1,12.025Z"
                                    />
                                </g>
                            </svg>
                        </div>
                    </b-col>
                    <b-col sm="3" class="no-left-padding">
                        <b-form-select v-model="selected" :options="options" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        sm="12"
                        class="no-left-padding no-right-padding template_grid"
                        v-if="selected === 'layouts'"
                    >
                        <template-grid-item
                            v-for="layout in layoutTemplates"
                            :key="`layout-${layout.id}`"
                            :item="layout"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        class="no-left-padding no-right-padding template_grid"
                        v-else
                    >
                        <template-grid-item
                            v-for="layout in savedTemplates"
                            :key="`layout-${layout.id}`"
                            :item="layout"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="no-right-padding text-right">
                        <b-button
                            variant="primary"
                            class="min-width-button"
                            @click="nextTab"
                        >
                            Next
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </transition>
    </b-card>
</template>

<style lang="scss" scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 500px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>

<script>
import TemplateGridItem from './parts/TemplateGridItem.vue';

export default {
    components: { TemplateGridItem },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editVisible: false,
            selected: 'layouts',
            options: [
                { value: 'layouts', text: 'Layouts' },
                { value: 'saved', text: 'Saved templates' }
            ],
            layoutTemplates: [
                {
                    id: 1,
                    image: require('@/assets/images/emailcampaign/mailtemplates/one_column.svg'),
                    title: 'One column'
                },
                {
                    id: 2,
                    image: require('@/assets/images/emailcampaign/mailtemplates/standard.svg'),
                    title: 'Standard'
                },
                {
                    id: 3,
                    image: require('@/assets/images/emailcampaign/mailtemplates/newsletter.svg'),
                    title: 'Newsletter'
                },
                {
                    id: 4,
                    image: require('@/assets/images/emailcampaign/mailtemplates/promotional.svg'),
                    title: 'Promotional'
                },
                {
                    id: 5,
                    image: '',
                    title: 'Blank'
                }
            ],
            savedTemplates: [
                {
                    id: 10,
                    image: require('@/assets/images/emailcampaign/mailtemplates/template.png'),
                    title: 'My summer sale'
                },
                {
                    id: 11,
                    image: require('@/assets/images/emailcampaign/mailtemplates/template.png'),
                    title: 'My summer sale'
                },
                {
                    id: 12,
                    image: require('@/assets/images/emailcampaign/mailtemplates/template.png'),
                    title: 'My summer sale'
                },
                {
                    id: 13,
                    image: require('@/assets/images/emailcampaign/mailtemplates/template.png'),
                    title: 'My summer sale'
                },
                {
                    id: 14,
                    image: require('@/assets/images/emailcampaign/mailtemplates/template.png'),
                    title: 'My summer sale'
                }
            ]
        };
    },
    watch: {
        open: {
            immediate: true,
            handler(newOpen) {
                if (newOpen === true) {
                    this.editVisible = true;
                    this.$emit('update:open', false);
                }
            }
        }
    },
    methods: {
        nextTab() {
            this.editVisible = false;
            this.$emit('next-tab');
        }
    }
};
</script>
