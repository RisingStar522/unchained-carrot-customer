import Vue from 'vue';
import authService from '../services/AuthService';

Vue.use({
    install(Vue) {
        Vue.prototype.$auth = authService;

        Vue.mixin({
            created() {
                if (this.handleLoginEvent) {
                    authService.addListener(
                        'loginEvent',
                        this.handleLoginEvent
                    );
                }
            },

            destroyed() {
                if (this.handleLoginEvent) {
                    authService.removeListener(
                        'loginEvent',
                        this.handleLoginEvent
                    );
                }
            }
        });
    }
});
