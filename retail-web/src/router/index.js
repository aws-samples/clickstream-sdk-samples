// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {createRouter, createWebHistory} from 'vue-router'

import AmplifyStore from '@/store/store';

// Load User
// eslint-disable-next-line
getUser().then((_user, error) => {
  if (error) {
    // eslint-disable-next-line
    console.log(error)
  }
})

// Get store user from local storage, making sure session is authenticated
async function getUser() {
  return AmplifyStore.state.user;
}

const Main = () => import('@/public/Main.vue')
const Welcome = () => import('@/public/Welcome.vue')
const Configure = () => import('@/public/Configure.vue')
const ProductDetail = () => import('@/public/ProductDetail.vue')
const CategoryDetail = () => import('@/public/CategoryDetail.vue')
const Live = () => import('@/public/Live.vue')
const Help = () => import('@/public/Help.vue')
const Cart = () => import('@/public/Cart.vue')
const Checkout = () => import('@/public/Checkout.vue')
const Orders = () => import('@/authenticated/Orders.vue')
const ShopperSelectPage = () => import('@/authenticated/ShopperSelectPage.vue')

// Routes
const router = createRouter({
  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      meta: {requiresAuth: false},
    },
    {
      path: '/configure',
      name: 'Configure',
      component: Configure,
      meta: {requiresAuth: false},
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: {requiresAuth: false}
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      props: route => ({discount: route.query.di === "true" || route.query.di === true}),
      meta: {requiresAuth: false}
    },
    {
      path: '/category/:id',
      name: 'CategoryDetail',
      component: CategoryDetail,
      meta: {requiresAuth: false}
    },
    {
      path: '/live',
      name: 'Live',
      component: Live,
      meta: {requiresAuth: false}
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      meta: {requiresAuth: false}
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {requiresAuth: true}
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {requiresAuth: false}
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: {requiresAuth: false}
    },
    {
      path: '/shopper-select',
      name: 'ShopperSelect',
      component: ShopperSelectPage,
      meta: {requiresAuth: true},
    },
    {
      path: '/location',
      name: 'Location',
      component: Location,
      meta: {requiresAuth: true}
    }
  ],
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
});

// Check if we need to redirect to welcome page - if redirection has never taken place and user is not authenticated
// Check For Authentication
router.beforeResolve(async (to, from, next) => {
  AmplifyStore.dispatch('pageVisited', from.fullPath);

  if (!AmplifyStore.state.welcomePageVisited.visited) {
    const user = await getUser();

    if (!user) {
      AmplifyStore.dispatch('welcomePageVisited');
      return next('/welcome');
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await getUser();
    if (!user) {
      return next({
        path: '/auth',
        query: {
          redirect: to.fullPath,
        }
      });
    }
    return next()
  }
  return next()
})

export default router
