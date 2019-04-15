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

const gotoCountry = (toName, next) => {
  if (hasCountry()) {
    gotoSkills(toName, next);
  } else {
    if (toName === 'ProfileCreateCountry') {
      next();
    } else {
      next({ name: 'ProfileCreateCountry' });
    }
  }
};

const gotoSkills = (toName, next) => {
  if (hasSkills()) {
    gotoRelocate(toName, next);
  } else {
    if (toName === 'ProfileCreateSkills') {
      next();
    } else {
      next({ name: 'ProfileCreateSkills' });
    }
  }
};

const gotoRelocate = (toName, next) => {
  if (hasRelocate()) {
    gotoRemote(toName, next);
  } else {
    if (toName === 'ProfileCreateRelocate') {
      next();
    } else {
      next({ name: 'ProfileCreateRelocate' });
    }
  }
};

const gotoRemote = (toName, next) => {
  if (hasRemote()) {
    next({ name: 'ProfileDashboard' });
  } else {
    if (toName === 'ProfileCreateRemote') {
      next();
    } else {
      next({ name: 'ProfileCreateRemote' });
    }
  }
};

const profileCreateGuard = (to, from, next) => {
  gotoCountry(to.name, next);
};

export default profileCreateGuard;
