import ProfileCreate from '@/candidates/profile/create/ProfileCreate';
import ProfileCreateCountry from '@/candidates/profile/create/ProfileCreateCountry';
import ProfileCreateRelocate from '@/candidates/profile/create/ProfileCreateRelocate';
import ProfileCreateRemote from '@/candidates/profile/create/ProfileCreateRemote';
import ProfileCreateSkills from '@/candidates/profile/create/ProfileCreateSkills';
import profileCreateGuard from '@/candidates/core/guards/profile-create-guard';

export const PROFILE_CREATE_ROUTER = {
  path: 'create',
  component: ProfileCreate,
  beforeEnter: profileCreateGuard,
  children: [
    {
      path: '',
      name: 'ProfileCreateCountry',
      component: ProfileCreateCountry
    },
    {
      path: 'skills',
      name: 'ProfileCreateSkills',
      component: ProfileCreateSkills
    },
    {
      path: 'relocate',
      name: 'ProfileCreateRelocate',
      component: ProfileCreateRelocate
    },
    {
      path: 'remote',
      name: 'ProfileCreateRemote',
      component: ProfileCreateRemote
    }
  ]
};
