import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from "./routes/routes";
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store/store';

Vue.prototype.$http = axios;
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
