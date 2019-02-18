import LegislationLayout from '@/candidates/legislation/shared/LegislationLayout.vue';
import PrivacyPolicy from '@/candidates/legislation/PrivacyPolicy.vue';
import TermsOfService from '@/candidates/legislation/TermsOfService.vue';

export const LEGISLATION_ROUTER = {
  path: '/',
  component: LegislationLayout,
  children: [
    {
      path: 'privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: 'terms-of-service',
      name: 'TermsOfService',
      component: TermsOfService
    }
  ]
};
