import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Vue from 'vue';
import PageNotFound from '@/views/PageNotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home as unknown as Vue.Component,
  },
  {
    path: '/debug',
    name: 'Debug',
    component: () => import(/* webpackChunkName: "about" */ '../views/Debug.vue'),
  },
  {
    path: '/sheet',
    name: 'Sheet',
    component: () => import(/* webpackChunkName: "sheet" */ '../views/Sheet.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
