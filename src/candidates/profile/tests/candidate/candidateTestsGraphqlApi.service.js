import apolloClient from '@/candidates/core/apollo/client';
import gql from 'graphql-tag';

class CandidateTestsGraphqlApiService {
  constructor (apolloClient) {
    this.apolloClient = apolloClient;
  }
  fetchTests () {
    return this.apolloClient.query({
      query: gql`query {
        tests {
          amountOfQuestions
          id
          name
          result
          proficiencyLevel { id name }
          skill { id name }
          status
          token
        }
      }
      `
    }).then((res) => {
      return res.data.tests;
    });
  }
}

export default new CandidateTestsGraphqlApiService(apolloClient);
