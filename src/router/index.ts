import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import EditLabels from '@/views/EditLabels.vue';
import Login from '@/views/Login.vue';
import Type from '@/components/Record.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

    {
        path: '/money',
        component: Money
    }, {
        path: '/labels',
        component: Labels
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '/user/:id',
        component: EditLabels
    },
    {
        path: '/login',
        component: Login
    }, {
        path: '/type',
        component: Type
    },
    {
        path: '/',
        redirect: '/money'
    }
];

const router = new VueRouter({
    routes
});

export default router;
