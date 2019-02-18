import store from '@/candidates/store/index';
import intercomService from '@/core/services/intercom.service';
import { FINISHED } from '@/candidates/profile/tests/store/tests-status-types';

const profileGuard = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    next({ path: '/' });
  } else {
    const fetchTests = store.dispatch('tests/fetchTests');
    const fetchTemplates = store.dispatch('tests/fetchTemplates');
    const fetchCandidate = store.dispatch('profile/fetchCandidate');
    const fetchContacts = store.dispatch('chat/fetchContacts');
    Promise.all([
      fetchTests, fetchTemplates, fetchCandidate, fetchContacts
    ]).then(() => {
      const candidate = store.getters['profile/candidate'];
      const tests = store.getters['tests/tests'];
      const finishedTests = tests.filter((item) => {
        return item.status === FINISHED;
      });
      const candidateSkills = candidate.skills.slice();
      const skills = candidateSkills.sort((a, b) => {
        return b.monthsOfExperience - a.monthsOfExperience;
      }).map((item) => {
        return item.skill.name;
      }).slice(0, 3).join(', ');
      const passedTests = (finishedTests.length > 0);
      const candidateCountry = candidate.country ? candidate.country.name : null;
      intercomService.boot({
        name: candidate.name,
        email: candidate.email,
        country: candidateCountry,
        tests: passedTests,
        skills: skills
      });
      next();
    }).catch(() => {
      // Unexpected error.
      // TODO Add page?
      // --- 2019-01-15 - Ivan Kolmychek
    });
  }
};

export default profileGuard;
