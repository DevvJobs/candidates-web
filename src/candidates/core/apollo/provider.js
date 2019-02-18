import VueApollo from 'vue-apollo';
import { apolloTestsClient } from '@/candidates/core/apollo-tests/client';

const apolloProvider = new VueApollo({
  defaultClient: apolloTestsClient
});

export default apolloProvider;
