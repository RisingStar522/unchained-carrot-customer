import Vue from 'vue';
import App from './App.vue';

/* Import Plugins */
import { router } from './plugins/vue-router';
import { i18n } from './plugins/vue-i18n';
import './plugins/vue-bootstrap.js';
import './plugins/vue-fontawesome';
import './plugins/vue-notification';
import './plugins/vue-vee-validate';
import './plugins/vue-material';
import './plugins/vue-upload';
import './plugins/vue-datetime';
import './plugins/auth';
import './plugins/vue-clipboard';

/* Import Service Worker */
import './registerServiceWorker';

/* Import Styles */
import './assets/scss/styles.scss';

/* Import Vuex Store */
import { store } from './store';

import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

import '../node_modules/nprogress/nprogress.css';

Vue.config.productionTip = false;

const vm = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

import FeatureFlipping from 'vue-feature-flipping';

Vue.use(FeatureFlipping);

import { setEnabledFeatures } from 'vue-feature-flipping';

if (!localStorage.getItem('featureMode')) {
    localStorage.setItem('featureMode', 'Prod');
    setEnabledFeatures(
        vm.$store.state.allFeatureFlags[localStorage.getItem('featureMode')]
    );
} else {
    setEnabledFeatures(
        vm.$store.state.allFeatureFlags[localStorage.getItem('featureMode')]
    );
}
