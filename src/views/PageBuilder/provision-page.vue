<template>
    <main class="content">
        <div class="container">
            <h3 class="page-header">Provision your pages</h3>

            <div class="row d-flex justify-content-center">
                <b-card> <ProvisionForm /></b-card>
            </div>
        </div>
    </main>
</template>

<script>
import ProvisionForm from './components/provisioning-form';
export default {
    name: 'provision-page',
    components: {
        ProvisionForm
    }
};
</script>
