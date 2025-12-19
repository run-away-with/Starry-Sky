import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import More from '../views/More.vue';
import Start from '../views/Start.vue';
import Profile from '../views/Profile.vue';
import NotFound from '../views/NotFound.vue';

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
    meta: { title: '启动页面' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/planet/:id',
    name: 'Planet',
    component: () => import('../views/Planet.vue'),
    meta: { title: '行星页面' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于我们' }
  },
  {
    path: '/more',
    name: 'More',
    component: More,
    meta: { title: '更多内容' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: '用户资料' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '页面不存在' }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
