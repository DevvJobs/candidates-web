import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { apolloAuthClient } from '@/candidates/core/apollo/auth-client';
Vue.use(VueApollo);

const apolloAuthProvider = new VueApollo({
  defaultClient: apolloAuthClient
});

export default apolloAuthProvider;
