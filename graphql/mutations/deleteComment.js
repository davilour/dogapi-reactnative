import { gql } from 'graphql-tag';



export const DELETE_COMMENT = gql  `
mutation deleteComment ($id: ID!){
    deleteComment(input: {id: $id}) {
      id
    }
  }
`