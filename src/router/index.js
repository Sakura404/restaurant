import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import order from '../views/order.vue'
import menu from '../views/menu.vue'
import dashboard from '../views/dashboard.vue'
import report from '../views/report.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/123',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '',
                redirect: 'dashboard'
            }, {
                path: 'dashboard',
                name: 'dashboard',
                component: dashboard,
            }, {
                path: 'menu',
                name: 'menu',
                component: menu,
            }, {
                path: 'order',
                name: 'order',
                component: order,
            }, {
                path: 'report',
                name: 'report',
                component: report,
            },]
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '*',
        redirect: 'dashboard'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
