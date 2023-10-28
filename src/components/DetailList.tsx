import { useEffect, useState } from "react";
import "./DetailList.css";
import { PurchaseData, UpdatePurchaseItemValue } from "../types";
import {
  fetchItem,
  fetchItemReturnValue,
  listItems,
  listItemsReturnValue,
  listPurchaseItems,
  listPurchaseItemsReturnValue,
  mutatePurchase,
} from "../Utils";
import DetailItem from "./DetailItem";

type Props = {
  pindex: number;
};

function DetailList(props: Props) {
  const [items, setItems] = useState(Array<PurchaseData>);
  const [purchaseItems, setPurchaseItems] = useState(Array<PurchaseData>);

  useEffect(() => {
    let purchases: Array<PurchaseData> = [];
    listItems("purchase").then((res: listItemsReturnValue) => {
      purchases = res.data.purchaseTableByType.items;
      let newItems: Array<PurchaseData> = [];
      let index = 0;
      const purchaseId = purchases[props.pindex - 1].PK || "";
      listPurchaseItems(purchaseId)
        .then((res: listPurchaseItemsReturnValue) => {
          res.data.listPurchaseTables.items.map((item) => {
            if (item.type === "pitem") {
              const itemSK: string = item.SK;
              const itemId = itemSK.split("#")[1];
              fetchItem("item#" + itemId, "#meta#" + itemId).then(
                (res: fetchItemReturnValue) => {
                  const newItem: PurchaseData = res.data.getPurchaseTable;
                  newItem.isPurchased = item.isPurchased;
                  newItem.index = index;
                  newItems = [...newItems, newItem];
                  setItems(newItems);
                  index = index + 1;
                }
              );
              setPurchaseItems((prevItems) => {
                const newItems = [...prevItems, item];
                return newItems;
              });
            }
          });
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arialabel: string | null = event?.target.ariaLabel;
    const index = parseInt(arialabel ? arialabel : "1");
    purchaseItems[index].isPurchased = 1 - purchaseItems[index].isPurchased;
    console.log("onChangeCheckbox", purchaseItems[index]);
    const targetPurchase: UpdatePurchaseItemValue = {
      PK: purchaseItems[index].PK || "",
      SK: purchaseItems[index].SK,
      type: purchaseItems[index].type,
      price: purchaseItems[index].price,
      username: purchaseItems[index].username,
      isPurchased: purchaseItems[index].isPurchased,
    };
    mutatePurchase(targetPurchase);
  };

  return (
    <>
      <div className="DetailList_wrapper">
        {items.map((item) => {
          return (
            <div className="DetailItem_wrapper" key={item.id}>
              <DetailItem item={item} onChange={onChangeCheckbox} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DetailList;
