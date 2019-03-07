import Profile from '@/candidates/profile/Profile';
import Layout from '@/candidates/profile/shared/Layout';

import apiPollingService from '@/candidates/profile/api-polling.service';
import { PROFILE_CREATE_ROUTER } from '@/candidates/profile/create/router';
import { PROFILE_DASHBOARD_ROUTER } from '@/candidates/profile/dashboard/router';
import { PROFILE_EDIT_ROUTER } from '@/candidates/profile/edit/router';
import { PROFILE_CHAT_ROUTER } from '@/candidates/profile/chat/router';
import { PROFILE_MOBILE_CHAT_ROUTER } from '@/candidates/profile/chat/router-mobile';
import { PROFILE_TESTS_ROUTER } from '@/candidates/profile/tests/router';
import { PROFILE_CV_UPLOAD_ROUTER } from '@/candidates/profile/cv_upload/router';

import profileGuard from '@/candidates/core/guards/profile';

export const PROFILE_ROUTER = {
  path: 'profile',
  component: Profile,
  beforeEnter: profileGuard,
  children: [
    PROFILE_CREATE_ROUTER,
    {
      path: '',
      component: Layout,
      beforeEnter: (to, from, next) => {
        apiPollingService.startFetchCandidateTimer();
        apiPollingService.startFetchContactsTimer();
        next();
      },
      children: [
        PROFILE_DASHBOARD_ROUTER,
        PROFILE_CHAT_ROUTER,
        PROFILE_MOBILE_CHAT_ROUTER,
        PROFILE_EDIT_ROUTER,
        PROFILE_TESTS_ROUTER,
        PROFILE_CV_UPLOAD_ROUTER
      ]
    }
  ]
};
