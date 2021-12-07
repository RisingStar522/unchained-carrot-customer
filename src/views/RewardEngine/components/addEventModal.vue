<template>
    <div>
        <b-modal
            header-border-variant="light"
            footer-border-variant="light"
            centered
            id="addEvent"
            size="xl"
            title="Incoming event"
        >
            <b-form inline>
                <label class="sr-only" for="event">EVENT</label>
                <b-input
                    id="event"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Insert event name"
                ></b-input>

                <label class="sr-only" for="event">TYPE</label>
                <b-input
                    id="type"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Insert type"
                ></b-input>

                <label class="sr-only" for="event">SOURCE</label>
                <b-input
                    id="source"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Insert source"
                ></b-input>

                <label class="sr-only" for="event">PROJECT</label>
                <b-input
                    id="project"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Insert name of the project"
                ></b-input>
            </b-form>
            <div class="my-5">
                <p class="text-brand">Rule</p>
                <b-form-textarea
                    id="conditions"
                    v-model="conditions"
                    placeholder="Conditions"
                    rows="6"
                    max-rows="6"
                ></b-form-textarea>

                <b-form-textarea
                    id="outgoingEvent"
                    v-model="outgoingEvent"
                    placeholder="Outgoing event"
                    rows="6"
                    max-rows="6"
                    class="my-3"
                ></b-form-textarea>
            </div>
            <template v-slot:modal-footer="{ hide }">
                <div class="d-flex w-100">
                    <b-btn
                        class="px-5 py-2 justify-self-start"
                        variant="outline-brand"
                        @click="hide()"
                        >Back</b-btn
                    >
                    <span class="ml-auto">
                        <b-btn class="px-5 py-2" variant="outline-brand mr-2"
                            >View Code</b-btn
                        >
                        <b-btn variant="brand" class="px-5 py-2">Save</b-btn>
                    </span>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'add-event-modal-component',
    data: () => ({
        conditions: '',
        outgoingEvent: ''
    })
};
</script>
