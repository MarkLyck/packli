import { gql } from '@apollo/client'

export const CATEGORIES = gql`
  query CATEGORIES {
    categoriesList {
      items {
        name
        description
        id
      }
    }
  }
`
