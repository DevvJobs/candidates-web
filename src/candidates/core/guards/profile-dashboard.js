import store from '@/candidates/store/index';

const hasCountry = () => {
  return store.getters['profile/candidate'].country;
};
const hasSkills = () => {
  return store.getters['profile/candidate'].skills.length > 0;
};
const hasRelocate = () => {
  return store.getters['profile/candidate'].openToRelocation !== null;
};
const hasRemote = () => {
  return store.getters['profile/candidate'].openToRemote !== null;
};

const profileDashboardGuard = (to, from, next) => {
  if (hasCountry() && hasSkills() && hasRelocate() && hasRemote() && localStorage.getItem('token')) {
    next();
  } else {
    next({ name: 'ProfileCreateCountry' });
  }
};

export default profileDashboardGuard;
