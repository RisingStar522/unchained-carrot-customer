<template>
    <main class="content">
        <div class="container mt-3">
            <div class="
                    d-flex
                    justify-content-between
                    align-items-center
                ">
                <h3 class="page-header">
                    Configure Traits
                </h3>
                <div class="justify-content-end">
                    <b-button
                        type="button"
                        class="mr-4"
                        variant="outline-brand"
                        :to="{ name: 'PersonasList' }"
                        >
                        Cancel and go back
                    </b-button>
                </div>
            </div>
            <div>
                <b-tabs content-class="">
                    <b-tab title="Personal data">
                        <PersonalData></PersonalData>
                    </b-tab>
                    <b-tab title="Reserved traits">
                        <ReservedTraits></ReservedTraits>
                    </b-tab>
                    <b-tab title="Customer traits">
                        <CustomerTraits></CustomerTraits>
                    </b-tab>
                </b-tabs>
            </div>
        </div>
    </main>
</template>

<script>
import CustomerTraits from './components/configureTraits/CustomerTraits.vue';
import PersonalData from './components/configureTraits/PersonalData.vue';
import ReservedTraits from './components/configureTraits/ReservedTraits.vue';

export default {
    name: 'configureTrait',
    components: {
        CustomerTraits,
        PersonalData,
        ReservedTraits
    }
};
</script>

<style lang="scss" scoped>
.page-header {
    margin-top: 0px;
    margin-bottom: 17px;
    color: #2f3380;
    font-size: 20px;
}
</style>
