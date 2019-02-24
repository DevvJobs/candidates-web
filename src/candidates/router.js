import Vue from 'vue';
import Router from 'vue-router';

import Candidates from '@/candidates/Candidates';
import NotFound from '@/candidates/404/NotFound';

import {
  SIGN_ROUTER
} from '@/candidates/sign/router';
import {
  PROFILE_ROUTER
} from '@/candidates/profile/router';
import {
  LEGISLATION_ROUTER
} from '@/candidates/legislation/router';
import {
  UNSUBSCRIBE_ROUTER
} from '@/candidates/unsubscribe/router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: '*',
    redirect: {
      name: 'NotFound'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/',
    component: Candidates,
    children: [
      PROFILE_ROUTER,
      SIGN_ROUTER,
      LEGISLATION_ROUTER,
      UNSUBSCRIBE_ROUTER
    ]
  }
  ]
});

export default router;
