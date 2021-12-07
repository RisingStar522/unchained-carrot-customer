/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../routes';
import { store } from '../store';
import AuthService from '../services/AuthService';

import NProgress from 'nprogress';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(m => m.meta.requiresAuth)) {
        if (to.name) {
            NProgress.start();
        }
        if (!AuthService.isAuthenticated()) {
            return await AuthService.renewTokens()
                .then(() => {
                    if (
                        to.matched.some(m => m.meta.requiredRewards) &&
                        !store.getters.hasRewards
                    ) {
                        return next({
                            name: 'Home'
                        });
                    }
                    return next();
                })
                .catch(() => {
                    return AuthService.login({ target: to.path });
                });
        }
    }
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

Vue.router = router;
