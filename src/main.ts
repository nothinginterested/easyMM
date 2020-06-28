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

import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
// If you want to use ECharts extensions, just import the extension package and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
import 'echarts-gl'

// register component to use
Vue.component('v-chart', ECharts);
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


