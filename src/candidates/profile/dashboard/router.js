import Dashboard from '@/candidates/profile/dashboard/Dashboard';
import profileDashboardGuard from '@/candidates/core/guards/profile-dashboard';

export const PROFILE_DASHBOARD_ROUTER = {
  path: '',
  name: 'ProfileDashboard',
  component: Dashboard,
  beforeEnter: profileDashboardGuard
};
