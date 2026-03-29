import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/overview',
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@views/Overview.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@views/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(to => {
  document.title = `${to.meta.title ?? to.meta.menuLabel ?? 'Not Found'} - 我的应用`;
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    return '/sign-in';
  } else {
    return true;
  }
});

export default router;
