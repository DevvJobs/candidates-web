import apolloClient from '@/candidates/core/apollo/client';
import { mutations } from '@/candidates/core/gql/mutations';
import gql from 'graphql-tag';

class CandidateService {
  async updateCandidate (arg) {
    const response = await apolloClient.mutate({
      mutation: mutations.candidate,
      variables: {
        name: arg.name,
        openToRelocation: arg.openToRelocation,
        openToRemote: arg.openToRemote,
        countryId: arg.countryId
      }
    });
    return response.data.updateCandidate;
  }
  updateCandidateSkills (skills, successCallback) {
    return apolloClient.mutate({
      mutation: mutations.skills,
      variables: {
        id: skills.id,
        skillId: skills.skillId,
        monthsOfExperience: skills.monthsOfExperience
      }
    }).then((response) => {
      if (successCallback) {
        successCallback(response.data.putSkill);
      }
    });
  }
  updateCandidateProfileSkills (skills, successCallback) {
    return apolloClient.mutate({
      mutation: gql`mutation Skill {${skills}}`
    }).then((response) => {
      if (successCallback) {
        successCallback(response.data.putSkill);
      }
    });
  }
  removeCandidateSkill (id) {
    return apolloClient.mutate({
      mutation: mutations.removeSkill,
      variables: {
        id: id
      }
    });
  }
}

export default new CandidateService();
