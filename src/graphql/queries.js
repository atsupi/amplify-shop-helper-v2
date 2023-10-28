/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPurchaseTable = /* GraphQL */ `
  query GetPurchaseTable($PK: String!, $SK: String!) {
    getPurchaseTable(PK: $PK, SK: $SK) {
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
export const listPurchaseTables = /* GraphQL */ `
  query ListPurchaseTables(
    $PK: String
    $SK: ModelStringKeyConditionInput
    $filter: ModelPurchaseTableFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPurchaseTables(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const purchaseTableByType = /* GraphQL */ `
  query PurchaseTableByType(
    $type: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseTableByType(
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const purchaseTableByIsInCart = /* GraphQL */ `
  query PurchaseTableByIsInCart(
    $isInCart: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseTableByIsInCart(
      isInCart: $isInCart
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const purchaseTableByIsPurchased = /* GraphQL */ `
  query PurchaseTableByIsPurchased(
    $isPurchased: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseTableByIsPurchased(
      isPurchased: $isPurchased
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
