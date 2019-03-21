import apolloAuthClient from '@/candidates/core/apollo/auth-client';
import gql from 'graphql-tag';

class AuthGraphqlService {
  constructor (apolloAuthClient) {
    this.apolloAuthClient = apolloAuthClient;
  }

  signup ({name, email}) {
    const variables = { name: name, email: email };
    return this.apolloAuthClient.mutate({
      mutation: gql`
        mutation signup( $name: String!, $email: String!) {
          signup(name: $name, email: $email) {
            errors {
              name {
                error
                message
              }
              email {
                error
                message
              }
            }
            success
          }
        }
      `,
      variables: variables
    }).then(res => res.data.signup);
  }

  requestLoginCode ({email}) {
    const variables = { email: email };
    return this.apolloAuthClient.mutate({
      mutation: gql`
        mutation requestLoginCode($email: String!) {
          requestLoginCode(email: $email) {
            errors {
              email {
                error
                message
              }
              unknownKeys {
                error
                message
              }
            }
            success
            loginAttemptToken
            sessionId
          }
        }
      `,
      variables: variables
    }).then(res => res.data.requestLoginCode);
  }

  submitLoginCode ({email, code, loginAttemptToken}) {
    const variables = {
      email: email,
      code: code,
      loginAttemptToken: loginAttemptToken
    };
    return this.apolloAuthClient.mutate({
      mutation: gql`
        mutation submitLoginCode(
          $email: String!,
          $code: String!,
          $loginAttemptToken: String!
        ) {
          submitLoginCode(
            email: $email,
            code: $code,
            loginAttemptToken: $loginAttemptToken
          ) {
            errors {
              email {
                error
                message
              }
              code {
                error
                message
              }
              loginAttemptToken {
                error
                message
              }
              unknownKeys {
                error
                message
              }
            }
            success
            token
          }
        }
      `,
      variables: variables
    }).then(res => res.data.submitLoginCode);
  }

  logout ({token}) {
    const variables = { token: token };
    return this.apolloAuthClient.mutate({
      mutation: gql`
        mutation logout($token: String!) {
          logout(token: $token) {
            errors {
              token {
                error
                message
              }
              unknownKeys {
                error
                message
              }
            }
            success
          }
        }
      `,
      variables: variables
    }).then(res => res.data.logout);
  }
}

export default new AuthGraphqlService(apolloAuthClient);
