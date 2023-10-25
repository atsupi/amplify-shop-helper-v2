/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePurchaseTable = /* GraphQL */ `
  subscription OnCreatePurchaseTable(
    $filter: ModelSubscriptionPurchaseTableFilterInput
    $owner: String
  ) {
    onCreatePurchaseTable(filter: $filter, owner: $owner) {
      id
      PK
      SK
      type
      imagefile
      price
      username
      description
      isInCart
      isPurchased
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdatePurchaseTable = /* GraphQL */ `
  subscription OnUpdatePurchaseTable(
    $filter: ModelSubscriptionPurchaseTableFilterInput
    $owner: String
  ) {
    onUpdatePurchaseTable(filter: $filter, owner: $owner) {
      id
      PK
      SK
      type
      imagefile
      price
      username
      description
      isInCart
      isPurchased
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeletePurchaseTable = /* GraphQL */ `
  subscription OnDeletePurchaseTable(
    $filter: ModelSubscriptionPurchaseTableFilterInput
    $owner: String
  ) {
    onDeletePurchaseTable(filter: $filter, owner: $owner) {
      id
      PK
      SK
      type
      imagefile
      price
      username
      description
      isInCart
      isPurchased
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
