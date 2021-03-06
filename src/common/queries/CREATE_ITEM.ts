import { gql } from '@apollo/client'

export const CREATE_ITEM = gql`
  mutation CREATE_ITEM(
    $listId: ID!
    $category: ID!
    $width: Float
    $height: Float
    $depth: Float
    $weight: Int
    $uRL: String
    $price: Float
    $quantity: Int
    $name: String
    $description: String
  ) {
    itemCreate(
      data: {
        width: $width
        height: $height
        depth: $depth
        weight: $weight
        uRL: $uRL
        price: $price
        quantity: $quantity
        name: $name
        description: $description
        packingList: { connect: { id: $listId } }
        category: { connect: { id: $category } }
      }
    ) {
      id
    }
  }
`
