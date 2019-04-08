import 'babel-polyfill';
import Vue from 'vue';
import Autocomplete from 'v-autocomplete';
import App from '@/App';
import router from '@/candidates/router';
import store from '@/candidates/store/index';
import VueChatScroll from 'vue-chat-scroll';
require('@/core/filters/pluralize');
require('@/core/filters/with_default');
require('../sprite.js');

const isProduction = (process.env.NODE_ENV === 'production');

Vue.config.productionTip = !isProduction;
Vue.config.devtools = !isProduction;
Vue.use(Autocomplete);
Vue.use(VueChatScroll);

/**
 * @desc Modifying Vue prototype
 */
Vue.prototype.$isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
