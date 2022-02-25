<template>
    <li class="nav-group" style="width:100%">
        <div :class="'nav-item' + (selected ? ' nav-item--active' : '')">
            <div class="nav-link" v-b-toggle="'slidebar-nav-link-' + nav.id">
                <span class="nav-name">
                    {{ nav.name }}
                    <span
                        @click="deleteReviewFolder"
                        class="nav-arrow text-danger"
                        v-show="children.length === 0"
                        ><fa-icon icon="trash-alt"
                    /></span>
                </span>
                <span class="nav-arrow" v-show="children.length > 0">
                    <fa-icon
                        :icon="
                            collapsed && selected
                                ? 'chevron-up'
                                : 'chevron-down'
                        "
                    />
                </span>
            </div>
        </div>
        <b-collapse
            v-if="children"
            :id="'slidebar-nav-link-' + nav.id"
            @show="toggleCollapse()"
            @hide="collapsed = !collapsed"
            :visible="selected"
            class="nav-menu"
            tag="ul"
        >
            <li
                v-for="item in children"
                :key="item.id"
                :class="
                    'nav-item' +
                        (routerParamsId === item.link.params.id
                            ? ' nav-item--active'
                            : '')
                "
            >
                <router-link tag="a" class="nav-link pl-4" :to="item.link">
                    <span class="nav-name"> - {{ item.name }} </span>
                </router-link>
            </li>
        </b-collapse>
    </li>
</template>
<script>
export default {
    name: 'slidebar-nav-item-component',
    props: ['nav', 'selected', 'children'],
    data() {
        return {
            collapsed: true
        };
    },
    created() {
        this.collapsed = this.selected;
    },
    computed: {
        routerParamsId() {
            return this.$route.params.id;
        }
    },
    watch: {
        selected(val) {
            this.collapsed = val;
        }
    },
    methods: {
        deleteReviewFolder() {
            if (
                window.confirm(
                    'Are you sure you want to delete this review folder? It cannot be undone.'
                )
            ) {
                this.$store
                    .dispatch('deleteReviewFolder', this.nav.id)
                    .then(resp => {
                        this.$notify({
                            title: 'Success',
                            text: `${resp.name} deleted successfully!`,
                            type: 'success'
                        });
                        this.$router.push({ name: 'Reviews' });
                    })
                    .catch(err => {
                        this.$notify({
                            title: err.response.data.name,
                            text: err.response.data.reason,
                            type: 'error'
                        });
                    });
            }
        },
        toggleCollapse() {
            this.collapsed = !this.collapsed;
            this.$parent.$emit('toggleFolder', this.nav.id);
        }
    }
};
</script>
