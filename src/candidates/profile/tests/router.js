import Test from '@/candidates/profile/tests/Tests';
import CandidateTest from '@/candidates/profile/tests/candidate/CandidateTests';
import AllTests from '@/candidates/profile/tests/all/AllTests';
import ConductTest from '@/candidates/profile/tests/conduct/TestConduct';
import store from '@/candidates/store';

export const PROFILE_TESTS_ROUTER = {
  path: 'tests',
  component: Test,
  beforeEnter: (to, from, next) => {
    const fetchTemplates = store.dispatch('tests/fetchTemplates');
    const fetchProficiencyLevels = store.dispatch('tests/fetchProficiencyLevels');
    Promise.all([fetchTemplates, fetchProficiencyLevels]).then(() => {
      next();
    }).catch(() => {
      // Unexpected error.
      // TODO Add page?
      // --- 2019-01-15 - Ivan Kolmychek
    });
  },
  children: [
    {
      path: '',
      name: 'CandidateTests',
      component: CandidateTest
    },
    {
      path: 'add',
      name: 'AllTests',
      component: AllTests
    },
    {
      path: 'conduct',
      name: 'ConductTest',
      component: ConductTest
    }
  ]
};
