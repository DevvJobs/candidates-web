import Vue from 'vue';
import Vuex from 'vuex';
import signStore from '@/candidates/sign/store';
import chatStore from '@/candidates/profile/chat/store/index';
import testsStore from '@/candidates/profile/tests/store/index';
import globalStore from '@/candidates/store/global';
import profileStore from '@/candidates/profile/store/index';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sign: signStore,
    chat: chatStore,
    tests: testsStore,
    global: globalStore,
    profile: profileStore
  },
  strict: process.env.NODE_ENV !== 'production'
});
