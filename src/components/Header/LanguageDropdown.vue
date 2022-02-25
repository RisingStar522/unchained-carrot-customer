<template>
    <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
            <span>{{ chosenLang }}</span>
        </template>
        <b-dropdown-item
            v-for="item in languages"
            :key="item.id"
            @click="changeLocale(item.id)"
            :active="$i18n.locale === item.id"
        >
            {{ item.label }}
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
export default {
    name: 'language-dropdown-component',
    data() {
        const lang = localStorage.getItem('lang');
        return {
            chosenLang: lang == null ? 'EN' : lang.substr(0, 2).toUpperCase(),
            languages: this.$store.state.locales
        };
    },
    methods: {
        changeLocale(lang) {
            const lang_abbrv = lang.substr(0, 2).toUpperCase();
            localStorage.setItem('lang', lang);
            this.$i18n.locale = lang_abbrv;
            this.chosenLang = lang_abbrv;

            if (window) {
                window.history.go(0);
            }
        }
    }
};
</script>
