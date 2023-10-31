import { useEffect, useState } from "react";
import "./PurchaseItem.css";
import {
  fetchItem,
  getPresignedUrl,
  listPurchaseItems,
  listPurchaseItemsReturnValue,
} from "../Utils";
import { PurchaseData } from "../types";

type Props = {
  data: PurchaseData;
};

function PurchaseItem(props: Props) {
  const [imagefile, setImageFile] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const purchaseIndex: PurchaseData = props.data;

  useEffect(() => {
    let temp_completed = 1;
    listPurchaseItems(purchaseIndex.PK || "").then(
      (res: listPurchaseItemsReturnValue) => {
        const itemId = res.data.listPurchaseTables.items[1].SK?.split("#")[1];
        fetchItem("item#" + itemId, "#meta#" + itemId)
          .then((res) => {
            getPresignedUrl(
              res.data.getPurchaseTable.imagefile
            ).then((image) => {
              setImageFile(image);
            });
          })
          .catch((err) => console.log(err));
        const items: Array<PurchaseData> = res.data.listPurchaseTables.items;
        items.map((item) => {
          setTotalPrice((totalPrice) => totalPrice + item.price);
          if (item.isPurchased === 0) {
            temp_completed = 0;
          }
        });
        setCompleted(temp_completed);
        setNumberOfItems(items.length - 1);
      }
    );
  }, []);

  return (
    <>
      <div className="PurchaseItem_div">
        <div>{purchaseIndex.PK?.split("#")[1]}</div>
        <p>{numberOfItems} item(s)</p>
        {completed ? (
          <div style={{ color: "white", background: "blue", margin: "15pt" }}>
            COMPLETED
          </div>
        ) : (
          <div style={{ color: "white", background: "orange", margin: "15pt" }}>
            IN PROGRESS
          </div>
        )}
        <img src={imagefile} width="60" height="80" />
        <br />
        <br />
        <p>Total price: {totalPrice} JPY</p>
      </div>
    </>
  );
}

export default PurchaseItem;
