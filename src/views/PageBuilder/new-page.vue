<template>
    <div class="content">
        <Nav />
        <Loading :isLoading="isLoading" />
        <div class="mt-5">
            <router-link
                :to="{ name: 'PageBuilder/page', params: { templateId: null } }"
            >
                <div id="from-scratch" class="card--page">
                    <div><file-icon></file-icon></div>
                    <p>Create from scratch</p>
                </div>
            </router-link>

            <div class="choice">
                <p class="text-center">Choose a template:</p>
                <b-col sm="12" class="mb-4">
                    <b-row class="justify-content-center">
                        <b-col sm="10">
                            <Search
                                placeholder="Search template..."
                                :searchHandler="searchHandler"
                            />
                        </b-col>
                    </b-row>
                </b-col>

                <div>
                    <div class="text-center" v-if="numOfTemplates == 0">
                        <small
                            ><frown-icon></frown-icon> No templates found</small
                        >
                    </div>
                    <div v-else>
                        <div class="row">
                            <div
                                v-for="template in filteredTemplateList"
                                :key="template._id"
                                class="col-sm-12 col-md-4"
                            >
                                <PageCard
                                    :name="template.name"
                                    :title="template.title"
                                    :description="template.description"
                                    :updatedAt="template.updatedAt"
                                    typeOfCard="template"
                                    :to="{
                                        name: 'PageBuilder/page',
                                        params: { templateId: template._id }
                                    }"
                                    :editAction="
                                        editTemplate.bind(null, template._id)
                                    "
                                    :deleteAction="
                                        deleteTemplate.bind(null, template._id)
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '../../components/Loading';
import { FileIcon, FrownIcon } from 'vue-feather-icons';
import PageCard from './components/page_card';
import Search from '../../components/search';
import Nav from './components/nav';

import { mapGetters } from 'vuex';
export default {
    name: 'page-builder-new-page',
    components: {
        FileIcon,
        FrownIcon,
        PageCard,
        Search,
        Loading,
        Nav
    },
    data: () => ({
        searchTerm: '',
        isLoading: false
    }),
    computed: {
        ...mapGetters(['templateList']),

        filteredTemplateList() {
            const searchTerm = this.searchTerm.toLowerCase();
            function findMatch(template, searchTerm) {
                return (
                    template.name.toLowerCase().includes(searchTerm) ||
                    template.title.toLowerCase().includes(searchTerm) ||
                    template.description.toLowerCase().includes(searchTerm)
                );
            }
            return this.templateList.filter(template =>
                findMatch(template, searchTerm)
            );
        },
        numOfTemplates() {
            return this.filteredTemplateList.length;
        }
    },

    methods: {
        searchHandler(e) {
            this.searchTerm = e.target.value;
        },
        editTemplate(templateId) {
            this.$router.push({
                name: 'PageBuilder/page',
                params: { purpose: 'update', type: 'template', templateId }
            });
        },
        async deleteTemplate(templateId) {
            this.isLoading = true;
            const resp = await this.$store.dispatch(
                'deleteLandingPageTemplate',
                templateId
            );

            if (resp) {
                this.isLoading = false;
                this.$notify({
                    title: 'Success',
                    text: resp.message,
                    type: 'success'
                });
            }
        },
        async getLandingPageTemplates() {
            return await this.$store.dispatch('getLandingPageTemplates');
        }
    },
    async mounted() {
        try {
            this.isLoading = true;
            const { result } = await this.getLandingPageTemplates();
            if (result) {
                this.$store.commit('SET_TEMPLATES', result.result);
            }
        } catch (error) {
        } finally {
            this.isLoading = false;
        }
    }
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
