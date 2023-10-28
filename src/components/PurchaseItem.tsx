import { useEffect, useState } from "react";
import "./PurchaseItem.css";
import { fetchItem, getPresignedUrl } from "../Utils";
import { PurchaseData } from "../types";

type Props = {
  data: PurchaseData
}

function PurchaseItem( props: Props ) {
  const [imagefile, setImageFile] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [completed, setCompleted] = useState(0);
  const purchaseData: PurchaseData = props.data;
  const [firstItem, setFirstItem] = useState(""/*purchaseData?.SK*/);

  useEffect(() => {
    let temp_completed = 1;
    fetchItem(firstItem).then((res) => {
      setFirstItem(res.data.getItem.id);
      getPresignedUrl(res.data.getItem.imagefile).then((image) => {
        setImageFile(image);
      });
    });
    purchaseData.itemID.map((itemID) => {
      fetchItem(itemID).then((res) => {
        setTotalPrice(
          (totalPrice) => totalPrice + res.data.getItem.price
        );
      });
    });
    purchaseData.isPurchased.map((isPurchased) => {
      if (isPurchased === 0) {
        temp_completed = 0;
      }
    });
    setCompleted(temp_completed);
  }, []);

  return (
    <>
      <div className="PurchaseItem_div">
        <div>#{purchaseData.id}</div>
        <p>{purchaseData.numberOfItems} item(s)</p>
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
