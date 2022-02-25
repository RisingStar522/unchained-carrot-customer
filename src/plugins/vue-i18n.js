/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/locale';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'en-US',
    fallbackLocale: 'en-US',
    messages
});

export default {
    i18n
};

Vue.filter('translate', (value, arg) => {
    return i18n.t(value, i18n.locale, arg);
});

Vue.filter('uppercase', value => {
    return value.toUpperCase();
});
