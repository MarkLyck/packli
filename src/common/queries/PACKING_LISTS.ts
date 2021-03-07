import { gql } from '@apollo/client'

export const PACKING_LISTS = gql`
  query PACKING_LISTS {
    packingListsList {
      items {
        name
        tags
        id
      }
    }
  }
`
