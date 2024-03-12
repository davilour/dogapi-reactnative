import { gql } from 'graphql-tag';


export const CREATE_COMMENT = gql`
  mutation createComment($comment: String!, $breedId: String!) {
    createComment(input: {comment: $comment, breedId: $breedId}) {
      comment
      id
    }
  }
`;



