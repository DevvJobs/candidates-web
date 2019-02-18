import store from '@/candidates/store/index';
import intercomService from '@/core/services/intercom.service';
import ChatMobile from '@/candidates/profile/chat/mobile/ChatMobile';
import ChatDialog from '@/candidates/profile/chat/ChatDialog';
import ChatThreads from '@/candidates/profile/chat/mobile/ChatThreads';

export const PROFILE_MOBILE_CHAT_ROUTER = {
  path: 'mobile-chat',
  name: 'ProfileMobileChat',
  component: ChatMobile,
  beforeEnter (_to, _from, next) {
    intercomService.hideLauncher(true);
    return store.dispatch('chat/fetchContacts')
      .then(_ => next())
      .catch(() => { /* error */ });
  },
  children: [
    {
      path: 'threads',
      name: 'ProfileMobileChatThreads',
      component: ChatThreads
    },
    {
      path: ':id',
      name: 'ProfileMobileChatMessages',
      component: ChatDialog
    }
  ]
};
