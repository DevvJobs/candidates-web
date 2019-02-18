import gql from 'graphql-tag';

export const queries = {
  location: gql`
    query Location($item: String!) {
      locations (query: $item) {
        id
        name
        type
      }
    }
  `,
  skills: gql`
    query Skills($skills: String!) {
      skills (query: $skills) {
        id
        name
      }
    }
  `,
  candidate: gql`
    query {
      candidate {
        email
        name
        openToRelocation
        openToRemote
        country {
          id
          name
        }
        skills {
          id
          monthsOfExperience
          skill {
            id
            name
          }
        }
        totalUnreadMessagesCount
        totalContactRequestsCount
      }
    }
  `
};
