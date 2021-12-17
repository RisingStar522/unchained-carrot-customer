<template>
    <div class="subscription">
        <b-card>
            <b-row class="d-flex">
                <b-col>
                    <h5 class="text-primary" style="font-weight: bold">
                        Free Plan
                    </h5>
                    <p class="mb-0">You selected a free plan.</p>
                    <p>
                        Do you want to unlock the full potentital of
                        UnchainedCarrot
                    </p>
                    <b-button variant="primary" class="mt-4 mb-4"
                        >Ask for a demo</b-button
                    >
                </b-col>
                <b-col class="d-flex justify-content-end align-items-center"
                    ><img
                        src="@/assets/images/subscription_image.png"
                        width="175px"
                        height="175px"
                    />
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'subscription-tab',
    data: () => ({}),
    methods: {}
};
</script>

<style lang="scss" scoped></style>
