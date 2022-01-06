import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../components/Kanban/index.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
