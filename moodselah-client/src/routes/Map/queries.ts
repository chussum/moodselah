import { gql } from 'apollo-boost';

export const GET_PLACES = gql`
  query getPlaces($lat: Float!, $lng: Float!, $where: String) {
    GetPlaces(lat: $lat, lng: $lng, where: $where) {
      success
      error
      places {
        id
        address
        lat
        lng
        posts {
          id
          content
          photos {
            id
            path
          }
        }
      }
    }
  }
`;
