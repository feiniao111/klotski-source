import Vue from 'vue';
import VueRouter from 'vue-router';
import klotski from './klotski.router';

Vue.use(VueRouter)

const routes = [
  ...klotski
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router;
