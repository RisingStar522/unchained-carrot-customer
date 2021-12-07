<template>
    <b-dropdown-item>
        <div class="small">
            <span class="text-muted">{{ alert.created_at.split('T')[0] }}</span>
            <a
                class="link text-danger float-right"
                @click.stop.prevent="deleteAlert"
                :data-id="alert.id"
            >
                Delete
            </a>
        </div>
        <div>
            <div class="text-truncate font-weight-bold">
                {{ alert.title }}
            </div>
            <div class="small text-truncate text-muted">
                {{ alert.description }}
            </div>
        </div>
    </b-dropdown-item>
</template>
<script>
export default {
    name: 'alert-dropdown-item-component',
    props: ['alert'],
    methods: {
        deleteAlert() {
            this.$store.dispatch('user/deleteAlert', this.alert.id);
        }
    }
};
</script>
