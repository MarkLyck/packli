import { gql } from '@apollo/client'

export const PACKING_LIST = gql`
  query PACKING_LIST($id: ID!) {
    packingList(id: $id) {
      name
      id
      tags
      items {
        items {
          id
          name
          description
          price
          weight
          height
          width
          depth
          quantity
          uRL
          category {
            id
            name
            description
          }
        }
      }
    }
  }
`
