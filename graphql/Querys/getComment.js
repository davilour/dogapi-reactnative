import { gql } from 'graphql-tag';

const GET_COMMENTS = gql`
  query getComments($breedId: String!) {
    listComments(filter: { breedId: { eq: $breedId } }) {
      items {
        id
        comment
        breedId 
      }
    }
  }
`;

export default GET_COMMENTS;
