<template>
    <b-nav-item-dropdown right no-caret class="alert-dropdown">
        <template slot="button-content">
            <fa-icon icon="bell" />
            <b-badge pill variant="danger" v-if="alerts.length">
                {{ alerts.length }}
            </b-badge>
        </template>
        <b-dropdown-header tag="div">
            <strong>Notifications</strong>
        </b-dropdown-header>
        <AlertDropdownItem
            v-for="alert in alerts"
            :key="alert.id"
            :alert="alert"
        />
        <b-dropdown-item v-if="alerts.length === 0" class="text-center">
            There are no notifications
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
import AlertDropdownItem from './AlertDropdownItem';

export default {
    name: 'alert-dropdown-component',
    components: {
        AlertDropdownItem
    },
    computed: {
        alerts() {
            return [
                {
                    title: 'Test alert',
                    description: 'Long description of alert',
                    id: 123,
                    created_at: new Date().toISOString()
                }
            ];
        }
    }
};
</script>
