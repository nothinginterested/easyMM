import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
import {Button, Select} from 'element-ui';

Vue.config.productionTip = false;
Vue.component('g-button', Button);
Vue.component('Icon', Icon);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


