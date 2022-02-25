<template>
    <div class="content position--relative">
        <Nav />
        <Loading :isLoading="isLoading" />
        <div class="my-3">
            <b-col sm="12" class="mb-4">
                <b-row class="justify-content-center">
                    <b-col sm="10">
                        <Search
                            placeholder="Search page..."
                            :searchHandler="searchHandler"
                        />
                    </b-col>
                </b-row>
            </b-col>
            <b-row v-if="numOfPages != 0">
                <b-col md="4" v-for="page in filteredPageList" :key="page._id">
                    <PageCard
                        :name="page.name"
                        :title="page.title"
                        :description="page.description"
                        :image="page.thumbnailUrl"
                        :publishedOn="page.publishedOn"
                        :publishedUrl="page.publishedUrl"
                        :status="page.status"
                        :updatedAt="page.updatedAt"
                        typeOfCard="page"
                        :to="{
                            name: 'PageBuilder/page',
                            params: { pageId: page._id }
                        }"
                        :editAction="editPage.bind(null, page._id)"
                        :deleteAction="deletePage.bind(null, page._id)"
                        :publishAction="
                            publishPage.bind(null, {
                                pageId: page._id,
                                fileName: page.name
                            })
                        "
                        :unpublishAction="
                            unpublishPage.bind(null, {
                                pageId: page._id,
                                fileName: page.name
                            })
                        "
                    />
                </b-col>
            </b-row>
            <b-row v-else class="justify-content-center">
                <small><frown-icon></frown-icon> No pages found</small>
            </b-row>
        </div>
    </div>
</template>

<script>
import PageCard from './components/page_card';
import Search from '../../components/search';
import { FrownIcon } from 'vue-feather-icons';
import { mapGetters } from 'vuex';
import Loading from '../../components/Loading';
import Nav from './components/nav';
export default {
    name: 'my-pages-page',
    components: {
        PageCard,
        Search,
        FrownIcon,
        Loading,
        Nav
    },
    data: () => ({
        searchTerm: '',
        isLoading: false
    }),
    computed: {
        ...mapGetters(['pageList']),
        filteredPageList() {
            const searchTerm = this.searchTerm.toLowerCase();
            function findMatch(page, searchTerm) {
                return (
                    page.name.toLowerCase().includes(searchTerm) ||
                    page.title.toLowerCase().includes(searchTerm) ||
                    page.description.toLowerCase().includes(searchTerm)
                );
            }
            return this.pageList.filter(page => findMatch(page, searchTerm));
        },
        numOfPages() {
            return this.filteredPageList.length;
        }
    },
    methods: {
        searchHandler(e) {
            this.searchTerm = e.target.value;
        },
        editPage(pageId) {
            this.$router.push({
                name: 'PageBuilder/page',
                params: { purpose: 'update', type: 'page', pageId }
            });
        },
        async deletePage(pageId) {
            this.isLoading = true;
            const resp = await this.$store.dispatch(
                'deleteLandingPage',
                pageId
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

        async publishPage({ pageId, fileName }) {
            const payload = {
                landingPageId: pageId,
                fileName,
                folderName: 'page1'
            };

            try {
                this.isLoading = true;
                const result = await this.$store.dispatch(
                    'publishPage',
                    payload
                );
                this.$notify({
                    title: 'Success',
                    text: result,
                    type: 'Success'
                });
            } catch (error) {
                const { status, data } = error.response;

                if (status == 404 && data == 'Customer Resource Not Found') {
                    this.$notify({
                        title: 'Page provisioning',
                        text:
                            'You must provision your page before you can publish it',
                        type: 'info'
                    });
                    this.$router.push({ name: 'PageBuilder/provision-page' });
                }
            } finally {
                this.isLoading = false;
            }
        },
        async unpublishPage({ pageId, fileName }) {
            const payload = {
                landingPageId: pageId,
                fileName,
                folderName: 'page1'
            };

            try {
                this.isLoading = true;
                const result = await this.$store.dispatch(
                    'unpublishPage',
                    payload
                );

                this.$notify({
                    title: 'Success',
                    text: result,
                    type: 'Success'
                });
            } catch (error) {
            } finally {
                this.isLoading = false;
            }
        },
        async getLandingPages() {
            return await this.$store.dispatch('getLandingPages');
        }
    },
    async mounted() {
        try {
            this.isLoading = true;
            const { result } = await this.getLandingPages();

            if (result) {
                this.$store.commit('SET_PAGES', result.result);
            }
        } catch (error) {
        } finally {
            this.isLoading = false;
        }
    }
};
</script>
