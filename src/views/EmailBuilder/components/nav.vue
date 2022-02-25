<template>
    <div class="d-flex justify-content-center my-5">
        <div class="links d-flex">
            <router-link
                :class="pageName === 'EmailBuilder' && 'active'"
                :to="{ name: 'EmailBuilder' }"
                >Recent activity</router-link
            >

            <router-link
                :class="pageName === 'EmailBuilder/templates' && 'active'"
                :to="{ name: 'EmailBuilder/templates' }"
                >My templates</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'nav-email-builder',
    computed: {
        pageName() {
            return this.$route.name;
        }
    }
};
</script>

<style>
.links {
    box-shadow: 0px 6px 10px 1px #ccc;
    width: 50%;
    text-align: center;
}
.links a,
.links a:link {
    display: block;
    width: 100%;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
}

.links a:first-child {
    border-right: 1px solid #ccc;
}

.links a:hover {
    color: #fff !important;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0px 15px 30px -7px #2f3380;
    text-align: center;

    background: #2f3380; /* Old browsers */
}

.active {
    color: #fff !important;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0px 15px 30px -7px #2f3380;
    text-align: center;

    background: #2f3380; /* Old browsers */
}
</style>
