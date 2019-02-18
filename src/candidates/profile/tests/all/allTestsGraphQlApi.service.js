import apolloClient from '@/candidates/core/apollo/client';
import gql from 'graphql-tag';

class AllTestsGraphqlApiService {
  constructor (apolloClient) {
    this.apolloClient = apolloClient;
  }
  fetchTemplates () {
    return this.apolloClient.query({
      query: gql`query {
        templates {
          amountOfQuestions
          id
          name
          proficiencyLevel { id name }
          skill { id name }
        }
      }
      `
    }).then((res) => {
      return res.data.templates;
    });
  }
  addTemplateToTests (templateId) {
    return this.apolloClient.mutate({
      mutation: gql`mutation ($templateId: UUIDv4!){
        createTest(templateId: $templateId ){
          errors { templateId { error message } }
          success
          }
        }
      `,
      variables: {
        templateId
      }
    }).then((res) => {
      return res;
    });
  }
  fetchProficiencyLevels () {
    return this.apolloClient.query({
      query: gql`
        query {
          availableProficiencyLevels{
            id
            name
          }
        }
    `
    }).then((res) => {
      return res.data.availableProficiencyLevels;
    });
  }
}

export default new AllTestsGraphqlApiService(apolloClient);
