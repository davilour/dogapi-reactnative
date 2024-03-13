import { gql } from 'graphql-tag';



export const UPDATE_COMMENT = gql  `
mutation updateComment ($id: ID!, $comment: String!) {
    updateComment(input: {id: $id, comment: $comment}){
        id
        comment
    }
  }
`