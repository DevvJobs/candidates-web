import apolloClient from '@/candidates/core/apollo-tests/client';
import gql from 'graphql-tag';

class ConductTestGraphQlApiService {
  constructor (apolloClient) {
    this.apolloClient = apolloClient;
  }
  fetchTest () {
    return this.apolloClient.mutate({
      mutation: gql`
        mutation{
          startTest{
            errors {
              test{
              error
              message
              }
            }
            success
            test{
            amountOfQuestions
            currentQuestionNumber
            id
            name
            nextQuestion{
             answers{
            id
            text
          }
            id
            text
          }
            proficiencyLevel{
            id
            name
          }
            skill{
            id
            name
          }
            status
          }
          }
        }`
    }).then((res) => {
      return res.data.startTest.test;
    });
  }
  submitAnswer (answer) {
    return this.apolloClient.mutate({
      mutation: gql`mutation ($questionId: UUIDv4!, $answers: [InputTestAnswer!]!){
        submitAnswer(questionId: $questionId, answers: $answers){
          errors {
            answers { error message }
            questionId { error message }
            test {  error  message }
          }
          success
          test {
            amountOfQuestions
            currentQuestionNumber
            id
            name
            status
            nextQuestion {
              id
              text
              answers { id  text }
            }
            proficiencyLevel { id name }
            skill { id name }
            }
          }
        }
      `,
      variables: {
        questionId: answer.questionId,
        answers: answer.answers
      }
    }).then((res) => {
      return res.data.submitAnswer.test;
    });
  }
}

export default new ConductTestGraphQlApiService(apolloClient);
