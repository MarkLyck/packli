import { gql } from '@apollo/client'

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    itemDelete(data: { id: $id }) {
      success
    }
  }
`
