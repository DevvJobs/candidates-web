import gql from 'graphql-tag';

export const mutations = {
  candidate: gql`
    mutation Candidate(
      $name: String!,
      $openToRemote: Boolean,
      $openToRelocation: Boolean,
      $countryId: ID!
    ) {
      updateCandidate(
        name: $name,
        openToRemote: $openToRemote,
        openToRelocation: $openToRelocation,
        countryId: $countryId
      ) {
        success
        candidate {
          name
          email
          openToRelocation
          openToRemote
          country {
            id
            name
          }
        }
        errors {
          name {
            error
            message
          }
          countryId {
            error
            message
          }
        }
      }
    }
  `,
  skills: gql`
    mutation Skill(
      $id: ID!,
      $skillId: ID!,
      $monthsOfExperience: Int!
    ){
      putSkill(id: $id, skillId: $skillId, monthsOfExperience: $monthsOfExperience) {
      candidateSkill {
        id
        monthsOfExperience
        skill {
          id
          name
        }
      }
      errors {
        id {
          error
          message
        }
        monthsOfExperience {
          error
          message
        }
        skillId {
          error
          message
        }
      }
    }
  }
  `,
  removeSkill: gql`
    mutation Skill( $id: ID! ) {
      deleteSkill(id: $id) {
        errors {
          id {
            error
            message
          }
        }
        success
      }
    }
  `
};
