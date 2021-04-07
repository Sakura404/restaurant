import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import nameless from '../views/nameless.vue';
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true
        },
        children: [{
            path: '/about',
            name: 'about',
            component: nameless,
        }, {
            path: '/menu',
            name: 'about',
            component: nameless,
        },]
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '*',
        redirect: 'about'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
