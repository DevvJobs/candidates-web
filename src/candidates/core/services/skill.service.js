import apolloClient from '@/candidates/core/apollo/client';
import { queries } from '@/candidates/core/gql/queries';

class SkillService {
  async list (providedSearchText) {
    const searchText = providedSearchText || '';
    const response = await apolloClient.query({
      query: queries.skills,
      variables: {
        skills: searchText
      }
    });
    return response.data.skills;
  }
}

export default new SkillService();
