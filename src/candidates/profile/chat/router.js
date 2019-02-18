import store from '@/candidates/store/index';
import intercomService from '@/core/services/intercom.service';
import Chat from '@/candidates/profile/chat/desktop/Chat';
import ChatDialog from '@/candidates/profile/chat/ChatDialog';

export const PROFILE_CHAT_ROUTER = {
  path: 'chat',
  name: 'ProfileChat',
  component: Chat,
  beforeEnter (_to, _from, next) {
    intercomService.hideLauncher(true);
    return store.dispatch('chat/fetchContacts')
      .then(_ => next())
      .catch(() => { /* error */ });
  },
  children: [
    {
      path: ':id',
      name: 'ProfileChatMessages',
      component: ChatDialog
    }
  ]
};
