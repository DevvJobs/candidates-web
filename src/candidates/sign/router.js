import authService from '@/candidates/core/services/auth.service';

import Sign from '@/candidates/sign/Sign';
import SignIn from '@/candidates/sign/SignIn';
import SignUp from '@/candidates/sign/SignUp';
import SignLayout from '@/candidates/sign/shared/SignLayout';
import SignMessage from '@/candidates/sign/SignMessage';
import SignVerificationCode from '@/candidates/sign/SignVerificationCode';

export const SIGN_ROUTER = {
  path: '/',
  component: SignLayout,
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem('token')) {
      next({ path: '/profile' });
    } else {
      next();
    }
  },
  children: [
    {
      path: '/',
      component: Sign
    },
    {
      path: 'sign/success-registration',
      component: SignMessage,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('successRegistration')) {
          next({ path: '/' });
        } else {
          next();
        }
        // TODO fix me. Unnecessary next
        next();
      }
    },
    {
      path: 'sign/in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: 'sign/up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: 'sign/verification-code',
      name: 'SignVerificationCode',
      component: SignVerificationCode,
      beforeEnter: (to, from, next) => {
        if (!authService.login_attempt_token) {
          next({ path: '/sign/in' });
        } else {
          next();
        }
      }
    }
  ]
};
