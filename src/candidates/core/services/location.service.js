import apolloClient from '@/candidates/core/apollo/client';
import { queries } from '@/candidates/core/gql/queries';

class LocationService {
  async list (providedSearchText) {
    const searchText = providedSearchText || '';
    const response = await apolloClient.query({
      query: queries.location,
      variables: {
        item: searchText
      }
    });
    return response.data.locations;
  }
}

export default new LocationService();
