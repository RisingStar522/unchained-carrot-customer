<template>
    <div>
        <b-sidebar
            id="sidebar-backdrop"
            title="Details"
            backdrop-variant="dark"
            backdrop
            shadow
            :visible="onSaveSidebarVisibility"
            @change="handleOnSaveSidebarVisibilityChange"
        >
            <div class="px-3 py-2">
                <slot></slot>
            </div>
        </b-sidebar>
    </div>
</template>

<script>
export default {
    name: 'builder-on-save-sidebar',
    props: ['onSaveSidebarVisibility', 'showOnSaveSidebar'],
    methods: {
        handleOnSaveSidebarVisibilityChange(value) {
            this.showOnSaveSidebar(value);
        }
    }
};
</script>
