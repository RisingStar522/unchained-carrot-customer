<template>
    <div class="app-slidebar">
        <div class="header">
            Event Sources
        </div>
        <div class="content">
            <ul class="nav">
                <!-- <SlideBarNavItem
                    v-for="item in reviewFolders"
                    :nav="item"
                    :children="reviewList"
                    :selected="item.id === selectedReviewFolder"
                    :key="item.id"
                /> -->
            </ul>
        </div>
        <div class="footer">
            <b-btn v-b-modal.addSource variant="outline-brand">
                <fa-icon icon="plus-circle" class="mr-1" />Add Sources
            </b-btn>
        </div>

        <Modal modalId="addSource" title="Add Event Source">
            <template v-slot:default>
                <b-row class="m-1">
                    <b-col class="p-0" sm="4">
                        <label><small>Event Source:</small></label>
                    </b-col>
                    <b-col class="p-0" sm="8">
                        <b-form-select
                            id="event-source"
                            name="event-source"
                            v-model="selected"
                            :options="transformActiveIntegrations"
                            class="mb-3"
                            aria-placeholder="select event source"
                        >
                        </b-form-select>
                    </b-col>
                    <small
                        >Not seeing a source? Check that the
                        <i>integration</i> is active</small
                    >
                </b-row>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from '../../views/RewardRules/components/modal';
import { mapGetters } from 'vuex';
export default {
    name: 'slidebar-reward-rules-component',
    components: {
        Modal
    },
    data: () => ({
        options: [{ value: 'Mandrill', text: 'Mandrill' }],
        selected: false
    }),
    computed: {
        ...mapGetters(['activeIntegrations']),
        transformActiveIntegrations() {
            return this.activeIntegrations.map(({ externalSystem }) =>
                this.capitalizeFirstLetter(externalSystem)
            );
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return (
                string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
            );
        }
    }
};
</script>
