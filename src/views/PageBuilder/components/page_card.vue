<template>
    <div>
        <b-card
            no-body
            style="
                margin-bottom: 15px;
                align-items: center;
                background-color: #eaeaea;
            "
        >
            <b-card-body style="padding: 0">
                <div
                    v-if="image"
                    style="width: 224px; height: 227px"
                    class="d-flex flex-center flex-column"
                >
                    <div class="mb-2">
                        <span
                            class="dot mr-2"
                            :class="{
                                active: status === 'published'
                            }"
                        ></span>
                        {{ status | capitalize }}
                    </div>
                    <img
                        style="height: 112px; width: 180px"
                        class="img-thumbnail"
                        :src="image"
                    />
                </div>
            </b-card-body>
        </b-card>
        <div class="rowSpace">
            <div class="w-100">
                <div
                    class="
                        w-100
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-2
                    "
                >
                    <router-link :to="to">
                        <p class="mb-5 card-title">{{ name }}</p>
                    </router-link>
                    <b-dropdown
                        variant="link"
                        size="sm"
                        class="align-self-start"
                        no-caret
                    >
                        <template #button-content>
                            <fa-icon class="text-secondary" icon="ellipsis-h" />
                        </template>
                        <b-dropdown-item-button @click="editAction"
                            >Edit</b-dropdown-item-button
                        >
                        <b-dropdown-item-button @click="deleteAction"
                            >Delete</b-dropdown-item-button
                        >
                    </b-dropdown>
                </div>
                <p class="font-size-0-8 mb-5">{{ subject }}</p>
            </div>
        </div>
        <span class="font-size-0-8"
            >last update: {{ new Date(updatedAt).toDateString() }}</span
        >
        <div class="mt-2">
            <b-btn
                :variant="status === 'published' ? 'outline-brand' : 'brand'"
                @click="handlePublishOrUnpublishAction"
                style="width: 120px; font-size: 14px"
            >
                {{ status === 'published' ? 'Unpublish' : 'Publish' }}
            </b-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'email-card-component',
    components: {},
    computed: {},
    methods: {
        handlePublishOrUnpublishAction() {
            this.toPublishOrToUnpublish === 'Publish'
                ? this.publishAction()
                : this.unpublishAction();
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        updatedAt: {
            type: String,
            required: false
        },
        editAction: {
            type: Function,
            required: true
        },
        deleteAction: {
            type: Function,
            required: true
        },
        to: {
            type: Object,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    filters: {
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
};
</script>

<style lang="css" scoped>
.card-img-top {
    height: 250px !important;
}
.font-size-0-8 {
    font-size: 12px;
}
.rowSpace {
    display: flex;
    flex: 1;
    justify-content: space-between;
}
.card-title {
    font-size: 12px;
    color: #333333;
    font-weight: 700;
    overflow: hidden !important;
    text-overflow: ellipsis;
}
.mb-5 {
    margin-bottom: 0px !important;
}
.flex-center {
    justify-content: center;
    align-items: center;
}
.dot {
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}
.dot.active {
    background-color: green;
}
</style>
