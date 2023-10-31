/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPurchaseTable = /* GraphQL */ `
  mutation CreatePurchaseTable(
    $input: CreatePurchaseTableInput!
    $condition: ModelPurchaseTableConditionInput
  ) {
    createPurchaseTable(input: $input, condition: $condition) {
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
export const updatePurchaseTable = /* GraphQL */ `
  mutation UpdatePurchaseTable(
    $input: UpdatePurchaseTableInput!
    $condition: ModelPurchaseTableConditionInput
  ) {
    updatePurchaseTable(input: $input, condition: $condition) {
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
export const deletePurchaseTable = /* GraphQL */ `
  mutation DeletePurchaseTable(
    $input: DeletePurchaseTableInput!
    $condition: ModelPurchaseTableConditionInput
  ) {
    deletePurchaseTable(input: $input, condition: $condition) {
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
