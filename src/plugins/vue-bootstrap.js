/* ============
 * Vue Bootstrap
 * ============
 *
 * Components for Bootstrap
 *
 * https://bootstrap-vue.js.org
 */

import Vue from 'vue';
import {
    BootstrapVue,
    BIconClipboard,
    BIconInfoCircle,
    BIconSearch
} from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.component('BIconClipboard', BIconClipboard);
Vue.component('BIconInfoCircle', BIconInfoCircle);
Vue.component('BIconSearch', BIconSearch);
