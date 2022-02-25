<template>
    <div class="content">
        <Nav />
        <Loading :isLoading="isLoading" />
        <div class="row">
            <router-link
                v-for="(item, index) in templates"
                :key="index"
                class="col-3 mt-5"
                :to="{
                    name: 'EmailBuilder/builder',
                    params: {
                        templateId: null,
                        templateType: item.templateType,
                    },
                }"
            >
                <b-card
                    :title="item.title"
                    :img-src="item.image"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem"
                    class="mb-2"
                >
                </b-card>
            </router-link>
        </div>
    </div>
</template>

<script>
import Loading from '../../components/Loading';
import Nav from './components/nav';

import { mapGetters } from 'vuex';
export default {
    name: 'email-builder-templates-page',
    components: {
        Loading,
        Nav,
    },
    data: () => ({
        searchTerm: '',
        isLoading: false,
        templates: [
            {
                title: 'Base m bee',
                templateType: 'base-m-bee.json',
                image: require('./templates/base-m-bee.jpg'),
            },
            {
                title: 'Base newsletter',
                templateType: 'base-newsletter.json',
                image: require('./templates/base-newsletter.jpg'),
            },
            {
                title: 'Base one column',
                templateType: 'base-one-column.json.json',
                image: require('./templates/base-one-column.jpg'),
            },
            {
                title: 'Base Promo',
                templateType: 'base-promo.json',
                image: require('./templates/base-promo.jpg'),
            },
            {
                title: 'M Bee',
                templateType: 'm-bee.json',
                image: require('./templates/m-bee.jpg'),
            },
            {
                title: 'Newsletter',
                templateType: 'newsletter.json',
                image: require('./templates/newsletter.jpg'),
            },
            {
                title: 'One column',
                templateType: 'one-column.json',
                image: require('./templates/one-column.jpg'),
            },
            {
                title: 'Promo',
                templateType: 'promo.json',
                image: require('./templates/promo.jpg'),
            },
        ],
    }),
    computed: {
        ...mapGetters(['emailTemplates']),

        filteredEmailTemplates() {
            const searchTerm = this.searchTerm.toLowerCase();
            function findMatch(template, searchTerm) {
                return (
                    template.name.toLowerCase().includes(searchTerm) ||
                    template.subject.toLowerCase().includes(searchTerm) ||
                    template.description.toLowerCase().includes(searchTerm)
                );
            }
            return this.emailTemplates.filter((template) =>
                findMatch(template, searchTerm)
            );
        },
        numOfTemplates() {
            return this.filteredEmailTemplates.length;
        },
    },

    methods: {
        searchHandler(e) {
            this.searchTerm = e.target.value;
        },
        editTemplate(templateId) {
            this.$router.push({
                name: 'EmailBuilder/builder',
                params: { purpose: 'update', templateId },
            });
        },
        async deleteTemplate(templateId) {
            this.isLoading = true;
            const resp = await this.$store.dispatch(
                'deleteEmailTemplate',
                templateId
            );

            if (resp) {
                this.isLoading = false;
                this.$notify({
                    title: 'Success',
                    text: resp.message,
                    type: 'success',
                });
            }
        },
        async getEmailTemplates() {
            return await this.$store.dispatch('getEmailTemplates');
        },
    },
    async mounted() {
        try {
            this.isLoading = true;
            const templatesList = await this.getEmailTemplates();

            if (templatesList) {
                this.$store.commit('SET_TEMPLATES', templatesList);
            }
        } catch (error) {
            // this.$notify({
            //     title: 'Error',
            //     text: error.message,
            //     type: 'error'
            // });
        } finally {
            this.isLoading = false;
        }
    },
};
</script>

<style scoped>
.container {
    margin: 2rem;
}
#from-scratch {
    border: 1px solid #ccc;
    width: 10rem;
    height: 10rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 0.8rem;
    text-align: center;
    transition: all 0.2s;
}

.choice {
    margin-top: 4rem;
}
</style>
