import { API, Storage, graphqlOperation } from "aws-amplify";
import { listPurchaseTables, 
         getPurchaseTable, 
         purchaseTableByType, 
         purchaseTableByIsInCart } from "./graphql/queries";
import { updatePurchaseTable } from "./graphql/mutations";
import { PurchaseData, UpdateItemValue, UpdatePurchaseItemValue } from "./types";

export async function getPresignedUrl(key: any) {
  const presignedUrl = await Storage.get(key, { level: "public" });
  return presignedUrl;
}

export type getListReturnValue = {
  data: { listPurchaseTables: { items: PurchaseData[]; } }
}
export const getList = async (nextToken = null): Promise<getListReturnValue> => {
  const res: Promise<getListReturnValue> = <Promise<getListReturnValue>>await API.graphql(
    graphqlOperation(listPurchaseTables, {
      nextToken: nextToken,
    })
  );
  return res;
};

export type fetchItemReturnValue = {
  data: { getPurchaseTable: PurchaseData }
}

export const fetchItem = async (PK: string, SK: string): Promise<fetchItemReturnValue> => {
  const res: Promise<fetchItemReturnValue> =
    <Promise<fetchItemReturnValue>>await API.graphql(
      graphqlOperation(getPurchaseTable, { PK: PK, SK: SK })
    );
  return res;
};

export type listItemsReturnValue = {
  data: { purchaseTableByType: { items: Array<PurchaseData> } }
}

export const listItems = async (type: string): Promise<listItemsReturnValue> => {
  const res: Promise<listItemsReturnValue> =
    <Promise<listItemsReturnValue>>await API.graphql(
      graphqlOperation(purchaseTableByType, { type: type })
    );
  return res;
};

export type listPurchaseItemsReturnValue = {
  data: { listPurchaseTables: { items: Array<PurchaseData> } }
}

export const listPurchaseItems = async (PK: string): Promise<listPurchaseItemsReturnValue> => {
  const res: Promise<listPurchaseItemsReturnValue> = 
    <Promise<listPurchaseItemsReturnValue>>await API.graphql(
      graphqlOperation(listPurchaseTables, { PK: PK }
    )
  );
  return res;
}

export type listItemsInCartReturnValue = {
  data: { purchaseTableByIsInCart: { items: Array<PurchaseData> } }
}

export const listItemsInCart = async (): Promise<listItemsInCartReturnValue> => {
  const res: Promise<listItemsInCartReturnValue> =
    <Promise<listItemsInCartReturnValue>>await API.graphql(
      graphqlOperation(purchaseTableByIsInCart, { isInCart: 1 })
    );
  return res;
};

export async function updateItemStatus(item: UpdateItemValue) {
  try {
    const res = await API.graphql(
      graphqlOperation(updatePurchaseTable, { input: item })
    );
    console.log(res);
  } catch (event) {
    console.log(event);
  }
}

export const fetchPurchases = async (): Promise<getListReturnValue> => {
  const res: Promise<getListReturnValue> =
    <Promise<getListReturnValue>>await API.graphql(
      graphqlOperation(listPurchaseTables)
    );
  return res;
};

export const mutatePurchase = async (targetPurchase: UpdatePurchaseItemValue) => {
  const res = await API.graphql(
    graphqlOperation(updatePurchaseTable, {
      PK: targetPurchase.PK,
      SK: targetPurchase.SK,
      input: targetPurchase,
    })
  );
  return res;
};
