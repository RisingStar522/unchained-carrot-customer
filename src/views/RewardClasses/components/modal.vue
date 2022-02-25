<template>
    <div>
        <b-modal
            header-border-variant="light"
            :hide-footer="true"
            centered
            :id="modalId"
            size="sm"
        >
            <div class="d-flex flex-column justify-content-center">
                <small class="text-brand text-center">{{ title }} </small>
                <small class="text-secondary text-center mt-2"
                    >{{ modalSubTitle }}
                </small>
            </div>

            <div class="d-flex justify-content-center mt-3">
                <b-btn variant="brand" class="">Delete</b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'reward-class-modal-component',
    data: () => ({}),
    props: {
        modalId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        modalSubTitle: {
            type: String,
            required: false,
        },
    },
};
</script>
